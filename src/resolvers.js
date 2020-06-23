const paginateResults = require("./utils/peginateResults");

module.exports = {
  Query: {
    // resolver signature find here:
    // https://www.apollographql.com/docs/tutorial/resolvers/#the-resolver-function-signature
    allMedia: async (_, { pageSize = 20, after }, { dataSources }) => {
      const allMedia = await dataSources.dbSource.getAllMedia();

      // we want these in reverse chronological order
      // allMedia.reverse();

      const mediaPackage = paginateResults({
        after,
        pageSize,
        results: allMedia,
      });

      const results = {
        mediaPaginated: mediaPackage,
        cursor: mediaPackage.length
          ? mediaPackage[mediaPackage.length - 1].cursor
          : null,
        // if the cursor of the end of the paginated results is the same as the
        // last item in _all_ results, then there are no more results after this
        hasMore: mediaPackage.length
          ? mediaPackage[mediaPackage.length - 1].cursor !==
            allMedia[allMedia.length - 1].cursor
          : false,
      };
      return results;
    },
  },
};

//TODO: implement this
// media: (_, { id }, { dataSources }) =>
//   dataSources.dbSource.getAllMediaById({ id }),
