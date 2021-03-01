import styled from "styled-components";

export default styled.div`
	color: #000;
	width: 100%;
	position: absolute;
	bottom: 0;
	left: 0;
	z-index: 1000;
	padding: calc(2 * var(--spacing)) calc(2 * var(--spacing));
	&.footer {
		padding-bottom: calc(8 * var(--spacing));
	}
	&.size--regular {
		&,
		p {
			font-size: 1.35rem;
		}
	}
	&.size--small {
		font-size: 1.2rem;
	}
`;
