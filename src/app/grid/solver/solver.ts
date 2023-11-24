import { CellType } from '../basic/cell';
import { Grid } from '../basic/grid';
import { Line } from '../basic/line';
import { cellTypeName, logSet } from '../debug-helpers';

const debug = true;

export function solveGrid(grid: Grid): void {
    fillInitialGrass(grid);
    fillZeroLinesWithGrass(grid);
    fillByLinesRestrictions(grid);
}

// STEP #1. Fill all grass fields, which doesn't have trees near
function fillInitialGrass(grid: Grid) {
    if (debug) console.log("___STEP #1___FILL GRASS FIELDS WITHOUT TREES NEARBY");
    grid.cells.forEach((cell) => {
        if (cell.type === CellType.Tree || cell.nearest4Cells.some((c) => c.type === CellType.Tree)) return;
        cell.type = CellType.Grass;
        if (debug) logSet(cell);
    });
}

// STEP #2. Fill all lines with grass, which have 0 tents
function fillZeroLinesWithGrass(grid: Grid) {
    if (debug) console.log("___STEP #2___FILL GRASS FOR LINES WITHOUT TENTS");
    grid.lines.forEach((line) => {
        if (line.tentsAmount > 0) return;

        line.cells.forEach((cell) => {
            if (cell.type === CellType.Empty) {
                cell.type = CellType.Grass;
                if (debug) logSet(cell);
            }
        });
    });
}

// STEP #3. Fill lines based on possible options
function fillByLinesRestrictions(grid: Grid) {
    if (debug) console.log("___STEP #3___FILL LINES BASED ON POSSIBLE OPTIONS");
    grid.lines.forEach((line) => {
        getPossibleLineCombinations(line);
    });
}

function getPossibleLineCombinations(line: Line) {
    const freeCells = Array.from(line.cells.values()).filter((c) => c.type === CellType.Empty);
    const freeCellsAmount = freeCells.length; //

    const combinations = getPossibleCombinations(freeCellsAmount, line.tentsLeft);
    if (combinations.length === 1) {
        // The only one possible option. Just fill in it
        if (debug) console.log(`[line ${line.id}]: Only 1 possible combination found`);
        freeCells.forEach((cell, index) => {
            cell.type = combinations[0][index];
            if (debug) logSet(cell);
        });
        return;
    }
    if (debug) console.log(`[line ${line.id}]: ${combinations.length} combinations found`);

    // TODO: Add more complex conditions
}

// Returns all possible combinations of placing tents and grass inside of the line
// If the output array is empty - the line is complete, no need to fill anything there
function getPossibleCombinations(emptyCellsAmount: number, tentsAmount: number) {
    const combinations: CellType[][] = [];

    const generateCombinations = (currentCombo: CellType[], onesLeft: number, zerosLeft: number) => {
        if (onesLeft === 0 && zerosLeft === 0) {
            if (currentCombo.length) combinations.push(currentCombo);
            return;
        }

        if (onesLeft > 0) {
            generateCombinations([...currentCombo, CellType.Tent], onesLeft - 1, zerosLeft);
        }

        if (zerosLeft > 0) {
            generateCombinations([...currentCombo, CellType.Grass], onesLeft, zerosLeft - 1);
        }
    };

    generateCombinations([], tentsAmount, emptyCellsAmount - tentsAmount);
    return combinations;
}
