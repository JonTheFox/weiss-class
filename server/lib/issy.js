const Logger = require("./logg-server.js");
const { logg, loggError } = new Logger({ label: "issy" });

var issy = (function() {
    class Validator {
        constructor(arg, negate) {
            this.arg = arg;
            this.negate = negate || false;
        }

        _is = (aType = "") => {
            if (!aType) return null;
            const { arg } = this;
            let result;
            switch (aType) {
                case "aNumber":
                    result = typeof this.arg === "number" && !isNaN(arg);
                    break;
                case "aString":
                    result =
                        (!arg && arg === "") ||
                        typeof arg === "string" ||
                        arg instanceof String;
                    break;
                case "aFunction":
                    result = typeof arg === "function";
                    break;
                case "anArray":
                    result =
                        Object.prototype.toString.call(this.arg) ===
                        "[object Array]";
                    break;
                case "anObject":
                    result =
                        arg !== null &&
                        Object(arg) &&
                        typeof arg === "object" &&
                        !this.anArray;
                    break;
                case "aDate":
                    result =
                        Object.prototype.toString.call(this.arg) ===
                            "[object Date]" && !isNaN(this.arg.getTime())
                            ? true
                            : false;
                    break;

                default:
                    throw new Error(
                        "Unrecognized data type argument provided to issy"
                    );
            }

            const finalResult = this.negate ? !result : result;
            return finalResult;
        };

        get aNumber() {
            return this._is("aNumber");
        }
        get aString() {
            return this._is("aString");
        }
        get anArray() {
            return this._is("anArray");
        }
        get aFunction() {
            return this._is("aFunction");
        }
        get anObject() {
            return this._is("anObject");
        }
        get aDate() {
            return this._is("aDate");
        }

        get is() {
            return this; //to chain another getter
            //e.g. : our(items).is.anArray ? items[0] : items
        }
        get isNot() {
            this.negate = true;
            return this; //keep it goin'..
        }
    }

    const our = (arg) => {
        return new Validator(arg);
        // For use within an if statement
        // 1. if(our(users).is.anArray) users.push(newUser);
        // 2. const wrongType = our(users).is.not.anArray; users.push(newUser);
    };

    const is = (arg) => {
        return new Validator(arg);
        // For use within a ternary operator
        // const wrongType = is(users).anArray() ? false : true;
        // if(wrongType) throw new Error('Invalid "user" parameter');
    };

    const isNot = (arg) => {
        return new Validator(arg, "negate");
        // For use within a ternary operator
        // const wrongType = is(users).anArray() ? false : true;
        // if(wrongType) throw new Error('Invalid "user" parameter');
    };
    return { our, is, isNot, Validator };
})(); //closure self-executing function

const { our, is, isNot } = issy;

const getRandomUpTo = (max, numGenerations = 1, min = 0) => {
    //returns an integer that is >= 0 and <= max
    let rand;
    for (let i = 0; i < numGenerations; i++) {
        rand = Math.random();
    }
    const randInt = Math.floor(rand * (max + 1));
    return randInt;
};

const pickRandomFrom = (arr = [], numItems = 1, excludedIndexes = []) => {
    if (our(arr).isNot.anArray) {
        return null;
    }
    const ln = arr.length;
    numItems = numItems > ln ? ln : numItems;
    let randomIndex = -1;
    const randomIndexes = [];
    const randomItems = [];
    for (let i = 0; i < numItems; i++) {
        let numIterations = 0;
        do {
            randomIndex = getRandomUpTo(ln - 1, 3);
            numIterations++;
        } while (
            numIterations < 200 &&
            (randomIndexes.includes(randomIndex) ||
                excludedIndexes.includes(randomIndex))
        );
        randomIndexes.push(randomIndex);
        randomItems.push(arr[randomIndex]);
    }
    //For a single item, return it directly. For more than one items, return an array.
    return numItems === 1 ? randomItems[0] : randomItems;
};

const getRandomColor = (alpha = "1") => {
    //***returns an rgba color string, e.g. :"rgba(20,200,255,0.5)"
    const rgb = [
        getRandomUpTo(255, 2),
        getRandomUpTo(255, 2),
        getRandomUpTo(255, 3),
    ];
    alpha =
        alpha || alpha === 0
            ? alpha
            : (Math.random(1) + 0.1).toString().slice(0, 3);
    if (alpha === "0.0") alpha = "0";
    const rgba = `rgba(${rgb.join(", ")}, ${alpha})`;
    return rgba;
};

var timing = (function() {
    const _isTimeout = (str) =>
        str &&
        str.length &&
        ["timeout", "timeouts"].includes(str.toLowerCase());
    let timeoutIndex = 0;
    let intervalIndex = 0;
    const _clear = (timeoutOrInterval = "timeout", timerID, timerItem = {}) => {
        if (!timerID) {
            return null;
        }
        // const { label, ms, numTimesSet } = timerItem;
        const isTimeout = _isTimeout(timeoutOrInterval);
        try {
            isTimeout
                ? window.clearTimeout(timerID)
                : window.clearInterval(timerID);
            return true;
        } catch (err) {
            loggError(err.message);
            debugger;
            return null;
        }
    };

    // Promise Keeper
    // ===================================
    // Enhance a Promise object with resolve() and reject() methods, to allow for easy triggering of promise completion from the outside (e.g.: from inside state reducer), at any time.
    // Handle multiple promises in a straight-forward way: Resolve when at least one promise resolves (and ignore rejections)
    let promiseIndex = 1;
    class PromiseKeeper {
        timeouts = [];
        intervals = [];
        promises = [];
        latestPromise = {};
        label = "";
        logLabel = "";
        constructor({ label = "" } = {}) {
            this.label = label;
            this.logLabel = `PromiseKeeper("${this.label}"): `;
        }

        addPromise = (ultimatePromise, label = "") => {
            ultimatePromise.label = label;
            if (!ultimatePromise || !this.promises) debugger;

            this.latestPromise = ultimatePromise;
            const updatedPromises = [...this.promises, ultimatePromise];
            this.promises = updatedPromises;
        };

        _addOrUpdate = (
            timeoutOrInterval = "timeout",
            id,
            ms = 0,
            label = ""
        ) => {
            const indeedTimeout = _isTimeout(timeoutOrInterval);

            const store = indeedTimeout ? this.timeouts : this.intervals;
            const newEntry = {
                i: Math.max(0, store.length - 1), //newest item = last item in the array
                id,
                ms,
                label,
                numTimesSet: 0,
            };

            let existingIndex;
            const existingElem = store.filter((timerElem, i) => {
                if (timerElem.label === label) {
                    existingIndex = i;
                    return true;
                }
                return false;
            })[0];

            if (existingElem) {
                //update
                //TODO: fix double entries...
                //clear previous timer of the same label
                if (indeedTimeout) {
                    this.clearTimeout(existingElem.label);
                } else {
                    this.clearInterval(existingElem.label);
                }
                newEntry.numTimesSet = existingElem.numTimesSet + 1;
                store[existingIndex] = newEntry;
            } else {
                //new timer element
                newEntry.numTimesSet = 1;
                store.push(newEntry);
            }

            // if (indeedTimeout) {
            //     this.timeouts = store;
            // } else {
            //     this.intervals = store;
            // }
        };

        //public API
        stall = (ms = 50, label = `timeout${timeoutIndex}`) => {
            const stallPromise = this.withRC(
                new Promise((resolve) => {
                    //resolve in provided ms
                    const timeoutId = setTimeout(resolve, ms);
                    this._addOrUpdate("timeout", timeoutId, ms, label);
                }),
                { label }
            );

            this.latestPromise = stallPromise;
            this.addPromise(stallPromise, label);

            timeoutIndex++;
            return stallPromise;
        };

        every = (ms = 1000, callback, label) => {
            intervalIndex++;
            label = label || `interval${intervalIndex}`;
            return new Promise((resolve, reject) => {
                if (!callback) {
                    debugger;
                    return null;
                }
                //you can signal the completion of interval work (like certain elapsed time, aggregation, etc) by invoking this.resolve inside the provided callback function.
                const enhancedCallback = callback.bind({ resolve, reject }); //fuck yea
                const intervalId = setInterval(enhancedCallback, ms);

                this._addOrUpdate("interval", intervalId, ms, label);
            });
        };

        clear = (timeoutOrInterval = "timeout", label = "") => {
            /* return values :
            /* true -   indeed cleared
            /* false -  not found, and thus not cleared
            /* null -   error 
            */

            const timerType = _isTimeout(timeoutOrInterval)
                ? "timeout"
                : "interval";
            try {
                const batch = _isTimeout(timeoutOrInterval)
                    ? this.timeouts
                    : this.intervals;
                if (!batch) {
                    return null; //error
                }
                const numElements = batch.length;
                if (numElements === 0) {
                    return false;
                }

                let timerElement;
                switch (label) {
                    case "":
                        //clear last PromiseKeeper element
                        timerElement = batch[numElements - 1];
                        _clear(timerType, timerElement.id, timerElement);
                        batch[numElements - 1].cleared = true;
                        return true;
                    case "all":
                        const clearedBatch = batch.map((timerElement, i) => {
                            _clear(timerType, timerElement.id, timerElement);
                            timerElement.cleared = true;
                            return timerElement;
                        });
                        //Updated the cache
                        this[timerType + "s"] = clearedBatch; //this.timeouts or this.intervals
                        return true;
                    default:
                        //label provided
                        timerElement = batch.filter((element) => {
                            return element.label === label;
                        })[0];
                        if (!timerElement) {
                            return false;
                        }
                        _clear(timerType, timerElement.id, timerElement);
                        timerElement.cleared = true;
                        //replace the old timer with the new one
                        batch[timerElement.i] = timerElement;

                        this[timerType + "s"] = batch;
                        return true;
                } //switch
            } catch (err) {
                loggError(
                    this.logLabel +
                        `Could not clear ${
                            _isTimeout ? "timeout" : "interval"
                        } "${label}"`,
                    err
                );
                return null;
            }
        };

        clearInterval = (label = "") => {
            this.clear("interval", label);
        };
        clearTimeout = (label = "") => {
            this.clear("timeout", label);
        };

        clearAll = () => {
            const timeoutsDidClear = this.clear("timeout", "all");
            const intervalsDidClear = this.clear("interval", "all");
            const promisesDidReject = this.rejectAll();
            return timeoutsDidClear && intervalsDidClear && promisesDidReject;
        };

        withRC = (originalPromise, config = {}) => {
            const label = config.label || `ultimatePromise${promiseIndex}`;
            let logMsg = this.logLabel + `withRC(${label}): `;

            if (!originalPromise) {
                logg(logMsg + "Missing promise argument.");
                return null;
            }

            //wrap a given promise with an Ultimate promise, i.e: a higher-order promise that can be resolved/rejected from anywhere, anytime! :)
            // const ultimate = new UltimatePromise(originalPromise);
            // logg("ultimatePromise: ", ultimate);
            // debugger;

            const {
                noRejection = false, //ignore rejections to continue normal execution flow. Useful!
                resolveOnError = false,
                rejectOnResolve = false,
            } = config;

            let _ultimateResolve, _ultimateReject;

            const ultimatePromise = new Promise(
                (ultimateResolve, ultimateReject) => {
                    //save references to resolve() and reject() to enable manual resolve/rejection from anywhere

                    _ultimateResolve = ultimateResolve;
                    _ultimateReject = ultimateReject;
                }
            );

            ultimatePromise.i = promiseIndex;

            //enhance the original Promise with custom resolve/reject callbacks, that communicate completion (either resolve or reject) back to to the wrapping (ultimate) Promise
            originalPromise.then((resolvedValue) => {
                ultimatePromise.originalPromise.result = {
                    resolved: true,
                    resolvedValue: resolvedValue,
                };
                if (rejectOnResolve) {
                    ultimatePromise.rejectedOnResolve = true;
                    return _ultimateReject("rejectOnResolve : true");
                }
                ultimatePromise.resolved = true;
                return _ultimateResolve(resolvedValue);
            });

            originalPromise.catch((err) => {
                const reason = (err && err.error) || err || "";
                const reasonString = is(reason).anObject
                    ? JSON.stringify(reason)
                    : reason;
                ultimatePromise.originalPromise.result = {
                    rejected: true,
                    reason,
                };

                logMsg +=
                    "a wrapped Promise has been rejected for the following reason: \n" +
                    reasonString +
                    "\n";
                if (resolveOnError) {
                    ultimatePromise.resolved = true;
                    ultimatePromise.resolvedOnError = true;
                    logg(logMsg + "--> RESOLVING ON ERROR!");
                    return _ultimateResolve(null, reasonString);
                }
                if (noRejection) {
                    ultimatePromise.rejectionIgnored = true;
                    logg(logMsg + "--> REJECTION IGNORED!", ultimatePromise);
                    return true;
                }
                ultimatePromise.rejected = true;
                return _ultimateReject(reasonString);
            });

            originalPromise.finally(() => {
                ultimatePromise.originalPromise.completed = true;
            });

            //keep a reference to the orignal Promise object for easy debugging or any other use case
            ultimatePromise.originalPromise = originalPromise;

            promiseIndex++;

            //add methods for remotely completing the ultimate promise
            ultimatePromise.resolve = (value = "") => {
                if (!ultimatePromise.resolved && !ultimatePromise.rejected) {
                    return _ultimateResolve(value);
                }
            };
            ultimatePromise.reject = (reason = "") => {
                if (!ultimatePromise.resolved && !ultimatePromise.rejected) {
                    return _ultimateReject(reason);
                }
            };

            this.latestPromise = ultimatePromise; //for easy completion (great for debugging and fast-forwarding)
            this.addPromise(ultimatePromise, label); //for easy completion (great for debugging and fast-forwarding)
            return ultimatePromise;
        };

        rejectPrev = () => {
            const prevPromise = this.promises[this.promises.length - 1];
            if (prevPromise.reject) {
                logg(this.logLabel + "rejectPrev(): ", prevPromise);
                prevPromise.reject();
            }
        };

        rejectLatest = () => {
            if (this.latestPromise.reject) {
                logg(this.logLabel + "rejectLatest(): ", this.latestPromise);
                this.latestPromise.reject();
            }
        };

        resolveLatest = (logPromise = true) => {
            const { latestPromise } = this;
            let msg = this.logLabel + "resolveLatest(): ";
            if (latestPromise.resolve) {
                latestPromise.resolve("manual resolve");
                if (logPromise) logg(msg, latestPromise);
                this.latestPromise = {};
                return true;
            } else {
                logg(msg, "No pending promises to resolve.");
                return false;
            }
        };

        completeAll = (resolveOrReject = "reject") => {
            const { promises } = this;
            if (!promises) debugger;
            const completefunc =
                resolveOrReject === "resolve" ? "resolve" : "reject";
            const reason = `completeAll(): manual ${completefunc}()`;
            for (let i = 0; i < promises.length; i++) {
                promises[i][completefunc](reason);

                logg(
                    (this.logLabel || " ") +
                        `${reason} of promise "${promises[i].label}"`,
                    promises[i]
                );
            }
            this.promises = [];
        };

        resolveAll = () => {
            this.completeAll("resolve");
        };
        rejectAll = () => {
            this.completeAll("reject");
        };

        any = (promises = [], config = {}, label) => {
            //ultimately-resolves upon resolve of any of the provided promises. Ignores any rejections.

            // const { autoResolve = false, timeout = 0 } = config;

            const numPromises = promises.length;
            //let numRejected = 0;
            let numCompleted = 0;
            let _ultimateResolve;
            let _ultimateReject;

            const softPromises = promises.map((promise, i) => {
                return this.withRC(promise, { noRejection: true });
            });

            const ultimatePromise = new Promise(
                async (ultimateResolve, ultimateReject) => {
                    _ultimateResolve = ultimateResolve;
                    _ultimateReject = ultimateReject;
                    await Promise.race(softPromises);
                    // const fullfiller = softPromises[fullfillerIndex];
                    const morePromisesLeft = numCompleted < numPromises;
                    const numPromisesRejected = softPromises.reduce(
                        (numRejected, promiseHolder, i) => {
                            if (promiseHolder.promise.rejected) {
                                numRejected++;
                            }
                            return numRejected;
                        },
                        0
                    );

                    logg(
                        this.logLabel +
                            `".any(): resolved! (${numPromisesRejected} promises rejected. ${
                                morePromisesLeft
                                    ? numPromises -
                                      numPromisesRejected +
                                      " haven't completed as of yet)"
                                    : ""
                            }`
                    );
                }
            );

            ultimatePromise.promises = softPromises;
            ultimatePromise.resolve = _ultimateResolve;
            ultimatePromise.reject = _ultimateReject;

            this.addPromise(ultimatePromise, label);

            return ultimatePromise;
        };
    }
    return { PromiseKeeper };
})(); //

const { PromiseKeeper } = timing;
const promiseKeeper = new PromiseKeeper({ label: "issy" });

const shuffleOnce = (arr = []) => {
    //start after the last item
    const arrClone = arr.slice(0);
    let needleIndex = arrClone.length; //start from the end

    // Go back (almost) all the way to the start
    while (needleIndex > 0) {
        // Pick a random index, smaller than the current index
        let index = Math.floor(Math.random() * needleIndex);

        // Decrease it by 1
        needleIndex--;

        // And swap the item at the random index, with the one we started with
        let temp = arrClone[needleIndex];
        arrClone[needleIndex] = arrClone[index];
        arrClone[index] = temp;
    }

    return arrClone;
};

const shuffle = (arr = [], numShuffles = 1) => {
    if (!arr) {
        logg(
            "shuffle() : Error! Can't shuffle a non-Array. \nReceived param: ",
            arr
        );
        return null;
    }
    let shuffled;
    for (let i = 0; i < numShuffles; i++) {
        shuffled = shuffleOnce(arr);
    }
    return shuffled;
};
const getLastXItems = (arr = [], x = 6) => {
    const minusX = parseInt("-" + x);
    return arr.slice(minusX);
};

const toTime = (dateString) => {
    const sliced = dateString.slice(-8, dateString.length - 3);
    return sliced;
};

const getFormattedTime = (date) => {
    // logg("typeof dateObj === " + Object.prototype.toString.call(dateObj));
    let dateObj;
    if (our(date).is.aDate) {
        dateObj = date;
    } else if (our(date).is.aNumber) {
        try {
            dateObj = date.parse();
        } catch (err) {
            loggError(err.message);
        }
    } else {
        logg("Not a valid date format");
        return null;
    }

    const hours = dateObj.getHours();
    const minutes = dateObj.getMinutes();
    // const seconds = dateObj.getSeconds();
    const formattedTime = `${hours < 10 ? "0" : ""}${hours}:${
        minutes < 10 ? "0" : ""
    }${minutes}`;
    return formattedTime;
};

// winDough
// ===================================

//Scroll enable & disable
// left: 37, up: 38, right: 39, down: 40,
// spacebar: 32, pageup: 33, pagedown: 34, end: 35, home: 36
const keys = { 37: 1, 38: 1, 39: 1, 40: 1 };

function preventDefault(e) {
    e = e || window.event;
    if (e.preventDefault) e.preventDefault();
    e.returnValue = false;
}

function preventDefaultForScrollKeys(e) {
    if (keys[e.keyCode]) {
        preventDefault(e);
        return false;
    }
}

const ScrollControl = {
    enableScroll() {
        if (window.removeEventListener)
            window.removeEventListener("DOMMouseScroll", preventDefault, false);
        // window.onmousewheel = document.onmousewheel = null;
        // window.onwheel = null;
        window.ontouchmove = null;
        document.onkeydown = null;
        logg("ScrollControl: Scrolling is now ENabled.");
    },
    disableScroll() {
        if (window.addEventListener)
            // older FF
            window.addEventListener("DOMMouseScroll", preventDefault, false);
        // window.onwheel = preventDefault; // modern standard
        // window.onmousewheel = document.onmousewheel = preventDefault; // older browsers, IE
        window.ontouchmove = preventDefault; // mobile
        document.onkeydown = preventDefaultForScrollKeys;
        logg("ScrollControl: Scrolling is now DISabled.");
    },
};

const copyToClipboard = (text, printMsg = true) => {
    //Check browser support prior to using this function in prodution environment
    navigator.clipboard
        .writeText(text)
        .then(() => printMsg && logg(`copyToClipboard(): Copied "${text}"`))
        .catch((err) => {
            loggError(
                "copyToClipboard(): Error: could NOT copy the following text: ",
                text,
                "reason: ",
                err.message
            );
        });
};

const isInViewport = (elem) => {
    const rect = elem.getBoundingClientRect();
    const isIn =
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <=
            (window.innerHeight ||
                document.documentElement
                    .clientHeight) /*or $(window).height() */ &&
        rect.right <=
            (window.innerWidth ||
                document.documentElement.clientWidth); /*or $(window).width() */
    logg(
        `isInViewport() DOM element ${elem.nodeName} is ${
            isIn ? "" : "not "
        }inside the visible Viewport.`
    );

    return isIn;
};

const scrollTo = (domRef, config = {}) => {
    try {
        if (!domRef) {
            throw new Error(`missing paramter "domRef"`);
        }
        if (!domRef.scrollIntoView) {
            //maybe a ref object was passed (i.e. {current: domRef})
            domRef = domRef.current;
        }
        if (!domRef.scrollIntoView) {
            //not a DOM a ref, or scrollIntoView is not supported in current environment
            throw new Error(
                `domRef does not contain a property named scrollIntoView`
            );
        }
        domRef.scrollIntoView({
            block: config.block || "end",
            behavior: (config.block && config.block.behavior) || "smooth",
        });
    } catch (err) {
        loggError(`scrollTo(${domRef}): `, err.message);
        return null;
    }
};

const pollyfills = {
    requestAnimationFrame: () => {
        let requestFunction = window.requestAnimationFrame;
        let vendorCancel = window.cancelAnimationFrame;

        if (!requestFunction) {
            const vendors = ["ms", "moz", "webkit", "o"];
            for (let x = 0; x < vendors.length && !requestFunction; ++x) {
                requestFunction = window[vendors[x] + "RequestAnimationFrame"];
                vendorCancel = window.cancelAnimationFrame =
                    window[vendors[x] + "CancelAnimationFrame"] ||
                    window[vendors[x] + "CancelRequestAnimationFrame"];
            }
        }

        if (!requestFunction) {
            logg(
                "shimme(): window.requestAnimationFrame is not availble in current environemnt (browser / Node.js). Timeouts will be used in its place."
            );
            let lastTime = 0;
            const fallback = function(callback, element) {
                var currTime = new Date().getTime();
                var timeToCall = Math.max(0, 16 - (currTime - lastTime));
                var id = window.setTimeout(function() {
                    callback(currTime + timeToCall);
                }, timeToCall);
                lastTime = currTime + timeToCall;
                return id;
            };
            requestFunction = fallback;
        }

        window.requestAnimationFrame = requestFunction;
        window.cancelAnimationFrame = vendorCancel;
        return true;
    },
};

const shimme = (functionName = "requestAnimationFrame") => {
    if (pollyfills[functionName]) {
        return pollyfills[functionName]();
    } else {
        debugger;
        return null;
    }
};

const loadImage = (url = "", domElement) => {
    return new Promise((resolve, reject) => {
        if (!url) return reject("no URL");
        const imgNode = domElement ? domElement : document.body;
        const image = new Image(0, 0); //invisible (still forces to load the image)
        image.style.opacity = 0; //just to be extra sure
        //image.classList.add("hidden");
        image.onload = (ev) => {
            if (!image.decode) {
                //older versions of FireFox don't support decode()
                logg(
                    "Image.decode() is not supported in browser (older Firefox?)"
                );
                return resolve({ unsupported: true });
            }
            image.decode().then(() => {
                logg(
                    `loadImage(): image ${url} is loaded & decoded, ready to be inserted to the DOM.`
                );
                promiseKeeper
                    .stall(100, "loadImage(): stall till remove loaded image")
                    .then(() => {
                        if (!image.parentNode) {
                            debugger;
                            logg("Could not remove image-fetching img node");
                            return null;
                        }
                        imgNode.removeChild(image);
                    });
                return resolve(url);
            });
        };
        image.src = url;
        imgNode.appendChild(image);
    });
};

const removeDoubleSlashes = (path = "") => {
    const result = path.replace(/\/\//gi, "/");
    return result;
};

const navigateTo = (path, history = []) => {
    if (!path || !history || history.length === 0) return null;
    const completePath = removeDoubleSlashes(path);
    logg(`Navigating to: ${completePath}`);
    history.push({
        pathname: completePath,
        //state: { linkedScreen: completePath }
    });
};

var pwa = (() => {
    const addToHomescreen = () => {
        let deferredPrompt;
        window.addEventListener("beforeinstallprompt", (e) => {
            logg("addToHomescreen(): beforeinstallprompt event");
            // Prevent Chrome 67 and earlier from automatically showing the prompt
            e.preventDefault();
            // Stash the event so it can be triggered later.
            deferredPrompt = e;
            // Update UI to notify the user that she can add the app to the device's home screen
            const addToHomescreenBtn = document.querySelector("#root");
            logg('addToHomescreen(): Adding the class "snackbar-in" to #root');
            addToHomescreen.classList.add("snackbar-in");
            addToHomescreenBtn.addEventListener(
                "click",
                (ev) => {
                    //ev.preventDefault();
                    ev.stopPropagation();
                    //handle the event here

                    logg("addToHomescreen(): addToHomescreenBtn clicked");

                    deferredPrompt.prompt();
                    // Wait for the user to respond to the prompt
                    deferredPrompt.userChoice.then((choiceResult) => {
                        console("this === ", this);
                        this.classList.remove("snackbar-in");
                        addToHomescreen.classList.remove("snackbar-in");
                        const logMsg = `User ${
                            choiceResult.outcome === "accepted"
                                ? "accepted"
                                : "dismissed"
                        } the A2HS prompt`;
                        logg("addToHomescreen(): ", logMsg);
                        deferredPrompt = null;
                    });
                    //document.getElementById('add-to-homescreen').removeEventListener('click', clickHandler, false);
                },
                false
            ); // handleClick()
        });
    };
    return {
        addToHomescreen,
    };
})(); //pwaUtils self-executing Closure

//keyboard input
const keyEventHandlers = {};

// const defaultCallback = (keyEvent, registeredKeyEventHandler) => {
//     const { eventType, key } = keyEvent;
//     logg(
//         `Event "${eventType}" was triggered by the "${keyEvent.key}" key.`,
//         keyEvent,
//         registeredKeyEventHandler
//     );
// };

// const registerKey = (config = {}) => {
//     const { key = "", on = "keyup", callback = defaultCallback } = config;
//     if (!key || !on || !callback || isNot(callback).aFunction) {
//         logg("registerKey(): Missing parameter arguments!");
//         return null;
//     }

//     //The event.which property normalizes event.keyCode and event.charCode. It is recommended to watch event.which for keyboard key input.
//     //In a keypress event, the Unicode value of the key pressed is stored in either the keyCode or charCode property, never both. If the key pressed generates a character (e.g. 'a'), charCode is set to the code of that character, respecting the letter case. (i.e. charCode takes into account whether the shift key is held down). Otherwise, the code of the pressed key is stored in keyCode.
//     //for some problematic keys that don't have consistent implementation across browsers, we'll use their keyCode instead of their normal `key` name property
//     let keyToRegisterCode;
//     const _keyToRegister = key.toLowerCase();
//     switch (_keyToRegister) {
//         case "spacebar":
//             keyToRegisterCode = 32;
//             break;
//         case "enter":
//             keyToRegisterCode = 13;
//             break;
//         default:
//             keyToRegisterCode = -1;
//             break;
//     }

//     const _evenType = on.toLowerCase();
//     const _key = key.toLowerCase();

//     if (!keyEventHandlers[_evenType]) {
//         //first handler for the given event type. create a new entry
//         keyEventHandlers[_evenType] = {};
//     }
//     logg(
//         `Registering "on${on}" event handler for the "${key}" key. All registered key event handlers: `,
//         keyEventHandlers
//     );
//     keyEventHandlers[_evenType][_key] = callback;

//     //attach an event listener that will invoke the relevant registered callbacks
//     document.body["on" + _evenType] = function(ev) {
//         const eventType = ev.type;
//         const pressedKey = ev.key;
//         const _pressedKey = pressedKey.toLowerCase();

//         const handlers = keyEventHandlers[_evenType];
//         for (let [key, value] of Object.entries(handlers)) {
//             if (
//                 _pressedKey === key ||
//                 ev.keyCode === keyToRegisterCode ||
//                 ev.charCode === keyToRegisterCode ||
//                 ev.which === keyToRegisterCode
//             ) {
//                 handlers[key]({ key: pressedKey, eventType }, keyEventHandlers);
//             }
//         }
//     };
// };
const defaultKeyCallback = ({ key, on }) => {
    console.log(`The "${key}" key has just fired an "on${on}" event.`);
};
const handlePress = (
    {
        key = " ",
        keyCode = "",
        charCode = "",
        on = "keyup",
        preventDefault = false,
    },
    callback
) => {
    callback = is(callback).aFunction ? callback : defaultKeyCallback;
    on = on.toLowerCase();
    key = key.toLowerCase();
    if (!keyEventHandlers[on]) {
        keyEventHandlers[on] = {};
    }
    //add the provided callback to the store
    //e.g. : {keyup: {{enter:  fn}, {KeyDown: fn2}}}
    keyEventHandlers[on][key] = callback;
    document.body["on" + on] = (ev) => {
        if (preventDefault) ev.preventDefault();
        const handlers = keyEventHandlers[on];

        //iterate over the registered handlers for the current event
        for (let [_key, callback] of Object.entries(handlers)) {
            if (_key.toLowerCase() === ev.key.toLowerCase()) {
                //bingo
                callback({
                    on,
                    key: ev.key,
                    keyCode: ev.keyCode,
                    charCode: ev.charCode,
                });
            }
        }
    };
};
const removePressHandlers = (eventType = "onkeyup") => {
    document.body[eventType] = null;
    logg(`unRegistered the "on${eventType}" event for all keys.`);
};
/* //Example usage:
  onKeyPress({ key: " " }, () => {
        console.log("space bar was pressed!!");
    });
*/

//String manipulation
const capitalizeFirstLetter = (str = "", config = {}) => {
    if (!str) return null;
    const firstLetter = str[0].toUpperCase();
    const rest = str.slice(1);
    const finalRest = config.lowerCaseRest ? rest : rest.toLowerCase();
    return firstLetter + finalRest;
};

//easy api for accessing and setting browser's localStorage
class LocalStorage {
    get(key = "") {
        if (!key) return null;
        const rawString = window.localStorage.getItem(key);
        return rawString;
    }
    getObj(key = "") {
        const str = this.get(key);
        if (!str) return null;
        const obj = JSON.parse(str);
        return obj;
    }
    getArray(key = "") {
        //JSON.parse is good with arrays, too
        const canAccessOtherMethods = this.getObj(key);
        return canAccessOtherMethods;
    }
    set(key = "", val = "") {
        if (!key) return null;
        window.localStorage.setItem(key, val);
    }
    setObj(key = "", val = {}) {
        if (!key) return null;
        this.set(key, JSON.stringify(val));
    }
    setArray(key = "", val = []) {
        if (!key) return null;
        //see comment above
        this.set(key, JSON.stringify(val));
    }
}

//create hash string
const getUniqueString = () => {
    let rand = Math.random()
        .toString(36)
        .slice(2, 10);
    return "_" + rand;
};

const IssyLoop = (function() {
    class Looper {
        constructor(array = []) {
            if (!array) return null;
            //gets called by goOver
            //save a reference to the array argument for later use by looper.do()
            this.array = array;
        }
        do = (callback) => {
            if (!callback) return null;
            const _arr = this.array;
            _arr.forEach((item, i) => {
                callback(item, i, _arr);
            });
        };
    }
    const convertToArray = (collection) => {
        if (our(collection).is.anArray) return collection;
        let asArray;
        try {
            asArray = [...collection];
        } catch (err) {
            loggError("convertToArray(): ", err.message);
            return null;
        }
        if (!asArray) return null;
        return asArray;
    };
    const goOver = (arr) => {
        //accepting only Array and Array-like objects (such as NodeList)
        let _arr = convertToArray(arr);
        return new Looper(_arr ? _arr : []);
        //e.g.:
        // goOver(items).do((item, i, _arr)=>console.log(item));
    };
    const forAll = (items, callback) => {
        //accepting only Array and Array-like objects (such as NodeList)
        let _arr = convertToArray(items);
        new Looper(_arr).do(callback);
        //e.g.:
        // forAll(items, (item, i, _arr)=>console.log(item));
    };
    return { forAll, goOver };
})(); //Looper self-executing Closure

const { forAll, goOver } = IssyLoop;

// DOM traversing
const findAncestor = (config = {}) => {
    const { domNode, styleAttribute = "", value } = config;
    if (!domNode || !is(domNode).anObject || !styleAttribute) return null;
    const maxIterations = 100;
    let isFound = false;
    let numIterations = 0;
    let ancestor = domNode.parentNode;
    try {
        do {
            numIterations++;
            if (!ancestor) break;
            const currentStyles = getComputedStyle(ancestor);
            isFound = currentStyles[styleAttribute] === value;
            if (isFound) break;
            ancestor = ancestor.parentNode;
        } while (!isFound && numIterations < maxIterations);
    } catch (err) {
        loggError("Error infindAncestor: ", err.message);
    }
    return isFound ? ancestor : false;
};

class DomClimberError {
    constructor(config = {}) {
        const { missingParam } = config;
        this.msg = `invalid "${missingParam}" argument.`;
    }
}

class DOMClimber {
    constructor(domElem) {
        if (!domElem || !(domElem instanceof HTMLElement))
            logg(`missingParam: "domElem" `);
        this.offsetElem = domElem;
        debugger;
    }
    upTo = (config = {}) => {
        debugger;
        if (!config || !is(config).anObject) {
            return new DomClimberError({
                missingParam: "config (first parameter)",
            });
        }
        const { attr, className = "" } = config;
        if (!className && (!attr || !is(attr).anObject)) {
            return new DomClimberError({
                missingParam: "any config value (attr, className..",
            });
        }

        const { maxIterations } = config;
        const _maxIterations =
            maxIterations && is(maxIterations).aNumber ? maxIterations : 100;

        //here is the juicy part
        let isFound = false;
        let numIterations = 0;
        let ancestor = this.offsetElem; //start from the provided elem itself.
        try {
            do {
                numIterations++;
                if (!ancestor) break;

                let hasDifferentVal = false;

                if (attr) {
                    //go over the required attributes and look for an ancestor DOM element that contains all of them, with the same values as the required ones
                    for (let [attrName, attrValue] of Object.entries(attr)) {
                        const ancestorAttrValue = ancestor.getAttribute(
                            attrName
                        );
                        if (ancestorAttrValue !== attrValue) {
                            hasDifferentVal = true;
                            //it's not this element, so...
                            break;
                        }
                    }
                }

                if (!hasDifferentVal && className) {
                    const hasClass = ancestor.classList.contains(className);
                    if (!hasClass) {
                        hasDifferentVal = true;
                    }
                }

                if (hasDifferentVal) {
                    //encestor was NOT FOUND. climb up another level
                    ancestor = ancestor.parentNode;
                    continue;
                } else {
                    // all specified requirement have been met! We found the one!
                    isFound = true;
                    break;
                }
            } while (!isFound && numIterations < _maxIterations);
        } catch (err) {
            logg(err);
        }
        return isFound ? ancestor : false;
    };
}

const climbFrom = (domElem) => {
    if (!domElem || !(domElem instanceof HTMLElement))
        return new DomClimberError({ missingParam: "domElem" });
    return new DOMClimber(domElem);
};

// dynamic DOM element positioning
const alignElements = ({
    movingElem = {},
    targetElem = {},
    offsetProp = "top",
    extraPadding = 0,
    push = "down",
    multiplier = 1,
    ofElement = "moving",
}) => {
    if (!targetElem || !movingElem) return null;
    let _target;
    let _movingElem;
    try {
        _target =
            targetElem.current ||
            (targetElem instanceof window.HTMLElement && targetElem);
        if (!_target) return null;
        _movingElem =
            movingElem.current ||
            (movingElem instanceof window.HTMLElement && movingElem);
        if (!_movingElem) return null;
    } catch (err) {
        console.log(err);
        return null;
    }

    // Note: elem.getBoundingClientRect().top !== elem.style.top
    //the first is relative to the viewport (i.e. the window in its current scrolling position) while the second is relative to the nearest parent element with a position of "relative". This means that if the moving element is inside a relative-positioned element that starts from below the top of the viewport, than
    // elem.getBoundingClientRect().top > elem.style.top
    // to get around this, you can:
    //give the moving element a position of "absolute" or "fixed" and make sure that it doesn't have any "realtive"-positioned parents that get in the way all the until the edge of the viewport. ORRRR... :)

    // Simply pass in
    /*
            {offsetProp: "top", 
            extraPadding: 56, 
            movingElem: ..., targetElem: ...}
        */

    //This will align the moving element to the top of the target element, by removing the interfering appbar (56px) that is above the moving element.

    const movingElemStyle = _movingElem.style;

    const targetBox = _target.getBoundingClientRect();
    const movingBox = _movingElem.getBoundingClientRect();

    let newPropVal;

    if (["top", "bottom"].includes(offsetProp)) {
        let relativePadding;
        if (
            !["up", "down"].includes(push) ||
            !multiplier ||
            multiplier === 1 ||
            !ofElement
        ) {
            relativePadding = 0;
        } else {
            const _prop = ["up", "down"].includes(push) ? "height" : "width";
            const _elem = ofElement === "moving" ? movingBox : targetBox;
            relativePadding = _elem[_prop] * multiplier;
            if (["up", "left"].includes(push))
                relativePadding = -1 * relativePadding;
        }

        newPropVal =
            targetBox[offsetProp] + extraPadding + relativePadding + "px";
        movingElemStyle[offsetProp] = newPropVal;
        // lineStyle[offsetProp] = newPropVal;
    } else {
        logg("Misssing or unsupported offsetProp");
        return null;
    }
};

//AJAX

const handleBadResponse = (res, uri) => {
    if (!res || res.status === 404 || !res.ok) {
        throw new Error(`404: route ${uri} was not found`);
    }
    if (!res.json) {
        throw new Error(
            `Response object doesn't have a .json() method. The server is probably not an Express one (res.json is an Express method).`
        );
    }
};
const handleBadData = (data, uri) => {
    if (data.code === 404 || data.notFound)
        throw new Error(`404: route ${uri} not found`);
};

const request = async (method = "GET", uri = "", payload = {}, config = {}) => {
    //make an AJAX request and either catch errors or parse the received response
    if (!uri) {
        throw new Error(`missing parameter "uri"`);
    }
    method = method ? method.toUpperCase() : "GET";
    if (["POST", "PUT", "DELETE"].includes(method) && !is(payload).anObject) {
        throw new Error("payload should be an object! Instead got: ", payload);
    }

    let parsedResponse;
    try {
        const res =
            method === "GET"
                ? await fetch(uri)
                : await fetch(uri, {
                      method,
                      headers: {
                          Accept: "application/json",
                          "Content-Type": "application/json",
                      },
                      body: JSON.stringify(payload),
                  });
        if (!res || res.status === 404) {
            throw new Error(`404: URI ${uri} was not found`);
        }
        if (!res.ok) {
            throw new Error(`bad response from URI ${uri}`);
        }
        if (!res.json) {
            throw new Error(
                `Response object doesn't have a .json() method. The server is probably not an Express one (res.json is an Express method).`
            );
        }

        parsedResponse = await res.json();
        if (parsedResponse.code === 404 || parsedResponse.notFound) {
            throw new Error(
                `AJAX request result ::: 404: route "${uri}" was not found within the addressed server.`
            );
        }

        //proper response was received!
        return parsedResponse;
    } catch (err) {
        const ajaxResult = {
            error: err.message,
            response: parsedResponse,
        };
        logg(ajaxResult);
        const throwOnError = config.throwOnError || false;
        if (throwOnError) {
            throw new Error(err.message);
        } else {
            return ajaxResult;
        }
    }
};

const getJSON = async (uri = "") => {
    if (!uri) {
        throw new Error(`missing parameter "uri"`);
    }
    const res = await fetch(uri);
    handleBadResponse(res, uri);
    const data = await res.json();
    handleBadData(data, uri);
    return data;
};
const postJSON = async (uri = "", payload = {}) => {
    if (!uri) {
        throw new Error(`missing parameter "uri"`);
    }
    if (!is(payload).anObject) {
        throw new Error("payload should be an object! Instead got: ", payload);
    }
    const res = await fetch(uri, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
    });
    handleBadResponse(res, uri);
    const data = await res.json();
    handleBadData(data, uri);
    return data;
};

//fallbacks
const emptyFunc = () => {};

const asyncForEach = async (array, callback) => {
    //iterate syncly over an array, awaiting the complettion of an async callback for each item in the array
    for (let index = 0; index < array.length; index++) {
        //fire the callback with the arguments that a regular forEach function expects: [item, index, originalArray]
        await callback(array[index], index, array);
    }
};

const sanitizeVarName = (name) => {
    //create a name that is JS-safe (i.e. starts with a letter or an underscore, and then has only alphanumeric or underscore characters)
    if (!name) throw new Error(`no variable name provided`);
    const onlyCharsAndDigits = name.replace(/[^a-zA-Z\d]+/g, "_");
    const firstChar = name[0];
    const firstCharIsLetterOrUnderscore = firstChar.replace(/[^a-zA-Z]+/g, "_");
    const sanitizedName =
        firstCharIsLetterOrUnderscore + onlyCharsAndDigits.slice(1);
    return sanitizedName;
};

module.exports = {
    is,
    isNot,
    our,
    getRandomUpTo,
    pickRandomFrom,
    PromiseKeeper,
    shuffle,
    getLastXItems,
    getFormattedTime,
    toTime,
    ScrollControl,
    copyToClipboard,
    isInViewport,
    scrollTo,
    shimme,
    loadImage,
    navigateTo,
    pwa,
    capitalizeFirstLetter,
    LocalStorage,
    getRandomColor,
    getUniqueString,
    forAll,
    goOver,
    handlePress,
    removePressHandlers,
    findAncestor,
    alignElements,
    getJSON,
    postJSON,
    request,
    DOMClimber,
    climbFrom,
    emptyFunc,
    asyncForEach,
    sanitizeVarName,
};
