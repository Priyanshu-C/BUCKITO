import { gql } from "@apollo/client";
const GET_RECOMMENDATIONS = gql`
    query getRecommendation($id: String) {
        getRecommendation(id: $id) {
            recommendedMovies
        }
    }
`;
const GET_MOVIES = gql`
    query getMovieList($genres: [String], $count: Int) {
        getMovieList(genres: $genres, count: $count) {
            movie_name
            movie_id
        }
    }
`;

export { GET_RECOMMENDATIONS, GET_MOVIES };
