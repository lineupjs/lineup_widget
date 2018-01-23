
import {IColumnDesc, buildRanking, LocalDataProvider, Ranking} from 'lineupjs';

export interface ILineUpRanking {
  group_by: string[];
  sort_by: string[];
  columns: string[];
}

export function pushRanking(data: LocalDataProvider, ranking: ILineUpRanking): Ranking {
  const r = buildRanking();
  ranking.columns.forEach((col) => r.column(col));
  ranking.sort_by.forEach((s) => r.sortBy(s));
  ranking.group_by.forEach((s) => r.groupBy(s));
  return r.build(data);
}
