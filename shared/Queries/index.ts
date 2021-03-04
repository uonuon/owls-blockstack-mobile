export enum HootsQueriesTypes {
  USER_HOOTS = "userHoots",
  NEWS_FEED_HOOTS = "newsFeedHoots",
  USER_MEDIA_HOOTS = "userMediaHoots",
  USER_LIKES_HOOTS = "userLikesHoots",
  HOOT_BY_ID = "currentHoot",
}
const hootSelector = [
  {
    "*": {
      _compact: true,
    },
  },
  {
    auther: [
      "*",
      {
        _compact: true,
      },
    ],
  },
  {
    parentTweet: [
      "*",
      {
        _compact: true,
      },
      {
        auther: [
          "*",
          {
            _compact: true,
          },
        ],
      },
    ],
  },
  {
    "tweet/_parentTweet": [
      {
        _as: "retweets",
      },
    ],
  },
];
export const queryFollowings = (id: number) => {
  return {
    select: {
      "?following": [
        [
          "*",
          {
            _compact: true,
          },
        ],
      ],
    },
    where: [
      ["?var", "connections/from", id],
      ["?var", "connections/status", "success"],
      ["?var", "connections/to", "?following"],
    ],
  };
};

export const queryFollowers = (id: number) => {
  return {
    select: {
      "?followers": [
        [
          "*",
          {
            _compact: true,
          },
        ],
      ],
    },
    where: [
      ["?var", "connections/to", id],
      ["?var", "connections/status", "success"],
      ["?var", "connections/from", "?followers"],
    ],
  };
};

export const queryUserHoots = (id: number) => {
  return {
    select: {
      "?tweet": hootSelector,
    },
    where: [["?tweet", "tweet/auther", id]],
  };
};

export const newsFeed = (id: number) => ({
  select: {
    "?tweets": hootSelector,
  },
  where: [
    ["?var", "connections/to", "?to"],
    ["?var", "connections/from", id],
    ["?var", "connections/status", "success"],
    ["?tweets", "tweet/auther", "?to"],
  ],
});

export const getCurrentHootReplies = (id: number) => {
  return {
    select: {
      "?replies": hootSelector,
    },
    where: [[id, "tweet/replies", "?replies"]],
  };
};

export const hootsQueriesMap: {
  [x: HootsQueriesTypes]: (id: number) => void;
} = {
  [HootsQueriesTypes.NEWS_FEED_HOOTS]: newsFeed,
  [HootsQueriesTypes.USER_HOOTS]: queryUserHoots,
  [HootsQueriesTypes.USER_LIKES_HOOTS]: queryUserHoots,
  [HootsQueriesTypes.USER_MEDIA_HOOTS]: queryUserHoots,
  [HootsQueriesTypes.HOOT_BY_ID]: getCurrentHootReplies,
};
