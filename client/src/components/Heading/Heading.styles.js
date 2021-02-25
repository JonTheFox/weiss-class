import styled from "styled-components";

export const Heading1 = styled.h1`
	margin: 0;
	position-relative;
	margin: 0;
    font-size: 1.75rem;
    overflow: visible;

	.letter {
		font-size: 2.25rem; //used to be 2.5
		text-align: center;
		user-select: none;
	}
	overflow-wrap: anywhere;
`;

export const Heading2 = styled.h2`
	margin: 0;
	position-relative;
	margin-bottom: calc(4 * var(--spacing));
	margin-top: 1rem;
	 overflow: visible;
	.letter {
		font-size: 1.4rem; //used to be 1.5
		text-align: center;
		user-select: none;
	}
	overflow-wrap: anywhere;
`;
