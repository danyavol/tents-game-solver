import { type Cell, type CellId } from "./cell";

export enum LineType {
    Row,
    Column
}

export type LineId = `r${number}` | `c${number}`;

export class Line {
    static getId(type: LineType, index: number): LineId {
        if (type === LineType.Row) return `r${index}`;
        else return `c${index}`;
    }

    get id() {
        return Line.getId(this.type, this.index);
    }

    tentsAmount = 0;

    readonly cells = new Map<CellId, Cell>();

    constructor(public readonly type: LineType, public readonly index: number) {}
}