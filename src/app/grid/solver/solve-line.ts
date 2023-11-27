import { environment } from 'src/app/environments/environment';
import { Line } from '../basic/line';
import { Cell } from '../basic/cell';
import { logCombinations, logSet } from '../debug-helpers';
import { getPossibleLineCombinations } from './find-combinations';
const { debug } = environment;

export function solveLine(line: Line): void {
    const combinations = getPossibleLineCombinations(line);
    const dirtyCells: Cell[] = [];

    // There is only one possible combination. Just apply it
    if (combinations.length === 1) {
        if (debug) console.log(`[line ${line.id}]: Only 1 possible combination found`);
        combinations[0].forEach(([cell, cellType]) => {
            cell.type = cellType;
            dirtyCells.push(cell);
            if (debug) logSet(cell);
        });
        return;
    }

    // At this step if in every possible combination we always have 1 or more tents
    // in some cell - then we place a tent there
    // TODO

    // Also we should calculate grass position for each tent placement combination
    // And if we alway have 1 or more grass in the same cell - then we place a grass there
    // TODO

    // If we updated one of the cells in current function - mark this cell as dirty
    // so every entity which is dependent on this cell can be recalculated in future
    // TODO

    // After cell was marked as Tent - mark all 8 cells nearby as Grass(if there were Empty)
    // TODO

    if (debug) logCombinations(line.id, combinations);
}

