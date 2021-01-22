import styled from "styled-components";

export default styled.div`
	margin: 0 1em;
	padding: 0.25em 1em;
	background-position-x: center;
	background-position-y: center;

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

	.text__shadow___black {
		text-shadow: 1px 1px 2px var(--shadow-color, #000);
	}

	.text__shadow___cloudy {
		text-shadow: 2px 2px 12px var(--shadow-color, black);
	}

	.bottom {
		bottom: 0;
	}

	p {
		display: inline;
		line-height: 2;
		font-size: 1rem;
		font-family: Nunito;
		background-color: rgba(0, 0, 0, 0.8);
		margin-left: var(--spacing);
		color: var(--white);
		text-align: left;
		padding: calc(0.75 * var(--spacing));
	}
`;
