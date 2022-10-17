import { EMPTY_VALUE } from "../consts";
import { Cell, FinalCell } from "../types";

export class GridUpdate {
  indices: Cell;
  value: number;

  constructor(row: number, column: number, value = EMPTY_VALUE) {
    this.indices = { row, column };
    this.value = value;
  }

  static updateFactory(final: FinalCell, finalVal: number, ...remove: GridUpdate[]) {
    let updates = [];
    updates.push(new GridUpdate(final.finalRow, final.finalColumn, finalVal));
    remove.forEach(({ indices }) => updates.push(new GridUpdate(indices.row, indices.column)));
    return updates;
  }
}

export type PotentialMoves = {
  finalCell: Cell;
  updates: GridUpdate[];
}[];