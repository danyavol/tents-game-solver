import { CellType } from '../basic/cell';
import { Grid } from '../basic/grid';
import { Line } from '../basic/line';

export function solveGrid(grid: Grid): void {
    fillInitialGrass(grid);
    fillZeroLinesWithGrass(grid);
    fillByLinesRestrictions(grid);
}

function fillInitialGrass(grid: Grid) {
    grid.cells.forEach((cell) => {
        if (
            cell.type === CellType.Tree ||
            cell.nearest4Cells.some((c) => c.type === CellType.Tree)
        )
            return;

        cell.type = CellType.Grass;
    });
}

function fillZeroLinesWithGrass(grid: Grid) {
    grid.lines.forEach((line) => {
        if (line.tentsAmount > 0) return;

        line.cells.forEach((cell) => {
            if (cell.type === CellType.Empty) {
                cell.type = CellType.Grass;
            }
        });
    });
}

function fillByLinesRestrictions(grid: Grid) {
    grid.lines.forEach((line) => {
        getPossibleLineCombinations(line);
    });
}

function getPossibleLineCombinations(line: Line) {
    const freeCells = Array.from(line.cells.values()).filter(
        (c) => c.type === CellType.Empty
    );
    const freeCellsAmount = freeCells.length;

    function getPossibleCombinations(fieldSize: number, cellsAmount: number) {
        const combinations: string[] = [];

        function generateCombinations(
            currentCombo: string,
            onesLeft: number,
            zerosLeft: number
        ) {
            if (onesLeft === 0 && zerosLeft === 0) {
                combinations.push(currentCombo);
                return;
            }

            if (onesLeft > 0) {
                generateCombinations(
                    currentCombo + '1',
                    onesLeft - 1,
                    zerosLeft
                );
            }

            if (zerosLeft > 0) {
                generateCombinations(
                    currentCombo + '0',
                    onesLeft,
                    zerosLeft - 1
                );
            }
        }

        generateCombinations('', cellsAmount, fieldSize - cellsAmount);
        return combinations;
    }

    const result = getPossibleCombinations(freeCellsAmount, line.tentsAmount);
    console.log(line.id, Array.from(line.cells.values()).map(c => c.id), line.type, result);
}
