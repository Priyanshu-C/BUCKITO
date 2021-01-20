import { gql } from "@apollo/client";

const GET_MOVIES = gql`
    query getMovieList($genres: [String]) {
        getMovieList(genres: $genres) {
            movie_name
            movie_id
            year
            poster
        }
    }
`;

export { GET_MOVIES };
