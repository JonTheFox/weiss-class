//* Safely log messages to the console ONLY IN DEVELOPMENT!
// * logging in production is possible, too, by passing a logInProduction=true
// * Keeps the original line reference!
// * Supports printing a complimentary label to the data
// ** supports sub-label
// * Alternatively, pass in "this" to use the name of the component as the label!
// * Logg & loggError
// * Built-in style presets
// * Zero dependencies, Itsy bitsy in size 8-)

// Usage
// ----------
// // const {logg} = new Logger({label:"homepage"});
//logg(data);

//or:

/// const logger = new Logger({context:this});

//create sub-loggers
//------------------
// const {logg, loggError} = logger.createSubLogger("darkBlue");

const isString = arg => {
	if (!arg && arg !== "") return false;
	return typeof arg === "string" || arg instanceof String;
};
const isObject = arg => typeof arg === "object" && arg !== null;

const COMMANDS = {
	insertionPoint: "%s",
	Reset: "\x1b[0m",
	Bright: "\x1b[1m",
	Dim: "\x1b[2m",
	Underscore: "\x1b[4m",
	Blink: "\x1b[5m",
	Reverse: "\x1b[7m",
	Hidden: "\x1b[8m"
};
const FONT_COLORS = {
	BLACK: "\x1b[30m",
	RED: "\x1b[31m",
	GREEN: "\x1b[32m",
	YELLOW: "\x1b[33m",
	BLUE: "\x1b[34m",
	MAGENTA: "\x1b[35m",
	CYAN: "\x1b[36m",
	WHITE: "\x1b[37m"
};
const BG_COLORS = {
	BLACK: "\x1b[40m",
	RED: "\x1b[41m",
	GREEN: "\x1b[42m",
	YELLOW: "\x1b[43m",
	BLUE: "\x1b[44m",
	MAGENTA: "\x1b[45m", //purple
	CYAN: "\x1b[46m", //i.e light blue
	WHITE: "\x1b[47m"
};

const STYLES = {
	sky: `${BG_COLORS.CYAN}${FONT_COLORS.WHITE}${COMMANDS.insertionPoint}${COMMANDS.Reset}`,
	error: `${BG_COLORS.RED}${FONT_COLORS.WHITE}${COMMANDS.insertionPoint}${COMMANDS.Reset}`,
	success: `${BG_COLORS.GREEN}${FONT_COLORS.WHITE}${COMMANDS.insertionPoint}${COMMANDS.Reset}`,
	warning: `${BG_COLORS.YELLOW}${FONT_COLORS.BLACK}${COMMANDS.insertionPoint}${COMMANDS.Reset}`,
	kettem: `${BG_COLORS.MAGENTA}${FONT_COLORS.WHITE}${COMMANDS.insertionPoint}${COMMANDS.Reset}`,
	generic: `${BG_COLORS.WHITE}${FONT_COLORS.BLACK}${COMMANDS.insertionPoint}${COMMANDS.Reset}`,
	darkBlue: `${BG_COLORS.BLUE}${FONT_COLORS.WHITE}${COMMANDS.insertionPoint}${COMMANDS.Reset}`,
	orange: `${BG_COLORS.BLACK}${FONT_COLORS.YELLOW}${COMMANDS.insertionPoint}${COMMANDS.Reset}`
};

let _isDevelopmentMode;

//this script might run before the environment variables are set, so we'll dynamically check them
const isDevelopmentMode = () => {
	if (_isDevelopmentMode) return true;
	if (process.env.NODE_ENV === "development") {
		_isDevelopmentMode = true;
		return true;
	}
	return _isDevelopmentMode || false;
};
_isDevelopmentMode = isDevelopmentMode();

const createLogger = (labelTexts, style, logInProduction) => {
	if (!isDevelopmentMode() && !logInProduction) {
		return () => null;
	}
	const labels = labelTexts.split(" ").map(_label => ` ${_label} `);

	return console.log.bind(null, style, ...labels);
};

class Logger {
	label = "";
	context;
	preface;
	stylePreset;
	constructor(config = {}) {
		const {
			label = "",
			context,
			stylePreset,
			logInProduction = false,
			labels,
			style
		} = config;
		this.logInProduction = logInProduction;

		let textLabel;
		if (label && isString(label)) {
			textLabel = label;
		} else if (context && isObject(context)) {
			textLabel = context.__proto__.constructor.name;
		} else {
			textLabel = "";
		}
		this.label = textLabel;
		this.preface = textLabel;

		const _style =
			style && isString(style)
				? style
				: stylePreset && isString(stylePreset) && STYLES[stylePreset]
				? STYLES[stylePreset]
				: "";
		this.style = _style;
		this.stylePreset = stylePreset;

		this.logg = createLogger(textLabel, _style, logInProduction);
		this.loggError = createLogger(
			textLabel,
			_style + STYLES.error,
			logInProduction
		);
	}
}

Logger.prototype.createSubLogger = function({
	label: subLabel,
	style: stylePreset
}) {
	if (!subLabel) throw new Error(`missing parameter 'label'`);
	const subLabelStyle = STYLES[stylePreset] || STYLES.generic;
	return new Logger({
		label: this.label + " " + subLabel,
		style: STYLES[this.stylePreset] + subLabelStyle,
		logInProduction: this.logInProduction
	});
};

module.exports = Logger;
