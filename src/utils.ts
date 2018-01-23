
import {IColumnDesc, buildRanking} from 'lineupjs';

interface ILineUpRanking {
  groupBy: string[];
  sortBy: string[];
  columns: (string | IColumnDesc)[];
}

export function pushRanking(data: LocalDataProvider, ranking: ILineUpRanking) {
  const r = buildRanking();
  ranking.columns.forEach((col) => r.column(col));
  ranking.sortBy.forEach((s) => r.sortBy(s));
  ranking.groupBy.forEach((s) => r.groupBy(s));
  return r.build(data);
}
