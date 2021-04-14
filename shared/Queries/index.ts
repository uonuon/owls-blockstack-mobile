export enum HootsQueriesTypes {
  USER_HOOTS = "userHoots",
  NEWS_FEED_HOOTS = "newsFeedHoots",
  USER_MEDIA_HOOTS = "userMediaHoots",
  USER_LIKES_HOOTS = "userLikesHoots",
  HOOT_BY_ID = "currentHoot",
}
export const hootSelector = [
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
      {
        auther: [
          {
            _compact: true,
          },
        ],
      },
    ],
  },
  {
    "tweet/_replies": [
      "*",
          {
            "_as": "threadParent",
            "_compact": true
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
          {
            auther: [
              {
                _compact: true,
              },
            ],
          },
        ],
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

export const queryConnection = (from: number, to: number) => {
  return {
    selectOne: {
      "?var": [
        "status",
        {
          "from": [
            "*",
            {
              "_compact": true
            }
          ]
        }
      ]
    },
    where: [
      ["?var", "connections/from", from],
      ["?var", "connections/to", to]
    ]
  };
};

export const queryFollowers = (id: number) => {
  return {
    select: {
      "?var": [
        "status",
        {
          "from": [
            "*",
            {
              "_compact": true
            }
          ]
        }
      ]
    },
    where: [
      ["?var", "connections/to", id],
      ["?var", "connections/status", "success"]
    ],
  };
};

export const queryPendingFollowers = (id: number) => {
  return {
    select: {
      "?var": [
        "status",
        {
          "from": [
            "*",
            {
              "_compact": true
            }
          ]
        }
      ]
    },
    where: [
      ["?var", "connections/to", id],
      ["?var", "connections/status", "pending"]
    ],
  };
};

export const queryUserHoots = (id: number, offset: number) => {
  return {
    select: {
      "?tweet": hootSelector,
    },
    where: [["?tweet", "tweet/auther", id]],
    opts: {
      limit: 20,
      offset,
      _orderBy: "tweet/createdAt",
    }
  };
};

export const newsFeed = (id: number, offset: number) => ({
  select: {
    "?tweets": hootSelector,
  },
  where: [
    ["?var", "connections/to", "?to"],
    ["?var", "connections/from", id],
    ["?var", "connections/status", "success"],
    ["?tweets", "tweet/auther", "?to"],
  ],
  opts: {
    limit: 20,
    offset,
    _orderBy: ["tweet/createdAt", 'DESC'],
  }
});

export const getCurrentHootReplies = (id: number, offset: number) => {
  return {
    select: {
      "?replies": hootSelector, 
    },
    where: [[id, "tweet/replies", "?replies"]],
    opts: {
      _orderBy: "tweet/createdAt",
    }
  };
};

export const hootsQueriesMap: {
  [x: HootsQueriesTypes]: (id: number, offset: number) => void;
} = {
  [HootsQueriesTypes.NEWS_FEED_HOOTS]: newsFeed,
  [HootsQueriesTypes.USER_HOOTS]: queryUserHoots,
  [HootsQueriesTypes.USER_LIKES_HOOTS]: queryUserHoots,
  [HootsQueriesTypes.USER_MEDIA_HOOTS]: queryUserHoots,
  [HootsQueriesTypes.HOOT_BY_ID]: getCurrentHootReplies,
};
