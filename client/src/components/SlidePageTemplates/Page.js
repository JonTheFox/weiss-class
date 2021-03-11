import React, { useEffect, useContext } from "react";
import StyledPage from "./Page.styles.js";
import CenteredHeadings from "../SlidePageTemplates/CenteredHeadings.js";
import BottomThirdCaption from "../SlidePageTemplates/BottomThirdCaption.js";
import Text1 from "../SlidePageTemplates/Text1.js";
import ListMain from "../SlidePageTemplates/ListMain/ListMain.js";
import VideoCentered from "../SlidePageTemplates/VideoCentered/VideoCentered.js";
import VideoWithContent from "../SlidePageTemplates/VideoWithContent/VideoWithContent.js";
import Quiz from "../SlidePageTemplates/Quiz/Quiz.template.js";
import clsx from "clsx";
import showBgState from "../../store/showBg.atom.js";
import { useRecoilValue } from "recoil";
// import { AppContext } from "../../contexts/AppContext.jsx";

const PAGE_TEMPLATES = {
	CenteredHeadings,
	Text1,
	BottomThirdCaption,
	ListMain,
	VideoCentered,
	VideoWithContent,
	Quiz,
};

const label = "Page";
const Page = (props) => {
	const { templateName = "", isCurrentlyViewed, pageIndex, opacity } = props;
	const showBg = useRecoilValue(showBgState);

	const LessonPage =
		PAGE_TEMPLATES[templateName] || PAGE_TEMPLATES["CenteredHeadings"];

	return (
		<StyledPage
			className={clsx(
				"Page-container",
				props.bgClass &&
					showBg &&
					`has-before show-before ${props.bgClass} before--opacity---0-${props.opacity}`
			)}
		>
			<LessonPage {...props} />
		</StyledPage>
	);
};

export default Page;
