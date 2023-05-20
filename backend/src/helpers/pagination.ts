export const calculateIndices = (page: number, limit: number) => {
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;
  return { startIndex, endIndex }
}

export const generatePaginationPipeline = (page: number, limit: number, startIndex: number, endIndex: number) => {
  return [
    {$facet: {
      paginatedResults: [{ $skip: startIndex }, { $limit: limit }],
      totalCount: [{$count: 'count'}]
    }},
    {$addFields: { 
      total: {$arrayElemAt: ["$totalCount.count", 0]}
    }},
    {$addFields: { 
      prevPage: {$cond: [{ $gt: [startIndex, 0]}, page-1, null]},
      nextPage: {$cond: [{ $lt: [{ $toInt: endIndex}, {$toInt: "$total"}]}, page+1, null]},
      types: [{$type: "$total"}, {$type: endIndex}]
    }},
    {$project: {
      paginatedResults: 1,
      prevPage: 1,
      nextPage: 1
    }}
  ]
}