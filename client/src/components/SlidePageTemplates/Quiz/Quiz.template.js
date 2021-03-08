import React, {
	useContext,
	useEffect,
	useRef,
	Suspense,
	useCallback,
} from "react";
import CenteredContainer from "../../CenteredContainer/CenteredContainer.js";
import Heading from "../../Heading/Heading.js";
import View from "../../layout/View.jsx";
// import Page from "../Page.js";
import Text from "../../Text/Text.js";
//import StyledPage from "./Quiz.template.scss";
import Quiz from "../../Quiz/Quiz.jsx";

const label = "QuizTemplate";

const QuizTemplate = (props) => {
	// const [appUtils] = useContext(AppContext);
	// const { PromiseKeeper, Logger } = appUtils;
	const {
		heading = "",
		subheading = "",
		p = [""],
		bgImage = "",
		pages = [],
	} = props;

	// const { logg, loggError } = useLogg({ label });
	// const promiseKeeper = usePromiseKeeper({ label });
	return (
		<div className={"Page--centered-headings centered"}>
			<Heading h="1">{heading}</Heading>
			<Heading h="2">{subheading}</Heading>
			<Quiz />
		</div>
	);
};

export default QuizTemplate;

/*



*/
