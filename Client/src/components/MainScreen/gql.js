import { gql } from "@apollo/client";
const GET_RECOMMENDATIONS = gql`
    query getRecommendation($id: String) {
        getRecommendation(id: $id) {
            recommendedMovies
        }
    }
`;

export { GET_RECOMMENDATIONS };
