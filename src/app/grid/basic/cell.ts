import { BehaviorSubject } from "rxjs";
import { Grid } from "./grid";

export enum CellType {
    Empty,
    Grass,
    Tent,
    Tree
}

/** Position X-axis (horizontal) */
export type PosX = number;

/** Position Y-axis (vertical) */
export type PosY = number;

export type CellId = `${PosX}x${PosY}`;

export class Cell {
    static getId(posX: PosX, posY: PosY): CellId {
        return `${posX}x${posY}`
    }

    get id() {
        return Cell.getId(this.x, this.y);
    }

    get type() {
        return this.type$.value;
    }
    set type(value: CellType) {
        this.type$.next(value);
    }
    type$ = new BehaviorSubject(CellType.Empty);

    get nearest4Cells(): Cell[] {
        return [
            this.getCellWithOffset(1, 0),
            this.getCellWithOffset(-1, 0),
            this.getCellWithOffset(0, 1),
            this.getCellWithOffset(0, -1),
        ].filter(c => c !== undefined) as Cell[];
    }

    get nearest8Cells(): Cell[] {
        return [
            this.getCellWithOffset(1, 1),
            this.getCellWithOffset(1, -1),
            this.getCellWithOffset(-1, 1),
            this.getCellWithOffset(-1, -1),
            ...this.nearest4Cells
        ].filter(c => c !== undefined) as Cell[];
    }

    constructor(public readonly x: PosX, public readonly y: PosY, private readonly grid: Grid) {}

    /** Check nearest 4 cells (top, bottom, left, right) */
    isNeighbor4Cell(cell: Cell) {
        return this.x === cell.x && Math.abs(this.y - cell.y) <= 1
        || this.y === cell.y && Math.abs(this.x - cell.x) <= 1;
    }

    destroy(): void {
        this.type$.complete();
    }

    private getCellWithOffset(xOffset: number, yOffset: number): Cell | undefined {
        return this.grid.cells.get(Cell.getId(this.x + xOffset, this.y + yOffset));
    }
}
