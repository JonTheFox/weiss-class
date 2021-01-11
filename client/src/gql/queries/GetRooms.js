import { gql } from "@apollo/client";

export const GetRooms = gql`
	query GetRooms {
		rooms {
			name
			roomKey
			students {
				id
				first_name
				last_name
			}
			teachers {
				id
				first_name
				last_name
				img {
					url
				}
			}
			platforms {
				id
			}
			img {
				url
			}
		}
	}
`;
