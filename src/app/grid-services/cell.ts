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

    type = CellType.Empty;

    constructor(public readonly x: PosX, public readonly y: PosY) {}

    destroy(): void {}
}
