import styled from "styled-components";

export default styled.div`
	overflow-y: auto;
	height: 100%;
	margin: 0 1em;
	padding: calc(var(--spacing) * 2) calc(var(--spacing) * 2);
	background-position-x: center;
	background-position-y: center;

	margin: auto;
	background-size: cover;

	.heading {
		text-align: center;
	}

	.heading_1 {
		font-size: 2rem;
		
	}
	.heading_2 {
		font-size: 1.5rem;
	}

	.bold {
		font-weight: bold;
	

	p {
		font-size: 1.25rem;
		font-family: inherit;

	}
`;
