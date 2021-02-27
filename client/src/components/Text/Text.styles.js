import styled from "styled-components";

export default styled.div`
	margin: 0 1em;
	margin: 0.5rem auto;
	padding: 0;
	overflow-wrap: anywhere;
	margin: auto;
	background-size: cover;

	.letter {
		user-select: none;
	}

	.heading_1 {
		font-size: 2rem;
		text-align: center;
	}
	heading_2 {
		font-size: 1.75rem;
		text-align: center;
	}

	.text__uppercase {
		text-transform: uppercase;
		line-height: 1;
	}

	.text__shadow {
		color: var(--color, white);
		text-shadow: 2px 2px 4px var(--shadow-color, black);
	}

	.text__shadow___dark {
		text-shadow: 1px 1px 2px var(--shadow-color, #000);
	}

	.text__shadow___cloudy {
		text-shadow: 2px 2px 12px var(--shadow-color, black);
	}

	.bottom {
		bottom: 0;
	}

	.text {
		display: inline;
		line-height: 2;
		font-size: 1.2rem;
		font-family: Nunito;
		text-align: left;
		padding: calc(0.75 * var(--spacing));
		padding-right: calc(2 * var(--spacing));
		transform: all 0.2s;

		&:hover {
			transform: scale(1.2) !important;
		}

		&.glass {
			&:hover {
				color: black;
				border-radius: 8px;
				padding: 20px;
				background: linear-gradient(
					75deg,
					var(--secondary-lighter-2) 0%,
					var(--primary-lighter-2) 100%
				);
				border: none;
				color: white;
				-webkit-backdrop-filter: blur(20px);
				backdrop-filter: blur(20px);
				transform: scale(1.2);
			}
		}

		&.cloudy {
			color: var(--white);
			transition: all 0.2s;
			//background-color: rgba(0, 0, 0, 0.8);

			&:hover {
				// color: black;
				linear-gradient( to right, rgba(0,0,0,0) 0%, var(--transparent-secondary) 2.5%, var(--secondary) 97.5%, rgba(0,0,0,0) 100% );
				transform: scale(1.2);
			}
		}

		&.shadow--dark {
			//fancy bg gradient
			// background: linear-gradient(
			// 	to right,
			// 	rgba(0, 0, 0, 0.7) 0%,
			// 	rgba(0, 0, 0, 0.3) 70%,
			// 	rgba(0, 0, 0, 0) 100%
			// );

			background: linear-gradient(
				to right,
				rgba(0, 0, 0, 0) 0%,
				rgba(0, 0, 0, 0.55) 2.5%,
				rgba(0, 0, 0, 0.4) 97.5%,
				rgba(0, 0, 0, 0) 100%
			);
		}
		&.small {
			color: var(--black);
			transition: all 0.2s;
			font-size: 0.75rem;

			padding: 0;
			padding-right: var(--spacing);

			&:hover {
				font-weight: bold;
			}
		}
	}
`;
