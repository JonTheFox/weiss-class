import Logger from "../logg.js";

const logger = new Logger({ label: "SynthVoice", stylePreset: "purple" });
const { logg, loggError } = logger;

class Param {
    constructor(defaultValue) {
        this.defaultValue = defaultValue;
    }
}
class BooleanParam extends Param {
    constructor(defaultValue = false) {
        super(defaultValue);
    }
}
class RangeParam extends Param {
    constructor([min = 0, max = 2], defaultValue = 1) {
        super(defaultValue);
        this.min = min;
        this.max = max;
    }
}
class EnumParam extends Param {
    constructor(acceptedValues, defaultValue) {
        super(defaultValue || acceptedValues[0]);
        this.acceptedValues = acceptedValues;
    }
}
class EventParam extends Param {
    constructor(eventHandler = "") {
        super(eventHandler);
    }
}

const getRandomUpTo = (max, numGenerations = 1, min = 0) => {
    //returns an integer that is >= 0 and <= max
    let rand;
    for (let i = 0; i < numGenerations; i++) {
        rand = Math.random();
    }
    const randInt = Math.floor(rand * (max + 1));
    return randInt;
};

const pickRandomFrom = (arr = []) => {
    if (!arr || !arr.length) {
        return null;
    }
    return arr[getRandomUpTo(arr.length - 1, 3)];
};

const VOICE_PARAMS = {
    lang: new EnumParam(["en", "he"]),
    accent: new EnumParam(["gb", "us", "il"]),

    pitch: new RangeParam([0, 2], 1.2),
    rate: new RangeParam([0.1, 2], 0.55),
    volume: new RangeParam([0, 1], 1),
};
const EXTRA_PARAMS = {
    timeout: new RangeParam([0, 1000000], 5000),
    gender: new EnumParam(["female", "male"]),
    autoResolveWhenDebugging: new BooleanParam(false),
    DEBUGGING: new BooleanParam(false),
    onStart: new EventParam((e) => {
        const _utterance = e.target; //target is an instance of SpeetchSynthesisUtterance
        // logg(`${_utterance.voice.name} says: "${_utterance.text}"`);
    }),

    onPause: new EventParam((e) => {
        logg("utterance.onpause event fired!");
    }),
    onResume: new EventParam((e) => {
        logg("utterance.onresume event fired!");
    }),
    onMark: new EventParam((e) => {
        logg("utterance.on MARK event fired!", e.name);
    }),
    onBoundary: new EventParam(function(ev) {
        const { numWords, onFinalWordStart } = this;
        let { wordIndex } = this;

        // logg(
        //     `${ev.name} (index ${wordIndex})) boundary reached after ${(
        //         ev.elapsedTime / 1000
        //     )
        //         .toString()
        //         .slice(0, 4)} seconds.`
        // );
        if (wordIndex === numWords) {
            //last word has has started being emitted
            // logg(
            //     `Final word ("${
            //         ev.target.text.split(" ").slice(-1)[0]
            //     }") has started being emitted. `
            // );
            if (onFinalWordStart) {
                onFinalWordStart({ utterance: ev.target });
            }
        }

        this.wordIndex++;
    }),
    onEnd: new EventParam(
        ({
            text = "",
            voice,
            config,
            elapsedTime,
            utterance,
            resolveSpeak,
            rejectSpeak,
        }) => {
            // logg(`Finished saying "${text}"`);
            return resolveSpeak({
                text,
                voice,
                config,
                elapsedTime,
                utterance,
            });
        }
    ),
    onError: new EventParam((ev, reject) => {
        loggError("Synth speech threw an error: ", ev);
        // reject(ev);
        return ev;
    }),
};
const PARAMS = { voice: VOICE_PARAMS, extra: EXTRA_PARAMS };

const isChrome = () => {
    const isChromium = window.chrome;
    const winNav = window.navigator;
    const vendorName = winNav.vendor;
    const isOpera = typeof window.opr !== "undefined";
    const isIEedge = winNav.userAgent.indexOf("Edge") > -1;
    const isIOSChrome = winNav.userAgent.match("CriOS");
    return (
        isIOSChrome ||
        (isChromium !== null &&
            typeof isChromium !== "undefined" &&
            vendorName === "Google Inc." &&
            isOpera === false &&
            isIEedge === false)
    );
};

const fallback = {
    say: () =>
        new Promise((resolve) => {
            setTimeout(() => {
                const msg = "No Synth voice available.";
                logg(msg);
                resolve(msg);
            }, 50);
        }),
};

const getLang = (langAndAccent) => {
    if (!langAndAccent) {
        logg("getLang() error: missing paramter ");
        return null;
    }
    let lang;
    const underscoreSplit = langAndAccent.split("_");
    lang = underscoreSplit[1]
        ? underscoreSplit[0]
        : langAndAccent.split("-")[0];
    return lang.toLowerCase();
};

const getAccent = (langAndAccent) => {
    if (!langAndAccent) {
        logg("getAccent() error: missing paramter ");
        return null;
    }
    let accent;
    const underscoreSplit = langAndAccent.split("_");
    accent = underscoreSplit[1] || langAndAccent.split("-")[1];
    return accent.toLowerCase();
};

class SynthVoice {
    PARAMS = PARAMS;
    speechSynthesisInstance = null;
    config = {};
    voice = null;
    autoResolveTimer = null;
    active = true;

    setAutoResolveTimer = (timer) => (this.autoResolveTimer = timer);
    cancelAutoResolveTimer = () =>
        this.autoResolveTimer && clearTimeout(this.autoResolveTimer);

    turnOff = () => {
        this.active = false;
        logg("SynthVoice is now OFF");
    };

    turnOn = () => {
        this.active = true;
        logg("SynthVoice is now ACTIVE");
    };
    shutUp = () => {
        logg("SynthVoice is shutting up :X ");
        window.speechSynthesis.cancel();
    };
    shutUpAndTurnOff = () => {
        this.shutUp();
        this.turnOff();
    };
    getConfig = (desiredParams = []) => {
        const { config } = this;
        const report = {};
        if (desiredParams && desiredParams.length && desiredParams.length > 0) {
            for (let paramName of desiredParams) {
                report[paramName] = config[paramName];
            }
            return report;
        }
        return config;
    };

    constructor(config = {}) {
        const speechSynthesis = window.speechSynthesis;

        if (!speechSynthesis) {
            const msg =
                "The SpeechSynthesis API is not supported in current browser. Consider using a modern browser to enjoy the latest technological offferings :)";
            loggError(msg);
            return fallback;
        }

        window.addEventListener("unload", (event) => {
            this.shutUp();
        });

        const normalizedConfig = {};
        const allParams = { ...PARAMS.voice, ...PARAMS.extra };
        for (let [paramName, value] of Object.entries(allParams)) {
            const val =
                config[paramName] || config[paramName] === 0
                    ? config[paramName]
                    : allParams[paramName].defaultValue;

            const paramType =
                paramName in this.PARAMS.voice ? "voice" : "extra";
            normalizedConfig[paramName] = this.normalize(
                paramName,
                val,
                paramType
            );
        }

        this.config = normalizedConfig;

        //for Chrome support
        window.speechSynthesis.onvoiceschanged = this.populateVoice;

        if (isChrome()) return this;

        //for other browsers
        this.populateVoice(null)
            .then((voice) => {
                logg("populated the following synthetic voice: ", voice);
                return this;
            })
            .catch((e) => {
                const msg = "could not populate synthetic voice.";
                logg(msg);
                return this;
            });

        return;
    }

    populateVoice = async (ev, self = this) => {
        try {
            const allVoices = await this.getVoices();
            //const { lang, accent, gender } = this.config;
            const appropriateVoices = this.filterVoices(allVoices, this.config);

            /*todo: add support for selecting a voice*/
            const numVoices = appropriateVoices.length;
            if (numVoices <= 0) {
                const errMsg =
                    "No synthetic voices passed the filtering process. Consider requiring less parameters.";
                return Promise.reject(errMsg);
            }
            logg(`Available voices: `, appropriateVoices);

            //give precedence to some voices
            const preferredVoiceNames = [
                "microsoft zira desktop - english (united states)",
                "google us english",
            ];

            const preferredVoices = appropriateVoices.filter((voice) => {
                return preferredVoiceNames.includes(voice.name.toLowerCase());
            });

            // const voice = preferredVoice || appropriateVoices[0];
            // const voice = preferredVoice || pickRandomFrom(appropriateVoices);
            const voice = preferredVoices.length
                ? preferredVoices[0]
                : pickRandomFrom(appropriateVoices);

            if (voice.name.toLowerCase().includes("zira")) {
                self.config.rate = 0.55;
                self.config.pitch = 1.2;
            }
            if (voice.name.toLowerCase().includes("google")) {
                self.config.rate = 0.7;
                self.config.pitch = 1.1;
            }

            this.voice = voice;
            logg(`Successfully loaded voice: `, voice);
            return Promise.resolve(voice);
        } catch (err) {
            logg(err);
            return Promise.reject(err.message);
        }
    };

    getVoices = () => {
        return new Promise((resolve, reject) => {
            if (typeof window.speechSynthesis === "undefined") {
                return reject({
                    message: "window.speechSynthesis is not available.",
                });
            }

            //try to load voices both synchronously and asynchronously

            let voicesSync;
            try {
                voicesSync = window.speechSynthesis.getVoices((voices) => {
                    //async, callback-based loading (implemented in most browsers)
                    if (voices && voices.length && voices.length > 0) {
                        return resolve(voices);
                    } else {
                        return reject("No synth voices found. ");
                    }
                });
            } catch (err) {
                return reject("window.speechSynthesis.getVoices() failed.");
            }

            if (voicesSync) {
                //voices were loaded synchoronously (implemented in Chrome)
                if (voicesSync.length && voicesSync.length > 0) {
                    return resolve(voicesSync);
                } else {
                    return reject("No synth voices found. ");
                }
            }
        });
    };

    filterVoices = (voices, requiredParams) => {
        if (!voices) {
            return null;
        }
        if (!requiredParams) {
            return voices;
        }

        let filteredVoices = voices.filter((voice) => {
            //go over the required voice-parameter values. If a requirement is not met, the voice will be filtered out.
            const voiceName = voice.name.toLowerCase();
            // if (voiceName.includes("microsoft")) {
            //     return false; //cause they suck
            // }

            const requiredParamsIterator = Object.entries(requiredParams);
            let noConflicts = true;
            // if (voiceName === "Google US English".toLowerCase()) {
            //     debugger;
            // }

            for (let [requiredParam, requiredValue] of requiredParamsIterator) {
                requiredParam = requiredParam.toLowerCase();

                switch (requiredParam) {
                    case "lang":
                        // en_US / en_GB / en_AU
                        // const underscored = voice.lang
                        //     .split("_")[0]
                        //     .toLowerCase();
                        // if (requiredValue !== underscored) {
                        //     const dashed = voice.lang
                        //         .split("-")[0]
                        //         .toLowerCase();
                        const lang = getLang(voice.lang);

                        if (lang !== requiredValue) {
                            noConflicts = false;
                        }
                        break;
                    case "accent":
                        // gb
                        const accent = getAccent(voice.lang);
                        if (accent !== requiredValue) {
                            noConflicts = false;
                        }
                        break;
                    case "gender":
                        // male/female
                        const voiceGender =
                            voiceName.includes("female") ||
                            voiceName.includes("anna") ||
                            voiceName.includes("zira") ||
                            voiceName.includes("google us english")
                                ? "female"
                                : "male";

                        if (requiredValue !== voiceGender) {
                            noConflicts = false;
                        }
                        break;
                    default:
                        //The rest of the parameters can be adjusted dynamically, so we don't filter according to them
                        break;
                } //switch
                if (noConflicts) {
                    //so far so good
                    continue;
                } else {
                    //no point in continuing to check the current voice
                    break;
                }
            } //for-loop on required parameters

            //keep the voice only if all requirements were met
            return noConflicts;
        }); //filter function

        if (filteredVoices.length <= 0) {
            logg("No synthetic voice with specified requirements was found.");
            return voices;
        }
        return filteredVoices;
    };

    normalize = (paramName, val, propertyType = "voice") => {
        //use the config object, if available, to get a fallback value. If an argument wasn't not passed in to config, use the parameter's default value.
        const config = this.config || {};
        const param = this.PARAMS[propertyType][paramName];
        try {
            if (!(param instanceof Param)) {
                return val; //Unsupported parameter. Leave it unchanged.
            }

            let isNormal = false;

            if (param instanceof RangeParam) {
                isNormal = val >= param.min && val <= param.max;
                if (!isNormal)
                    throw new Error(
                        `argument for paramater value is not a number`
                    );
            } else if (param instanceof EnumParam) {
                isNormal = param.acceptedValues.includes(val);
                if (!isNormal)
                    throw new Error(
                        `argument for paramater value is not an accepted enum value`
                    );
            } else if (param instanceof BooleanParam) {
                return Boolean(val);
            }
            //param value is valid
            return val;
        } catch (err) {
            loggError(err.message);
            return param.defaultValue;
        }
    };

    say = async (text, newConfig = {}, usePersistently = false) => {
        //This is a wrapper function. It normalizes the passed voice parameters, executes the speech (by calling the private method _say()), awaits its results and finally returns it.
        const self = this;
        return new Promise(async (resolve, reject) => {
            try {
                if (
                    self.config.DEBUGGING &&
                    self.config.autoResolveWhenDebugging
                )
                    return resolve("autoResolveWhenDebugging");
                if (!text) {
                    return reject("missing text parameter");
                }
                if (!self.active) {
                    return reject(
                        `SynthVoice did NOT say "${text}", because SynthVoice instance is currently turned OFF. To turn it on, invoke synthVoice.turnOn()
                    `
                    );
                }
                const speechSynthesis = window.speechSynthesis || null;
                if (!speechSynthesis) {
                    return reject(
                        "speechSynthesis could not be found inside the window object."
                    );
                }
                if (!self) {
                    debugger;
                }
                if (!self.voice) {
                    logg(
                        `No synthetic voice is currently populated. Populating voice...`
                    );

                    logg(self);

                    const newVoice = await self.populateVoice(null, self);

                    if (!newVoice) {
                        return null;
                    }
                    logg(`newVoice.name: ${newVoice.name}`);
                }

                const { speaking, pending, paused } = speechSynthesis;
                if (paused || pending) {
                    logg("speechSynthesis is busy!");
                    //return null;
                }
                if (speaking) {
                    // Stop current utterance and cancel queued ones
                    speechSynthesis.cancel();
                }

                //Normalize the arguments that were passed in
                const normalizedConfig = {};
                for (let [paramName, value] of Object.entries(newConfig)) {
                    const paramType =
                        paramName in self.PARAMS.voice ? "voice" : "extra";
                    normalizedConfig[paramName] = self.normalize(
                        paramName,
                        value,
                        paramType
                    );
                }

                //override the previous configuration with the new values that were just passed in (any property that wasn't passed a new value will retain its original value)
                const oldConfig = self.config;
                const mergedConfig = Object.assign(
                    {},
                    oldConfig,
                    normalizedConfig
                );

                if (usePersistently) {
                    self.config = mergedConfig;
                }

                if (!mergedConfig) {
                    debugger;
                }

                const speechResult = await self._speak(
                    text,
                    self.voice,
                    mergedConfig
                );

                // const { onFinish, onError, onPause } = mergedConfig;
                // if (onFinish) {
                //     debugger;
                //     await onFinish({
                //         text,
                //         config: mergedConfig,
                //         voice: self.voice
                //     });
                // }

                resolve(speechResult);
            } catch (err) {
                loggError("say() threw an error.");
                return reject(err);
            }
        });
    };

    wakeUp = () => {
        try {
            this._speak("", this.voice);
        } catch (err) {
            if (err instanceof ReferenceError) {
                logg(err + "\nCheck for relocation in master document.");
            }
            if (err instanceof TypeError) {
                logg(err + "\nCheck for a disaterous overwrite!");
            }
        }
    };

    _speak(text = "", voice, config) {
        //interfaces directly with the SpeechSynthesis API

        const instance = this;

        return new Promise(async (resolve, reject) => {
            try {
                if (!config) {
                    const msg = "no text";
                    logg(msg);
                    return resolve(msg);
                }

                const callSpeak = () => {
                    if (!text) {
                        //wake up the native SpeechSynthesis API (it tends to sleep)
                        window.speechSynthesis.speak(utterance);
                        return resolve(
                            "Fired off and empty utterance to wake up the native SpeechSynthesis browser API"
                        );
                    }

                    let {
                        lang,
                        accent,
                        pitch,
                        rate,
                        volume = 1,
                        onStart,
                        onPause,
                        onResume,
                        onMark,
                        onBoundary,
                    } = config;

                    lang =
                        lang && lang.toLowerCase() + "-" + accent.toUpperCase();

                    Object.assign(utterance, { lang, pitch, rate, volume });

                    const timeTillAutoResolve = 5000;
                    this.setAutoResolveTimer(
                        setTimeout(() => {
                            if (!instance.ended && !instance.errored) {
                                const msg = `SpeechSynthesis Utterance of the text " ${text} " has timed out (${timeTillAutoResolve} milli seconds after starting). Resolving.`;
                                logg(msg);

                                return resolve(msg);
                            }
                        }, timeTillAutoResolve)
                    );

                    utterance.onstart = onStart;
                    utterance.onmark = onMark;
                    utterance.onpause = onPause;
                    utterance.onresume = onResume;
                    utterance.onboundary = onBoundary.bind({
                        numWords: text.split(" ").length,
                        wordIndex: 0,
                    });
                    //

                    window.speechSynthesis.speak(utterance);
                };

                const utterance = new SpeechSynthesisUtterance();
                utterance.voice = voice;
                utterance.text = text;
                utterance.onerror = (ev) => {
                    //dont let a failed utterance ruin entire processes
                    this.errored = true;
                    if (config.retryOnError) {
                        callSpeak();
                    }
                    if (config && config.onError) config.onError(ev, reject);
                    loggError("error");
                    resolve("error");
                    // return reject(ev);
                };
                // logg(`finished saying "${text}"`);
                utterance.onend = async (ev) => {
                    this.cancelAutoResolveTimer();
                    this.ended = true;
                    const { elapsedTime, utterance } = ev;
                    try {
                        if (!config.onEnd)
                            resolve({
                                text,
                                voice,
                                config,
                                elapsedTime,
                                utterance,
                            });
                        await config.onEnd({
                            //it's the responsibility of onEnd to call resolveSpeak and complete the call to say().
                            resolveSpeak: resolve,
                            rejectSpeak: reject,
                            // the default onEnd() function logs a message and resolves with the following data
                            text,
                            voice,
                            config,
                            elapsedTime,
                            utterance,
                        });
                    } catch (err) {
                        loggError(err.message);
                        reject(err.message);
                    }

                    // return this.errored ? reject(ev) : resolve(ev);
                };

                callSpeak();

                return;
            } catch (err) {
                logg(
                    "Error within speak(). SpeechSynthesis utterance has failed." +
                        err
                );
                return resolve(err);
                //TODO: reject instead
            }
        }); //promise
    }

    getConfig = () => this.config;
}

export default SynthVoice;
export { SynthVoice, fallback };
