import { useQuery, gql } from "@apollo/client";

export const EXCHANGE_RATES = gql`
	query GetExchangeRates {
		rates(currency: "USD") {
			currency
			rate
		}
	}
`;

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
