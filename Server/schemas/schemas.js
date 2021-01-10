const graphql = require("graphql");
const User = require("../models/User");
const action = require("../genres/action.json");

const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLSchema,
    GraphQLID,
    GraphQLInt,
    GraphQLList,
    GraphQLNonNull,
    GraphQLDateTime,
} = graphql;

const UserType = new GraphQLObjectType({
    name: "User",
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        dateOfBirth: { type: GraphQLString },
        alreadyWatchedMovies: { type: new GraphQLList(GraphQLString) },
        recommendedMovies: { type: new GraphQLList(GraphQLString) },
        bucketList: { type: new GraphQLList(GraphQLString) },
        genre: { type: new GraphQLList(GraphQLString) },
    }),
});

const MovieType = new GraphQLObjectType({
    name: "Movie",
    fields: () => ({
        movie_name: { type: GraphQLString },
        imdb_url: { type: GraphQLString },
        number: { type: GraphQLInt },
        year: { type: GraphQLString },
        Parental_guidance: { type: GraphQLString },
        year: { type: GraphQLString },
        length: { type: GraphQLString },
        genre: { type: GraphQLString },
        imdb_ratings: { type: GraphQLInt },
        metascore: { type: GraphQLInt },
        director: { type: GraphQLString },
        actor1: { type: GraphQLString },
        actor2: { type: GraphQLString },
        actor3: { type: GraphQLString },
        actor4: { type: GraphQLString },
    }),
});

const RootQuery = new GraphQLObjectType({
    name: "RootQueryType",
    fields: {
        user: {
            type: UserType,
            args: { name: { type: GraphQLString } },
            resolve(parent, args) {
                return User.find({ name: args.name });
            },
        },
        users: {
            type: new GraphQLList(UserType),
            args: {},
            resolve(parent, args) {
                return User.find({});
            },
        },
        movies: {
            type: new GraphQLList(MovieType),
            args: {},
            resolve(parent, args) {
                return action;
            },
        },
    },
});

const Mutation = new GraphQLObjectType({
    name: "Mutation",
    fields: {
        addUser: {
            type: UserType,
            args: {
                name: { type: GraphQLString },
                dateOfBirth: { type: GraphQLString },
            },
            resolve(parent, args) {
                let user = new User({
                    name: args.name,
                    dateOfBirth: args.dateOfBirth,
                });
                return user.save();
            },
        },
        addMovie: {
            type: UserType,
            args: {
                name: { type: GraphQLString },
                movie: { type: GraphQLString },
            },
            resolve(parent, args) {
                return User.updateOne(
                    { name: args.name },
                    {
                        $addToSet: { alreadyWatchedMovies: args.movie },
                    }
                );
            },
        },
        addGenre: {
            type: UserType,
            args: {
                name: { type: GraphQLString },
                genre: { type: new GraphQLList(GraphQLString) },
            },
            resolve(parent, args) {
                return User.updateOne(
                    { name: args.name },
                    {
                        $addToSet: { genre: args.genre },
                    }
                );
            },
        },
        addToBucketList: {
            type: UserType,
            args: {
                name: { type: GraphQLString },
                movie: { type: GraphQLString },
            },
            resolve(parent, args) {
                return User.updateOne(
                    { name: args.name },
                    {
                        $addToSet: { bucketList: args.movie },
                    }
                );
            },
        },
        removeToBucketList: {
            type: UserType,
            args: {
                name: { type: GraphQLString },
                movie: { type: GraphQLString },
            },
            resolve(parent, args) {
                return User.updateOne(
                    { name: args.name },
                    {
                        $pull: { bucketList: args.movie },
                    }
                );
            },
        },
        removeUser: {
            type: UserType,
            args: {
                name: { type: GraphQLString },
            },
            resolve(parent, args) {
                return User.deleteOne({ name: args.name });
            },
        },
    },
});

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation,
});
