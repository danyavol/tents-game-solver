import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Cell, CellType } from '../../grid/basic/cell';
import { Grid } from '../../grid/basic/grid';
import { Line, LineType } from '../../grid/basic/line';

export enum GridMode {
    Edit,
    View,
    Play
}

@Component({
    selector: 'app-grid',
    templateUrl: './grid.component.html',
    styleUrls: ['./grid.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class GridComponent implements OnInit {
    @Input() grid!: Grid;
    @Input() mode = GridMode.Edit;

    @Output() onCellClick = new EventEmitter<{ cell: Cell, event: MouseEvent }>();
    @Output() onTentIncrease = new EventEmitter<Line>();
    @Output() onTentDecrease = new EventEmitter<Line>();

    columns!: Line[];
    rows!: Line[];
    CellType = CellType;
    GridMode = GridMode;

    constructor(public cdr: ChangeDetectorRef) {}

    ngOnInit(): void {
        const lines = Array.from(this.grid.lines.values());
        this.columns = lines.filter(line => line.type === LineType.Column);
        this.rows = lines.filter(line => line.type === LineType.Row);
    }

    trackByCells(_index: number, cell: Cell) {
        return cell.id;
    }

    trackByLines(_index: number, line: Line) {
        return line.id;
    }

    cellClickHandler(cell: Cell, event: MouseEvent) {
        this.onCellClick.emit({ cell, event });
    }

    getLineStatus(line: Line) {
        let currentTentsAmount = 0;
        line.cells.forEach(cell => cell.type === CellType.Tent ? currentTentsAmount++ : null);

        if (currentTentsAmount === line.tentsAmount) return "complete";
        if (currentTentsAmount > line.tentsAmount) return "mistake";
        return "";
    }
}
