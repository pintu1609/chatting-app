exports.search = (filter, pagination) => {
  const baseQuery = [
    {
      $match: {
        ...filter,
      },
    },
  ];

  const dataQuery = [
    ...baseQuery,
    {
      $lookup: {
        from: "users", // The target collection
        localField: "ids", // The field from the current collection
        foreignField: "_id", // The field from the target collection
        pipeline: [
          {
            $project: {
              name: 1,
              userName: 1,
              email: 1,
              image: 1,
            },
          },
        ],
        as: "users", // The alias for the result
      },
    },
    {
      $sort: {
        createdAt: -1,
      },
    },
    {
      $skip: pagination?.skip,
    },
    {
      $limit: pagination?.limit,
    },
  ];

  const countQuery = [
    ...baseQuery,
    {
      $count: "count",
    },
  ];

  return [
    {
      $facet: {
        data: dataQuery,
        count: countQuery,
      },
    },
  ];
};
