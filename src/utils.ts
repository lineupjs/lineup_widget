// Copyright (c) Samuel Gratzl.
// Distributed under the terms of the MIT License.

import { buildRanking, LocalDataProvider, Ranking } from 'lineupjs';

export interface ILineUpRanking {
  group_by: string[];
  sort_by: string[];
  columns: string[];
}

export function pushRanking(
  data: LocalDataProvider,
  ranking: ILineUpRanking
): Ranking {
  const r = buildRanking();
  (ranking.columns || ['_*', '*']).forEach((col) => r.column(col));
  (typeof ranking.sort_by === 'string'
    ? [ranking.sort_by]
    : ranking.sort_by || []
  ).forEach((s) => r.sortBy(s));
  (typeof ranking.group_by === 'string'
    ? [ranking.group_by]
    : ranking.group_by || []
  ).forEach((s) => r.groupBy(s));
  return r.build(data);
}
