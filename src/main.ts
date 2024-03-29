import {
  BoardState,
  allLegalEatingMovesForCell,
  didColorLose,
  generateGridUpdatesForMoveIfLegal,
} from "./classes/BoardState";
import { GridUpdate } from "./classes/GridUpdate";
import { EMPTY_VALUE, pieces } from "./consts";
import { dom, values } from "./dom/dom";
import { stack } from "./stack";

import { doAiMove } from "./ai/engine";
import { toast } from "./dom/toast";
import { store } from "./store/store";
import { type Cell, type SerializedState } from "./types";
import { computeGridFromString, defaultSetup } from "./utils";

function handleMove(
  finalRow: number,
  finalColumn: number,
  startRow: number,
  startColumn: number,
): void {
  const finalCell = state.grid[finalRow][finalColumn];
  if (finalCell !== EMPTY_VALUE || (finalRow === -1 && finalColumn === -1)) {
    updateUI(state);
    return;
  }

  const move = { finalRow, finalColumn, startRow, startColumn };
  const updates = generateGridUpdatesForMoveIfLegal(state, move);
  if (updates.length > 0) {
    // was legal move...
    const updatedState = state.updatedGrid(updates).updateLastMove(move);
    const isTheMoveAnEatMove =
      (updates.length === 3 &&
        pieces[updates[updates.length - 1].value].split("-")[1] !== "king") ||
      updates.length === 4;
    const canTheMovingPieceStillEat =
      allLegalEatingMovesForCell(updatedState.grid, finalRow, finalColumn)
        .length !== 0;
    state =
      isTheMoveAnEatMove && canTheMovingPieceStillEat // was eat, and there are more eating options for the same cell
        ? updatedState.updateFlaggedCell({ row: finalRow, column: finalColumn })
        : updatedState.updateFlaggedCell().updateCurrentTurn();
    if (didColorLose(state.grid, state.turn)) {
      toast(`${state.turn} lost! :(`, 5000);
      resetGame();
    }
  }
  updateUI(state);
  const serialized = state.serialize();
  store.serialized = serialized;
  stack.add(serialized);
  if (!values.ai) return;
  doAiMove(state, handleMove, values.depth);
}

function startSession({ grid, turn }: SerializedState) {
  const matrix = computeGridFromString(grid);
  return updateUI(new BoardState({ grid: matrix, turn }));
}

let state = startSession(store.serialized);
function resetGame() {
  stack.resetStack();
  store.reset();
  state = startSession(defaultSetup);
}

function updateUI(state: BoardState, legalTargets: Cell[] = []) {
  dom.updateDOM({ state, legalTargets });
  return state;
}

// MAIN:
dom.registerDrag({
  handleMove,
  updateUI: (startRow: number, startColumn: number) => {
    updateUI(
      state.updatedGrid([new GridUpdate(startRow, startColumn, EMPTY_VALUE)]),
      state.getLegalTargets(startRow, startColumn),
    );
  },
});
dom.registerShare(() => {
  navigator.clipboard
    .writeText(store.share)
    .then(() => {
      toast("URL with game-state copied to clipboard! 🎆🎆🎆");
    })
    .catch(console.error);
});
dom.registerReset(resetGame);
dom.registerHover((row: number, column: number) =>
  updateUI(state, state.getLegalTargets(row, column)),
);
dom.registerUndo(
  () => {
    state = startSession(stack.dec());
    store.serialized = state.serialize();
  },
  () => {
    state = startSession(stack.inc());
    store.serialized = state.serialize();
  },
);
dom.registerAi((ai) => {
  if (ai) doAiMove(state, handleMove, values.depth);
});
