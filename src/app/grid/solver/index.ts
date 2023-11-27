import { environment } from 'src/app/environments/environment';
import { Cell, CellType } from '../basic/cell';
import { Grid } from '../basic/grid';
import { logSet } from '../debug-helpers';
import { solveLine } from './solve-line';

export * from './interface';

const { debug } = environment;

export function solveGrid(grid: Grid): void {
    const dirtyCells: Cell[] = [];

    fillInitialGrass(grid);
    fillZeroLinesWithGrass(grid);
    fillByLinesRestrictions(grid);

    // TODO: And now go through the dirtyCells until it empty or grid solved
}

// STEP #1. Fill all grass fields, which doesn't have trees near
function fillInitialGrass(grid: Grid) {
    if (debug) console.log('\n\n___STEP #1___FILL GRASS FIELDS WITHOUT TREES NEARBY\n\n');
    grid.cells.forEach((cell) => {
        if (cell.type === CellType.Tree || cell.nearest4Cells.some((c) => c.type === CellType.Tree)) return;
        cell.type = CellType.Grass;
        if (debug) logSet(cell);
    });
}

// STEP #2. Fill all lines with grass, which have 0 tents
function fillZeroLinesWithGrass(grid: Grid) {
    if (debug) console.log('\n\n___STEP #2___FILL GRASS FOR LINES WITHOUT TENTS\n\n');
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
    if (debug) console.log('\n\n___STEP #3___FILL LINES BASED ON POSSIBLE OPTIONS\n\n');
    grid.lines.forEach((line) => {
        solveLine(line);
    });
}
