import React, { useState, useContext, useEffect } from "react";
import clsx from "clsx";
import { Link } from "react-router-dom";
import Button from "@material-ui/core/Button";
import { Parallax } from "react-scroll-parallax";

const CLOUD_VIDEOS = [
	// {
	// 	title: "from Pexels",
	// 	url:
	// 		"https://player.vimeo.com/external/331114247.sd.mp4?s=774a9cd251c1df88f5f031864a7b66dcdd393837&profile_id=164&oauth2_token_id=57447761",
	// 	stopSecond: 10,
	// },
	{
		title: "Flying Above the Clouds",
		url: "https://www.youtube.com/watch?v=6AJl7DsL-1Y",
		startSecond: 15,
		stopSecond: 60 * 5 + 50,
	},

	{
		title: "Flying into clouds, above clouds and around clouds",
		url: "https://www.youtube.com/watch?v=VmMYfAR21KY",
	},
];

const bgImage =
	"https://images.unsplash.com/photo-1508060698845-34709bc12e1c?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max&ixid=eyJhcHBfaWQiOjMxMjYzfQ";

// const musicPath = "/music/bensound-goinghigher.mp3";

const TestPage = (props) => {
	//return "yo";
	return (
		<Parallax className="custom-class" y={[-20, 20]} tagOuter="figure">
			<img src={bgImage} />
		</Parallax>
	);
};

export default TestPage;
