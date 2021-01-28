import { gql } from "@apollo/client";

const GET_MOVIES = gql`
    query getMovieList($genres: [String], $count: Int) {
        getMovieList(genres: $genres, count: $count) {
            movie_name
            movie_id
            year
            poster
        }
    }
`;

const SEND_SELECTED_MOVIES = gql`
    mutation addMovie($id: String, $movies: [String]) {
        addMovie(id: $id, movies: $movies) {
            name
        }
    }
`;

export { GET_MOVIES, SEND_SELECTED_MOVIES };
