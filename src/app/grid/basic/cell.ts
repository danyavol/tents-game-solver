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

    get rightCell() {
        return this.grid.cells.get(Cell.getId(this.x+1, this.y));
    }

    get leftCell() {
        return this.grid.cells.get(Cell.getId(this.x-1, this.y));
    }

    get topCell() {
        return this.grid.cells.get(Cell.getId(this.x, this.y-1));
    }

    get bottomCell() {
        return this.grid.cells.get(Cell.getId(this.x, this.y+1));
    }

    get nearest4Cells(): Cell[] {
        return [this.rightCell, this.leftCell, this.topCell, this.bottomCell].filter(c => c !== undefined) as Cell[];
    }

    constructor(public readonly x: PosX, public readonly y: PosY, private readonly grid: Grid) {}

    destroy(): void {
        this.type$.complete();
    }


}
