import Logger from "../logg";
const label = "SpeechRecognizer";
const { logg, loggError } = new Logger({ label });

const defaultConfig = {
  continuous: true,
  lang: "en-US",
  interimResults: false,
  maxAlternatives: 1,
  timeout: 4500,
  grammarGenericType: "someType",

  //default event handlers (they simply logg out messages in development mode)
  onResult: ({
    allMatched = false,
    wordResults = [],
    transcript = "",
    confidence = 0,
  }) => {
    const msg = allMatched
      ? "All expected speech was recognized! "
      : "Some speech was recognized, though not all that was expected. ";
    logg(
      msg,
      wordResults,
      ` 
      transcript: "${transcript}"
      confidence: ${confidence}`
    );
  },
  onStart: (recognition, speechRecognizer) => {
    // logg("onStart(): Speech recognition service started. ", recognition);
  },
  onEnd: (recognition, speechRecognizer) => {
    // logg("onEnd(): Speech recognition service has disconnected. ", recognition);
  },

  onSpeechStart: (recognition, speechRecognizer) => {
    // logg("onSpeechStart(): Speech has been recognised. ");
  },
  onSpeechEnd: (recognition, speechRecognizer) => {
    // logg("onSpeechEnd(): User finished speaking. Stopping recognition.");
    recognition.stop();
  },

  onSoundStart: (recognition, speechRecognizer) => {
    // logg("onSoundStart(): Some sound (speech or other) has been detected. ");
  },
  onSoundEnd: (recognition, speechRecognizer, ev) => {
    // logg(
    //   "onSoundEnd(): Some sound (speech or other) has stopped being detected."
    // );
  },

  onAudioStart: (recognition, speechRecognizer) => {
    // logg(
    //   "onAudioStart(): The user agent has started to capture audio for speech recognition."
    // );
  },
  onAudioEnd: (recognition, speechRecognizer) => {
    // logg(
    //   "onAudioEnd(): The user agent has finished capturing audio for speech recognition."
    // );
  },

  onNoMatch: (recognition, speechRecognizer) => {
    // logg("User finished speaking. Should recognition be stopped?");
  },
  onError: (recognition, speechRecognizer, reason, ev) => {
    loggError("An error occurred in recognition: ", reason);
  },
};

class SpeechRecognizer {
  constructor(words = [], config = defaultConfig) {
    if (!(window.SpeechGrammarList || window.webkitSpeechGrammarList)) {
      const errMsg =
        "Browser does not support the Speech Recognition API (window.SpeechGrammarList is falsy)";
      logg(errMsg);
      return null;
    } //for Chrome

    this.listening = false;
    this.words = words;

    const combinedConfig = {};
    for (let [key, value] of Object.entries(defaultConfig)) {
      combinedConfig[key] = config[key] || value || false;
    }

    //some extra special properties
    const _lang =
      (config.langRef && config.langRef.current) ||
      (config.refs &&
        config.refs.current &&
        config.refs.current.selectedLang) ||
      combinedConfig.lang;
    combinedConfig.lang = _lang;

    const _type = config.grammarGenericType || defaultConfig.grammarGenericType;

    const recognition = this.getRecognitionFor(words, _type, _lang, {
      interimResults: combinedConfig.interimResults,
      continuous: combinedConfig.continuous,
      lang: _lang,
    });

    //More options
    // recognition.continuous = combinedConfig.continuous;
    // recognition.lang = _lang;
    // recognition.interimResults = combinedConfig.interimResults || false;

    recognition.maxAlternatives = combinedConfig.maxAlternatives || 1;

    //attach the main event handlers, which will in turn call the respective handlers passed to the constructor
    //the main event handlers are defined as arrow functions so that their *this* property points to the SpeechRecognizer instance
    recognition.onresult = (ev) => {
      ev.preventDefault();
      const { results } = ev;
      // The SpeechRecognitionEvent results property returns a SpeechRecognitionResultList object
      // The SpeechRecognitionResultList object contains SpeechRecognitionResult objects.
      // It has a getter so it can be accessed like an array
      // The [last] returns the SpeechRecognitionResult at the last position.
      // Each SpeechRecognitionResult object contains SpeechRecognitionAlternative objects that contain individual results.
      // These also have getters so they can be accessed like arrays.
      // The [0] returns the SpeechRecognitionAlternative at position 0.
      // We then return the transcript property of the SpeechRecognitionAlternative object
      const speechRecognitionAlternative = results[results.length - 1][0];
      const confidence = speechRecognitionAlternative.confidence;
      //where available, use ES6's nice method for shortening a decimal
      const confidence_shortened = confidence.toFixed
        ? confidence.toFixed(2)
        : confidence;
      const transcript = speechRecognitionAlternative.transcript;

      let numMatches = 0;
      let res;
      const wordResults = this.words.map((word) => {
        const pos = transcript.indexOf(word);
        res = { word, index: pos };
        if (pos > -1) {
          numMatches++;
          res.matched = true;
        } else {
          res.matched = false;
        }
        return res;
      });

      const finalResult = {
        allMatched: numMatches === this.words.length,
        wordResults,
        transcript,
        confidence: confidence_shortened,
      };

      // const res = { transcript, confidence: confidence_shortened };
      combinedConfig.onResult(finalResult, this);

      return finalResult;
    };

    recognition.onstart = () => {
      //fired when the speech recognition service has begun listening to incoming audio with intent to recognize grammars associated with the current SpeechRecognition.
      this.listening = true;
      combinedConfig.onStart(recognition, this);
    };
    recognition.onend = () => {
      //fired when the speech recognition service has disconnected.
      this.listening = false;
      combinedConfig.onEnd(recognition, this);
    };

    recognition.onspeechstart = function() {
      // Fired when sound that is recognised by the speech recognition service as speech has been detected.
      combinedConfig.onSpeechStart(recognition, this);
    };
    recognition.onspeechend = function() {
      //Fired when speech recognised by the speech recognition service has stopped being detected.
      combinedConfig.onSpeechEnd(recognition, this);
    };

    recognition.onsoundstart = function() {
      //The soundstart event of the Web Speech API is fired when *any* sound — recognisable speech or not — has been detected.
      combinedConfig.onSoundStart(recognition, this);
    };
    recognition.onsoundend = function(ev) {
      //Fired when any sound — recognisable speech or not — has stopped being detected.
      ev.preventDefault();
      combinedConfig.onSoundEnd(recognition, this, ev);
    };

    recognition.onnomatch = function() {
      logg(
        "SpeechRecog:: User finished speaking before any recognition happened. Stopping recognition?"
      );
      combinedConfig.onNoMatch(recognition, this);
    };

    recognition.onerror = function(ev) {
      ev.preventDefault();
      combinedConfig.onError(recognition, this, ev, ev.error);
    };
    recognition.onaudioend = function() {
      //The audioend event of the Web Speech API is fired when the user agent has finished capturing audio for speech recognition.
      combinedConfig.onAudioEnd(recognition, this);
    };

    recognition.onaudiostart = function() {
      //The audiostart event of the Web Speech API is fired when the user agent has started to capture audio for speech recognition.
      combinedConfig.onAudioStart(recognition, this);
    };

    //done with setup.
    //save the recognition object inside the just-constructed instance of our wrapper object
    this.recognition = recognition;
  }

  //helper methods
  createGrammarString = (words = [], type = defaultConfig.type) => {
    const str = `#JSGF V1.0; grammar ${type}s; public <${type}> = 
      ${words.join(" | ")} ;`;
    return str;
  };

  getRecognitionFor = (words, type, deprecatedlang = "en-GB", config = {}) => {
    if (!words) return null;

    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition; //for Chrome

    const recognition = new SpeechRecognition();
    // recognition.lang = lang;
    // const interimResults = config.interimResults || false;
    // const continuous = config.continuous || false;
    Object.assign(recognition, config);

    this.grammarGenericType = type;

    //add a grammar string (which includes the words to be recognized) to the recognition object
    const SpeechGrammarList =
      window.SpeechGrammarList || window.webkitSpeechGrammarList; //for Chrome
    const speechRecognitionList = new SpeechGrammarList();
    speechRecognitionList.addFromString(
      this.createGrammarString(words, type),
      1
    );
    recognition.grammars = speechRecognitionList;

    // //ain't used?
    // const SpeechRecognitionEvent =
    //   window.SpeechRecognitionEvent || window.webkitSpeechRecognitionEvent;

    return recognition;
  };

  //public API methods
  listen = () => {
    //this function is defined as an arrow function, so that its *this* value will point to the SpeechRecognizer instance
    if (!this.listening && this.recognition) {
      //start listening to the configured grammar/words
      this.recognition.start();
    }
  };

  listenFor = (config = {}) => {
    //for listening to another list of words. Optionally, other configs can be passed to this individual listening service.  For example: continious & intermediate result

    const { words, once = false, onMatch, onResult } = config;

    if (!words || !words.length) return null;

    const lang =
      config.lang ||
      this.recognition.lang ||
      this.lang ||
      defaultConfig.lang ||
      "en-US";

    //a mysterious part of the original API
    const type =
      config.type ||
      this.grammarGenericType ||
      defaultConfig.grammarGenericType;

    //boolean parameters
    const continuous =
      config.continuous ??
      recognition.continuous ??
      this.continuous ??
      defaultConfig.continuous;

    const interimResults =
      config.interimResults ??
      recognition.interimResults ??
      this.interimResults ??
      defaultConfig.continuous;

    const recognition = this.getRecognitionFor(words, type, lang, {
      interimResults,
      continuous,
      lang,
    });

    // recognition.interimResults = interimResults ?? recognition.interimResults;

    // recognition.continuous = continuous ?? recognition.continuous;

    return new Promise((resolve, reject) => {
      recognition.onerror = (e) => reject(e);

      recognition.onresult = (e) => {
        const { results } = e;
        if (once) {
          debugger;
          recognition.stop();
        }
        const speechRecognitionAlternative = results[results.length - 1][0];
        const { transcript, confidence } = speechRecognitionAlternative;

        // logg(
        //   `Last Speech-Recognition result: confidence: ${confidence}. transcript: ${transcript}`,
        //   speechRecognitionAlternative
        // );

        // logg(
        //   "onresult speechRecognitionAlternative:  ",
        //   speechRecognitionAlternative
        // );

        const matched = words.includes(transcript.toLowerCase().trim());

        if (matched) {
          resolve(speechRecognitionAlternative);
          if (onMatch) {
            onMatch(speechRecognitionAlternative);
          }
        } else {
          //logg("not matched");
        }

        //finally, call the argument event handler
        onResult(speechRecognitionAlternative);
      };
      recognition.onspeechend = (e) => logg(e);
      recognition.start();
      logg("Recognition starts!");
    });
  };
  stopListening = () => this.recognition.stop();

  //methods for setting event handlers after initialization
  onResult = (handler) => (this.recognition.onresult = handler);
  onSpeechEnd = (handler) => (this.recognition.onspeechend = handler);
  onNoMatch = (handler) => (this.recognition.onnomatch = handler);
  onError = (handler) => (this.recognition.onerror = handler);
  setLanguage = (langString = "en-GB") => (this.recognition.lang = langString);
  setInterimResults = (acceptInterimResults = false) =>
    (this.recognition.interimResults = "blah");
  setMaxAlternatives = (maxAlternatives = 1) =>
    (this.recognition.maxAlternatives = maxAlternatives);
}

export default SpeechRecognizer;

/* 
//example usage:
import SpeechRecognizer from '../lib/speech/SpeechRecognizer';

const speechRecognizer = new SpeechRecognizer(['ok', "cancel"]);
speechRecognizer.listen();
setTimeout(() => {
  speechRecognizer.stopListening();
}, 20000);

// Check the console for the results! :)
*/
