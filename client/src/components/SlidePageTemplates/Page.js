import React from "react";
import StyledPage from "./Page.styles.js";
import CenteredHeadings from "../SlidePageTemplates/CenteredHeadings.js";
import BottomThirdCaption from "../SlidePageTemplates/BottomThirdCaption.js";
import Text1 from "../SlidePageTemplates/Text1.js";
import ListMain from "../SlidePageTemplates/ListMain/ListMain.js";
import VideoCentered from "../SlidePageTemplates/VideoCentered/VideoCentered.js";

const PAGE_TEMPLATES = {
	CenteredHeadings,
	Text1,
	BottomThirdCaption,
	ListMain,
	VideoCentered,
};

const label = "Page";
const Page = (props) => {
	const { templateName = "" } = props;
	const LessonPage =
		PAGE_TEMPLATES[templateName] || PAGE_TEMPLATES["CenteredHeadings"];

	return (
		<StyledPage className={"Page-container"}>
			<LessonPage {...props} />
		</StyledPage>
	);
};

export default Page;
