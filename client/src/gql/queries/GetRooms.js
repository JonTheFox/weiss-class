import { gql } from "@apollo/client";

export const GetRooms = gql`
	query GetRooms {
		rooms {
			name
			students {
				first_name
			}
			teachers {
				first_name
			}
			platforms {
				first_name
			}
		}
	}
`;
