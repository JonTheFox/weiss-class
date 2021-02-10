import React from "react";
import clsx from "clsx";

const FeedbackContent = (props) => {
	const { Icon, iconName, headingText, bodyText } = props;

	return (
		<div
			className={clsx(
				"feedback--content",
				`feedback--content---${iconName}`,
				iconName === "like" && "gradient-mix"
			)}
		>
			<Icon className={`feedback--icon`} />
			<div className="headingText stroke">{headingText}</div>
			<div className="bodyText shadow">{bodyText}</div>
		</div>
	);
};

export default FeedbackContent;
