const mapVideoObjectToQuizItem = (videoObj) => {
	debugger;
	const { user, images = [], links, image, label, title, tags } = videoObj;
	const _images = Object.entries(images)?.reduce((accumulator, image, i) => {
		return { urls: image.urls };
	}, {});
	return {
		videoSet: links,
		photographer: user,
		images: _images,
		image,
		label,
		title,
		tags,
	};
};

module.exports = mapVideoObjectToQuizItem;

//video object shape
/*

user: {
		name: "cottonbro",
		url: "https://www.pexels.com/@cottonbro",
		id: 1437723,
	},
	images: {
		fourK:
			"https://images.pexels.com/videos/3298720/pictures/preview-14.jpg",
	},
	links: {
		phone:
			"https://player.vimeo.com/external/376214014.sd.mp4?s=08f6031eb4bc5c58dbe1635967468a99a92fe13a&profile_id=164&oauth2_token_id=57447761",
		tablet:
			"https://player.vimeo.com/external/376214014.hd.mp4?s=f7f821b6aac45dab79ee4c299212bd527862c1d4&profile_id=174&oauth2_token_id=57447761",
		hdReady:
			"https://player.vimeo.com/external/376214014.hd.mp4?s=f7f821b6aac45dab79ee4c299212bd527862c1d4&profile_id=170&oauth2_token_id=57447761",
		fullHd:
			"https://player.vimeo.com/external/376214014.hd.mp4?s=f7f821b6aac45dab79ee4c299212bd527862c1d4&profile_id=172&oauth2_token_id=57447761",
	},
*/

//item shape
/*

{
            label: "I am driving.",
            title: "I am driving.",
            photographer: {
                name: "Yaroslav Shuraev",
                id: 649765,
            },
            //tags: undefined,
            //label: "Sushi",

            images: [
                {
                    urls: {
                        regular:
                            "https://images.pexels.com/videos/4434242/pexels-photo-4434242.jpeg?fit=crop&w=1200&h=630&auto=compress&cs=tinysrgb",
                    },
                },
            ],
            videoSet: {
                phone:
                    "https://player.vimeo.com/external/420239207.sd.mp4?s=2b5a6633c37af1a6fb0beb02c06bdc376fdfcce2&profile_id=164&oauth2_token_id=57447761",
                tablet:
                    "https://player.vimeo.com/external/420239207.hd.mp4?s=9fa34fce5989c66f5edc65fc533f2d91085d7599&profile_id=174&oauth2_token_id=57447761",
                hdReady:
                    "https://player.vimeo.com/external/420239207.hd.mp4?s=9fa34fce5989c66f5edc65fc533f2d91085d7599&profile_id=170&oauth2_token_id=57447761",
                fullHd:
                    "https://player.vimeo.com/external/420239207.hd.mp4?s=9fa34fce5989c66f5edc65fc533f2d91085d7599&profile_id=172&oauth2_token_id=57447761",
            },
            image:
                "https://images.pexels.com/videos/4434242/pictures/preview-0.jpg",
        },


*/
