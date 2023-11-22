import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { Cell, CellType } from 'src/app/grid-services/cell';
import { Grid, MAX_TENTS_AMOUNT, MIN_TENTS_AMOUNT } from 'src/app/grid-services/grid';
import { Line, LineType } from 'src/app/grid-services/line';
import { TestData } from './interfaces';

@Component({
    selector: 'app-grid',
    templateUrl: './grid.component.html',
    styleUrls: ['./grid.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class GridComponent implements OnInit {
    @Input() levelData!: TestData;

    grid!: Grid;
    columns!: Line[];
    rows!: Line[];
    CellType = CellType;

    constructor(private cdr: ChangeDetectorRef) {}

    ngOnInit(): void {
        this.initLevelData();
    }

    trackByCells(_index: number, cell: Cell) {
        return cell.id;
    }

    trackByLines(_index: number, line: Line) {
        return line.id;
    }

    onCellClick(cell: Cell, event: MouseEvent) {
        if (event.shiftKey) {
            if (cell.type === CellType.Tree) {
                cell.type = CellType.Empty;
            } else {
                cell.type = CellType.Tree;
            }
            return;
        }

        switch (cell.type) {
            case CellType.Empty:
                cell.type = CellType.Grass;
                break;
            case CellType.Grass:
                cell.type = CellType.Tent;
                break;
            case CellType.Tent:
                cell.type = CellType.Empty;
        }
    }

    increaseTents(line: Line) {
        if (line.tentsAmount + 1 <= MAX_TENTS_AMOUNT) line.tentsAmount++;
    }

    decreaseTents(line: Line) {
        if (line.tentsAmount - 1 >= MIN_TENTS_AMOUNT) line.tentsAmount--;
    }

    export() {
        const result = {
            name: 'Unknown grid',
            width: this.grid.width,
            height: this.grid.height,
            cells: {} as any,
            lines: {} as any
        };

        this.grid.cells.forEach((cell, id) => {
            result.cells[id] = cell.type;
        });

        this.grid.lines.forEach((line, id) => {
            result.lines[id] = line.tentsAmount;
        });

        console.log(JSON.stringify(result));
    }

    private initLevelData() {
        this.grid = new Grid(this.levelData.width, this.levelData.height);
        this.grid.initLevelCells(this.levelData.cells);
        this.grid.initLevelLines(this.levelData.lines);
        const lines = Array.from(this.grid.lines.values());
        this.columns = lines.filter(line => line.type === LineType.Column);
        this.rows = lines.filter(line => line.type === LineType.Row);
    }
}
