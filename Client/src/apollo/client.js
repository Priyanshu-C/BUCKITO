import { ApolloClient, InMemoryCache } from "@apollo/client";
const choice = {
    1: "https://buckito-backend.herokuapp.com",
    2: "http://localhost:4000",
};
export default new ApolloClient({
    uri: `${choice[1]}/graphql`,
    cache: new InMemoryCache(),
});
