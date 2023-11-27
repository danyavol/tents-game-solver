import { environment } from 'src/app/environments/environment';
import { Cell, CellType } from '../basic/cell';
import { Line } from '../basic/line';
import { logInvalidCombination } from '../debug-helpers';
import { Combination } from './interface';

const { debug } = environment;

export function getPossibleLineCombinations(line: Line): Combination[] {
    const freeCells = Array.from(line.cells.values()).filter((c) => c.type === CellType.Empty);

    const allCombinations = getAllCombinations(freeCells, line.tentsLeft);

    // Remove impossible combinations
    return filterCombinations(allCombinations, line);
}

// Returns all possible combinations of placing tents and grass for the provided emptyCells
// If the output array is empty - the line is complete, no need to fill anything there
function getAllCombinations(emptyCells: Cell[], tentsAmount: number): Combination[] {
    const combinations: Combination[] = [];

    const generateCombinations = (currentCombo: Combination, onesLeft: number, zerosLeft: number) => {
        if (onesLeft === 0 && zerosLeft === 0) {
            if (currentCombo.length) combinations.push(currentCombo);
            return;
        }

        const currentCellIndex = currentCombo.length;

        if (onesLeft > 0) {
            generateCombinations([...currentCombo, [emptyCells[currentCellIndex], CellType.Tent]], onesLeft - 1, zerosLeft);
        }

        if (zerosLeft > 0) {
            generateCombinations([...currentCombo, [emptyCells[currentCellIndex], CellType.Grass]], onesLeft, zerosLeft - 1);
        }
    };

    generateCombinations([], tentsAmount, emptyCells.length - tentsAmount);
    return combinations;
}

function filterCombinations(combinations: Combination[], line: Line): Combination[] {
    // don't do any filtering if 0 or 1 combinations available for the line
    if (combinations.length <= 1) return combinations;

    return combinations.filter((comb) => {
        // Stage #1 | Check if tent is not placed near another tent
        let invalid = comb.some(
            ([cell, cellType], i) =>
                cellType === CellType.Tent &&
                // check existing tents
                (cell.nearest8Cells.some((c) => c.type === CellType.Tent) ||
                    // check new tents in current combination
                    (comb[i + 1] && comb[i + 1][1] === CellType.Tent && cell.isNeighbor4Cell(comb[i + 1][0])))
        );
        if (invalid) {
            if (debug) logInvalidCombination(line.id, comb);
            return false;
        }

        // Stage #2 | Two tents have only one potential tree to be linked to
        const reservedTreeCells = new Set<Cell>(); // Tree-cells added here only when this is the ONLY tree for the tent
        invalid = comb.some(([cell, cellType], i) => {
            if (cellType !== CellType.Tent) return false;

            const treesNearby = cell.nearest4Cells.filter((c) => c.type === CellType.Tree);
            if (treesNearby.length === 1 && reservedTreeCells.has(treesNearby[0])) return true;
            if (treesNearby.length === 1) reservedTreeCells.add(treesNearby[0]);
            return false;
        });
        if (invalid) {
            if (debug) logInvalidCombination(line.id, comb);
            return false;
        }

        // Stage #3 | At least 1 tent has no unlinked trees nearby
        // TODO

        return true;
    });
}
