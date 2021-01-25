import styled from "styled-components";

export default styled.section`
	min-height: 100%;
	position: relative;
	padding: calc(2 * var(--spacing)) 0;

	.Page--centered-headings {
		height: auto;
		width: 100%;
	}

	.Page--centered-headings,
	.Page--bottom-third-caption,
	.Page--text1 {
		overflow: visible;
	}

	.marquee {
		width: auto;
		position: absolute;
		top: 0;
		left: 0;
		padding: calc(1 * var(--spacing));
		padding-left: calc(2 * var(--spacing));

		background-color: #fff;
		background-color: var(--transparent-black, #fff);
		border-radius: 0 calc(0.5 * var(--spacing)) calc(0.5 * var(--spacing)) 0;
		transition: all 0.2s;

		.letter {
			font-size: 1.75rem;
			margin: 0;
			font-family: Nunito;
			font-weight: bold;

			text-transform: uppercase;
			color: var(--white);
			line-height: 1;
		}
	}

	.sub-marquee {
		position: absolute;
		font-size: 2rem;
		padding: 0 var(--spacing);
		background-color: #fff;
		background-color: var(--transparent-black, #fff);
		color: var(--green);
		left: calc(2 * var(--spacing));
		border-radius: 0 calc(0.5 * var(--spacing)) calc(0.5 * var(--spacing)) 0;

		.letter {
			font-size: 1.75rem;
			margin: 0;
			font-family: Nunito;
			font-weight: bold;

			text-transform: uppercase;
			color: var(--white);
			line-height: 1;
		}

		h2 {
			margin: 0;
			margin-bottom: calc(4 * var(--spacing));
			margin-top: 1rem;
		}
	}

	&.Page--bottom-third-caption {
		position: static;
		.sub-marquee {
			top: 4rem;
			width: auto;
			margin: 0;
			line-height: 1;
			padding: calc(0.5 * var(--spacing)) var(--spacing);

			.heading {
				margin: 0;
				font-size: 1.75rem;
			}

			.letter {
				font-size: 1.75rem;
				margin: 0;
				font-family: Nunito;
				font-weight: bold;

				text-transform: uppercase;
				color: var(--white);
				line-height: 1;

				text-shadow: none;
			}
		}

		.marquee {
			margin: 0.5rem auto;
		}

		.Text-Container {
			padding: 3.25rem calc(2 * var(--spacing));
		}
	}
`;
