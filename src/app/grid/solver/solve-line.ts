import { environment } from 'src/app/environments/environment';
import { Line } from '../basic/line';
import { Cell, CellType } from '../basic/cell';
import { getCellIcon, logCombinations, logSet } from '../debug-helpers';
import { getPossibleLineCombinations } from './find-combinations';
import { Combination } from './interface';
const { debug } = environment;

export function solveLine(line: Line, dirtyCells: Cell[] = []): void {
    const combinations = getPossibleLineCombinations(line);

    if (debug) logCombinations(line.id, combinations);

    // There is only one possible combination. Just apply it
    if (combinations.length === 1) {
        if (debug) console.log(`[line ${line.id}]: Only 1 possible combination found`);
        const newDirtyCells: Cell[] = [];
        combinations[0].forEach(([cell, cellType]) => {
            cell.type = cellType;
            newDirtyCells.push(cell);
            if (debug) logSet(cell);
        });
        dirtyCells.push(...newDirtyCells);
        markCellsAroundTentsAsGrass(newDirtyCells, dirtyCells);
        return;
    }

    // If in every possible combination we always have the same cellType(tent)
    // for the single cell - then we place a tent there
    const newDirtyCells = sameCellTypeForAllCombinations(combinations);
    dirtyCells.push(...newDirtyCells);

    // After cell was marked as Tent - mark all 8 cells nearby as Grass(if there were Empty)
    markCellsAroundTentsAsGrass(newDirtyCells, dirtyCells);

    // Also we should calculate grass position for each tent placement combination
    // And if we alway have 1 or more grass in the same cell - then we place a grass there
    sameGrassCellForAllCombinations(combinations, dirtyCells);
}

function sameCellTypeForAllCombinations(combinations: Combination[]): Cell[] {
    const cellsMap = new Map<Cell, CellType | null>();
    const dirtyCells: Cell[] = [];

    for (let comb of combinations) {
        for (let [newCell, cellType] of comb) {
            const savedCellType = cellsMap.get(newCell);

            if (savedCellType === undefined) {
                cellsMap.set(newCell, cellType);
            } else if (savedCellType !== null && savedCellType !== cellType) {
                // It means that at least 1 combination has different potential cellType there
                // so we don't know for sure what must be placed there. Mark this cell with 'null'
                cellsMap.set(newCell, null);
            }
        }
    }

    for (let [cell, newCellType] of cellsMap.entries()) {
        if (newCellType !== null) {
            // All combinations have the same cellType for this cell
            cell.type = newCellType;
            if (debug) console.log(`[${cell.id}] Set ${getCellIcon(cell.type)} (the same for all combinations)`);
            dirtyCells.push(cell);
        }
    }

    return dirtyCells;
}

function sameGrassCellForAllCombinations(combinations: Combination[], dirtyCells: Cell[]): void {
    let grassIntersections: null | Cell[] = null;

    for (let combination of combinations) {
        const potentialGrass = getPotentialGrassForCombination(combination);

        if (grassIntersections === null) {
            grassIntersections = potentialGrass
        } else {
            // Leave in grassIntersections only those items which are the same
            grassIntersections = grassIntersections.filter(c => potentialGrass.includes(c));
        }

        if (grassIntersections.length === 0) {
            // No intersection, exit function
            return;
        }
    }

    // Some intersections were found
    grassIntersections?.forEach(cell => {
        cell.type = CellType.Grass;
        dirtyCells.push(cell);
        if (debug) console.log(`[${cell.id}] Set ${getCellIcon(cell.type)} (it's always grass for each line combination)`)
    })


    function getPotentialGrassForCombination(combination: Combination): Cell[] {
        const potentialGrass = new Set<Cell>();

        combination.forEach(([cell, cellType]) => {
            if (cellType === CellType.Tent) {
                cell.nearest8Cells.forEach(c => {
                    if (c.type === CellType.Empty) {
                        potentialGrass.add(c);
                    }
                });

            }
        });

        return Array.from(potentialGrass);
    }
}

function markCellsAroundTentsAsGrass(cells: Cell[], dirtyCells: Cell[]): void {
    cells.forEach(cell => {
        if (cell.type === CellType.Tent) {
            cell.nearest8Cells.forEach(c => {
                if (c.type === CellType.Empty) {
                    c.type = CellType.Grass;
                    dirtyCells.push(c);
                    if (debug) console.log(`[${c.id}] Set ${getCellIcon(c.type)} (grass around tent)`)
                }
            })
        }
    })
}
