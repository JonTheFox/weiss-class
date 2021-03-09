import styled from "styled-components";

export default styled.div`
	min-height: 100%;
	position: relative;
	padding: 0;

	.Page {
		padding: calc(2 * var(--spacing)) 0;
		position: static;
	}

	.Page--centered-headings {
		height: auto;
		width: 100%;
	}

	.Page--centered-headings,
	.Page--bottom-third-caption,
	.Page--text1 {
		overflow: visible;
	}

	.btn-primary {
		transition: all 0.5s ease-in-out;
		transform: scale(1);
		color: var(--white);
		padding: calc(1 * var(--spacing)) calc(8 * var(--spacing));
		border-radius: 1.5rem;
		font-size: 1.25rem;
	}

	.marquee {
		text-align: left;
		width: auto;
		top: 0;
		left: 0;
		padding: var(--spacing);
		padding-left: 0;

		margin-top: 0;
		margin-bottom: calc(2 * var(--spacing));
		margin-left: 0;

		.letter {
			font-size: 1.25rem;
			margin: 0;
			font-family: Nunito;
			font-weight: bold;

			text-transform: uppercase;
			color: var(--white);
			line-height: 1;
		}

		.heading {
			display: inline;
			padding: 0 calc(var(--spacing) * 2);
			margin-top: 0;
		}
	}

	.sub-marquee {
		font-size: 1rem;
		text-align: left;
		margin: 0;
		margin-top: calc(2.5 * var(--spacing));
		padding: 0 var(--spacing);
		padding-left: calc(2 * var(--spacing));
		width: auto;
		margin: 0;
		line-height: 1;

		.letter {
			font-size: 1.25rem;
			margin: 0;
			font-family: Nunito;
			font-weight: bold;

			text-transform: uppercase;
			color: var(--white);
			line-height: 1;
		}
		.heading {
			margin: 0;
			display: inline;
			padding: 0 calc(var(--spacing) * 2);
		}
		// margin-bottom: calc(4 * var(--spacing));
		// margin-top: 1rem;
		line-height: 0.5;
		text-align: left;
	}
`;
