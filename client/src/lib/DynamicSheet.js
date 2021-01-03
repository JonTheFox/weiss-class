const attachStyleSheet = () => {
	const styleElem = document.createElement("style");

	// Add a media (and/or media query) here if you'd like!
	// style.setAttribute("media", "screen")
	// style.setAttribute("media", "only screen and (max-width : 1024px)")

	// WebKit hack :(
	styleElem.appendChild(document.createTextNode(""));

	document.head.appendChild(styleElem);
	return styleElem.sheet;
};

const label = "DynamicStyleSheet : ";
const NO_STYLESHEET_MSG = label + "ERROR: no this.stylesheet!";

class DynamicStyleSheet {
	stylesheet;
	cssRules = [];
	constructor(config = {}) {
		this.stylesheet = attachStyleSheet();
	}

	referVar = varName => {
		if (!varName) return null;
		//support both --varName and varName
		if (varName[0] !== "-") varName = "--" + varName;
		return `var(${varName})`;
	};

	createRuleString = (config = {}) => {
		const {
			selector = ".color-1-base",
			propertyName = "fill",
			propertyValue = "var(--color-1-base)",
			important = false
		} = config;
		if (!selector || !propertyValue || !propertyValue) return null;
		let cssRule = `${selector} {${propertyName}: ${propertyValue} ${
			important ? "!important" : ""
		};}`;

		return cssRule;
	};

	addRule = (rule = {}) => {
		try {
			if (!this.stylesheet) {
				throw new Error(NO_STYLESHEET_MSG);
			}
			if (!rule) {
				throw new Error("no rule supplied");
			}
			const ruleString = this.createRuleString(rule);
			if (ruleString) {
				const indexInStylesheet = this.stylesheet.insertRule(rule);
				console.log(label + " added rule: ", ruleString);
				//for debugging purposes
				this.cssRules.push({ rule, indexInStylesheet });
			}
		} catch (err) {
			console.log(err.message);
			return null;
		}
	};
}

export default DynamicStyleSheet;
