
import {IColumnDesc, buildRanking, LocalDataProvider, Ranking} from 'lineupjs';

export interface ILineUpRanking {
  groupBy: string[];
  sortBy: string[];
  columns: string[];
}

export function pushRanking(data: LocalDataProvider, ranking: ILineUpRanking): Ranking {
  const r = buildRanking();
  ranking.columns.forEach((col) => r.column(col));
  ranking.sortBy.forEach((s) => r.sortBy(s));
  ranking.groupBy.forEach((s) => r.groupBy(s));
  return r.build(data);
}
