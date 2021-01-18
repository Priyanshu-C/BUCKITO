import { gql } from "@apollo/client";
const SUBMIT_GENRES = gql`
    mutation AddGenre($id: String, $genre: [String]) {
        addGenre(id: $id, genre: $genre) {
            name
        }
    }
`;

export { SUBMIT_GENRES };
