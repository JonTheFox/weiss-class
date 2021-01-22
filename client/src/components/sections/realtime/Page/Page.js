import React from "react";
import StyledPage from "./Page.styles.js";

const label = "Page";
const Page = (props) => {
	return (
		<StyledPage className={label} {...props}>
			{props.children}
		</StyledPage>
	);
};

export default Page;
