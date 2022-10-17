import { Color, SerializedState } from "../types";


export const defaultSetup = {
  turn: Color.black,
  grid: `
-r-r-r-r
r-r-r-r-
-r-r-r-r
--------
--------
b-b-b-b-
-b-b-b-b
b-b-b-b-
`.trim().split("\n").filter(Boolean).join("\n")
};



const STATE = "state";
const GRID = "grid";
const TURN = "turn";
const { pathname, href } = window.location;


const fromLocalStorage = () => {
  try {
    return JSON.parse(localStorage.getItem(STATE)!);
  } catch (ex) {
    return;
  }
};
const fromParams = () => {
  const urlParams = new URLSearchParams(window.location.search);
  const grid = urlParams.get(GRID);
  const turn = urlParams.get(TURN);
  return grid ? { grid, turn } : undefined;
};

const fetch = (): SerializedState => (window.location.search ? fromParams() : fromLocalStorage()) || defaultSetup;

const persist = ({ grid, turn } = defaultSetup) => {
  const params = new URLSearchParams();
  params.set(GRID, grid);
  params.set(TURN, turn);
  history.pushState(null, '', `${pathname}?${params.toString()}`);
  localStorage.setItem(STATE, JSON.stringify({ grid, turn }));
};
const reset = () => {
  history.pushState(null, '', pathname);
  localStorage.removeItem(STATE);
};

function compileSharingUrl() {
  const params = new URLSearchParams();
  const { grid, turn } = fetch();
  params.set(GRID, grid);
  params.set(TURN, turn);
  return `${href.split('?')[0]}?${params.toString()}`;
}



export const storageBackend = { fetch, persist, reset, compileSharingUrl };
