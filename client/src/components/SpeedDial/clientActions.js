import React from "react";
import FileCopyIcon from "@material-ui/icons/FileCopyOutlined";
import SaveIcon from "@material-ui/icons/Save";
import HelpIcon from "@material-ui/icons/Help";
import PrintIcon from "@material-ui/icons/Print";
import ShareIcon from "@material-ui/icons/Share";
import FavoriteIcon from "@material-ui/icons/Favorite";
import PanToolIcon from "@material-ui/icons/PanTool";

const CLIENT_ACTIONS = [
	//{ icon: <FileCopyIcon />, name: "Copy" },
	{
		icon: <PanToolIcon />,
		name: "Raise Hand",
	},
	//{ icon: <SaveIcon />, name: "Save" },
	//{ icon: <PrintIcon />, name: "Print" },
	//{ icon: <ShareIcon />, name: "Share" },
	{ icon: <FavoriteIcon />, name: "Like" },
	{ icon: <HelpIcon />, name: "Help!" },
];

export default CLIENT_ACTIONS;
