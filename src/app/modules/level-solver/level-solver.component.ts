import { ChangeDetectionStrategy, Component } from '@angular/core';
import { testLevel1, TestData } from 'src/app/test-data/test-data';
import { Grid, MAX_TENTS_AMOUNT, MIN_TENTS_AMOUNT } from '../grid/services/grid';
import { Cell, CellType } from '../grid/services/cell';
import { Line } from '../grid/services/line';
import { GridMode } from '../grid/grid.component';

@Component({
  selector: 'app-level-solver',
  templateUrl: './level-solver.component.html',
  styleUrls: ['./level-solver.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LevelSolverComponent {
    grid!: Grid;
    GridMode = GridMode;

    constructor() {
        this.initGrid(testLevel1)
    }

    onCellClick({ cell }: { cell: Cell }) {
        if (cell.type === CellType.Tree) {
            cell.type = CellType.Empty;
        } else {
            cell.type = CellType.Tree;
        }
    }

    onTentIncrease(line: Line) {
        if (line.tentsAmount + 1 <= MAX_TENTS_AMOUNT) line.tentsAmount++;
    }

    onTentDecrease(line: Line) {
        if (line.tentsAmount - 1 >= MIN_TENTS_AMOUNT) line.tentsAmount--;
    }

    export() {
        const result: TestData = {
            name: 'Unknown grid',
            width: this.grid.width,
            height: this.grid.height,
            cells: {},
            lines: {}
        };

        this.grid.cells.forEach((cell, id) => {
            result.cells[id] = cell.type;
        });

        this.grid.lines.forEach((line, id) => {
            result.lines[id] = line.tentsAmount;
        });

        console.log(JSON.stringify(result));
    }

    private initGrid(levelData: TestData) {
        this.grid = new Grid(levelData.width, levelData.height);
        this.grid.initLevelCells(levelData.cells);
        this.grid.initLevelLines(levelData.lines);
    }
}
