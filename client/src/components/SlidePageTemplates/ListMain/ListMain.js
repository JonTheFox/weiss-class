import React from "react";
import StyledPage from "../Page.styles.js";
import CenteredHeadings from "../../SlidePageTemplates/CenteredHeadings.js";
import BottomThirdCaption from "../../SlidePageTemplates/BottomThirdCaption.js";
import Text1 from "../../SlidePageTemplates/Text1.js";
import PAGE_TEMPLATE_NAMES from "../pageTemplates.js";
import List from "../../List/List.js";
import Heading from "../../Heading/Heading.js";
import Text from "../../Text/Text.js";
import "./_ListMain.scss";

const PAGE_TEMPLATES = { CenteredHeadings, Text1, BottomThirdCaption, List };

const label = "ListMain";
const ListMain = (props) => {
	const { heading = "", bullets = [], templateName = "", p = [] } = props;

	return (
		<StyledPage className={"ListMain-container"} {...props}>
			<Heading>{heading}</Heading>

			{p &&
				p.map &&
				p.map((paragraph) => {
					return <Text>{paragraph}</Text>;
				})}
			<List listItems={bullets} />
		</StyledPage>
	);
};

export default ListMain;
