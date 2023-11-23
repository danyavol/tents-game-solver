import { CellType } from "../basic/cell";
import { Grid } from "../basic/grid";

export function solveGrid(grid: Grid): void {
    setInitialGrass(grid);
}

function setInitialGrass(grid: Grid) {
    grid.cells.forEach(cell => {
        if (cell.type === CellType.Tree || cell.nearest4Cells.some(c => c.type === CellType.Tree)) return;

        cell.type = CellType.Grass;
    });
}
