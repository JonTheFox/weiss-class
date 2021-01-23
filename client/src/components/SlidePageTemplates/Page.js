import React from "react";
import StyledPage from "./Page.styles.js";
import CenteredHeadings from "../CenteredHeadings.js";
import BottomThirdCaption from "../BottomThirdCaption.js";
import Text1 from "../Text1.js";

const PAGE_TEMPLATES = { CenteredHeadings, Text1, BottomThirdCaption };

const label = "Page";
const Page = (props) => {
	const { templateName = "" } = props;
	const LessonSlide =
		PAGE_TEMPLATES[templateName] || PAGE_TEMPLATES["CenteredHeadings"];

	return (
		<StyledPage>
			<LessonSlide {...props} />
		</StyledPage>
	);
};

export default Page;
