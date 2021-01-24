import React from "react";
import StyledPage from "./Page.styles.js";
import CenteredHeadings from "../SlidePageTemplates/CenteredHeadings.js";
import BottomThirdCaption from "../SlidePageTemplates/BottomThirdCaption.js";
import Text1 from "../SlidePageTemplates/Text1.js";

const PAGE_TEMPLATES = { CenteredHeadings, Text1, BottomThirdCaption };

const label = "Page";
const Page = (props) => {
	const { templateName = "" } = props;
	const LessonSlide =
		PAGE_TEMPLATES[templateName] || PAGE_TEMPLATES["CenteredHeadings"];

	return (
		<StyledPage className={"Page"}>
			<LessonSlide {...props} />
		</StyledPage>
	);
};

export default Page;
