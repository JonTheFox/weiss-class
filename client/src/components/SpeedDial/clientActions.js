import React from "react";
import FileCopyIcon from "@material-ui/icons/FileCopyOutlined";
import SaveIcon from "@material-ui/icons/Save";
import HelpIcon from "@material-ui/icons/Help";
import PrintIcon from "@material-ui/icons/Print";
import ShareIcon from "@material-ui/icons/Share";
import FavoriteIcon from "@material-ui/icons/Favorite";
import PanToolIcon from "@material-ui/icons/PanTool";

const studentActions = [
	//{ icon: <FileCopyIcon />, name: "Copy" },
	{
		icon: <PanToolIcon />,
		label: "Raise Hand",
		name: "raiseHand",
	},
	//{ icon: <SaveIcon />, label: "Save" },
	//{ icon: <PrintIcon />, label: "Print" },
	//{ icon: <ShareIcon />, label: "Share" },
	{ icon: <FavoriteIcon />, label: "Like", name: "like" },
	{ icon: <HelpIcon />, label: "Help!", name: "help" },
];

const teacherActions = [
	//{ icon: <FileCopyIcon />, name: "Copy" },

	//{ icon: <SaveIcon />, label: "Save" },
	//{ icon: <PrintIcon />, label: "Print" },
	//{ icon: <ShareIcon />, label: "Share" },
	{ icon: <FavoriteIcon />, label: "Like", name: "like" },
];

const platformActions = [
	//{ icon: <FileCopyIcon />, name: "Copy" },

	//{ icon: <SaveIcon />, label: "Save" },
	//{ icon: <PrintIcon />, label: "Print" },
	{ icon: <ShareIcon />, label: "Share" },
	// { icon: <FavoriteIcon />, label: "Like", name: "like" },
];

export { studentActions, teacherActions, platformActions };
