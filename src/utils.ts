import { colors, EMPTY_VALUE, pieces } from "./consts";
import { Color } from "./types";

export const clsx = (bag: Record<string, unknown>, ...strings: string[]) => {
  const filtered = Object.entries(bag).filter(([, v]) => Boolean(v)).map(([cls]) => cls);
  return [...strings, ...filtered].join(" ");
}

export function forEachCell(cb: (row: number, column: number) => void) {
  for (let row = 0; row < 8; row++) {
    for (let column = 0; column < 8; column++) {
      cb(row, column);
    }
  }
}

export function colorForCell(gridVal: number) {
  return gridVal !== EMPTY_VALUE ? pieces[gridVal].split("-")[0] as Color : undefined;
}

export function changeGridStringToNumbers(gridstring: string) {
  return ["b", "B", "r", "R", "-"].reduce((grid, alias, i) => grid.replaceAll(alias, String(i)), gridstring)
}

export function oppositeColor(color?: Color) {
  return color === colors[0] ? colors[1] : colors[0];
}