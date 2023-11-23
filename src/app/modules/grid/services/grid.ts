import { Cell, CellType, type CellId } from "./cell";
import { Line, type LineId, LineType } from "./line";

export const MIN_GRID_SIZE = 4;
export const MAX_GRID_SIZE = 23;
export const MIN_TENTS_AMOUNT = 0;
export const MAX_TENTS_AMOUNT = 12;

export class Grid {
    readonly cells = new Map<CellId, Cell>();
    readonly lines = new Map<LineId, Line>();

    constructor(public readonly width: number, public readonly height: number) {
        this.validateGridSize(this.height);
        this.validateGridSize(this.width);
        this.initializeGrid();
    }

    initLevelCells(cells: {[key: CellId]: CellType}) {
        for (let [key, value] of Object.entries(cells)) {
            const cell = this.cells.get(key as CellId);
            if (!cell) throw Error(`Cell with id '${key}' doesn't exist`);

            cell.type = value;
        }
    }

    initLevelLines(lines: {[key: LineId]: number}) {
        for (let [key, value] of Object.entries(lines)) {
            const line = this.lines.get(key as LineId);
            if (!line) throw Error(`Line with id '${key}' doesn't exist`);

            line.tentsAmount = value;
        }
    }

    private initializeGrid() {
        for (let posY = 0; posY < this.height; posY++) {

            const colLine = new Line(LineType.Column, posY);
            this.lines.set(colLine.id, colLine);

            for (let posX = 0; posX < this.width; posX++) {
                let rowLine = this.lines.get(Line.getId(LineType.Row, posX));
                if (!rowLine) {
                    rowLine = new Line(LineType.Row, posX);
                    this.lines.set(rowLine.id, rowLine);
                }

                const cell = new Cell(posX, posY);
                this.cells.set(cell.id, cell);

                colLine.cells.set(cell.id, cell);
                rowLine.cells.set(cell.id, cell);
            }
        }
    }

    private validateGridSize(heightOrWidth: number) {
        if (heightOrWidth < MIN_GRID_SIZE || heightOrWidth > MAX_GRID_SIZE || !Number.isInteger(heightOrWidth)) {
            throw Error(`Grid size must be integer >= ${MIN_GRID_SIZE} and <= ${MAX_GRID_SIZE}`);
        }
    }
}
