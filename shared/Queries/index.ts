export const queryFollowings = (id: number) => {
    return {
        "select": {
          "?following": [
            [
                "*",
                {
                  "_compact": true
                }
              ]
          ]
        },
        "where": [["?var", "connections/from", id],
        ["?var","connections/status","success"],
        ["?var","connections/to","?following"]]
      }
}

export const queryFollowers = (id: number) => {
    return {
        "select": {
          "?followers": [
            [
                "*",
                {
                  "_compact": true
                }
              ]
          ]
        },
        "where": [["?var", "connections/to", id],
        ["?var","connections/status","success"],
        ["?var","connections/from","?followers"]]
      }
}

export const queryUserHoots = (id: number) => {
    return {
        "select": {
          "?tweet": [
            {
              "*": {
                "_compact": true
              }
            },
            {
              "auther": [
                "*",
                {
                  "_compact": true
                }
              ]
            },
            {
              "parentTweet": [
                "*",
                {
                  "_compact": true
                }
              ]
            },
            {
              "tweet/_parentTweet": [
                {
                  "_as": "retweets"
                }
              ]
            }
          ]
        },
        "where": [["?tweet", "tweet/auther", id]]
      }
} 