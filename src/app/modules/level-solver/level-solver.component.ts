import { ChangeDetectionStrategy, Component, ViewChild } from '@angular/core';
import { TestData, testLevel2 } from 'src/app/test-data/test-data';
import { Grid, MAX_TENTS_AMOUNT, MIN_TENTS_AMOUNT } from '../../grid/basic/grid';
import { Cell, CellType } from '../../grid/basic/cell';
import { Line } from '../../grid/basic/line';
import { GridComponent, GridMode } from '../grid/grid.component';
import { solveGrid } from 'src/app/grid/solver/solver';

declare var window: Window & { grid: Grid };
@Component({
  selector: 'app-level-solver',
  templateUrl: './level-solver.component.html',
  styleUrls: ['./level-solver.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LevelSolverComponent {
    @ViewChild(GridComponent) gridComp!: GridComponent;
    grid!: Grid;
    GridMode = GridMode;

    mode = GridMode.Edit;

    constructor() {
        this.initGrid(testLevel2)
    }

    onCellClick({ cell }: { cell: Cell }) {
        if (this.mode === GridMode.View) return;

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

    solve() {
        solveGrid(this.grid);
        this.mode = GridMode.View;
        this.gridComp.cdr.markForCheck();
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

        window.grid = this.grid;
    }
}
