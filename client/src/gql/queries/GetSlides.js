import { gql } from "@apollo/client";
export const GetSlides = gql`
	query GetSlides {
		slides {
			id
			header
			subheader
			p1
			p2
			img {
				url
			}
			gif {
				url
			}
			video {
				url
			}
		}
	}
`;
