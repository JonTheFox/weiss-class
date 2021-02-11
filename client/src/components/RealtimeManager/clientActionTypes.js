import React from "react";
import FileCopyIcon from "@material-ui/icons/FileCopyOutlined";
import SaveIcon from "@material-ui/icons/Save";
import HelpIcon from "@material-ui/icons/Help";
import PrintIcon from "@material-ui/icons/Print";
import ThumbUpIcon from "@material-ui/icons/ThumbUp";
import ShareIcon from "@material-ui/icons/Share";
import FavoriteIcon from "@material-ui/icons/Favorite";
import PanToolIcon from "@material-ui/icons/PanTool";
import ReportProblemIcon from "@material-ui/icons/ReportProblem";

const studentActions = {
	raiseHand: {
		icon: <PanToolIcon />,
		label: "Raise Hand",
		name: "raiseHand",
		bodyText: "🤚 I have something to say. ",
	},
	//{ icon: <SaveIcon />, label: "Save" },
	//{ icon: <PrintIcon />, label: "Print" },
	//{ icon: <ShareIcon />, label: "Share" },
	care: {
		icon: <FavoriteIcon />,
		label: "care",
		name: "care",
		bodyText: "🤩🤍 This is great!",
	},
	like: {
		icon: <ThumbUpIcon />,
		label: "Like",
		name: "like",
		bodyText: "😃👍 I like this!",
	},
	help: {
		icon: <HelpIcon />,
		label: "Help!",
		name: "help",
		bodyText: "🙏 please help me out. ",
	},
};

const teacherActions = {
	beQuiet: {
		icon: <ReportProblemIcon />,
		label: "Silence",
		name: "beQuiet",
		bodyText: "🤫 Please be quiet.",
	},
	niceWork: {
		icon: <ThumbUpIcon />,
		label: "Props",
		name: "niceWork",
		bodyText: "👏😃 Nice work!",
	},

	care: {
		icon: <FavoriteIcon />,
		label: "Care",
		name: "care",
		bodyText: "🤩🤍 This is great!",
	},
};

const platformActions = {
	//{ icon: <FileCopyIcon />, name: "Copy" },

	//{ icon: <SaveIcon />, label: "Save" },
	//{ icon: <PrintIcon />, label: "Print" },
	share: { icon: <ShareIcon />, label: "Share", name: "share" },
	// { icon: <FavoriteIcon />, label: "Like", name: "like" },
};

export { studentActions, teacherActions, platformActions };
