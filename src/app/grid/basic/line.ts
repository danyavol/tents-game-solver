import { BehaviorSubject } from "rxjs";
import { type Cell, type CellId } from "./cell";

export enum LineType {
    Row,
    Column
}

export enum LineStatus {
    Incomplete,
    Complete,
    Mistake
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

    get status() {
        return this.status$.value;
    }
    set status(value: LineStatus) {
        this.status$.next(value);
    }

    status$ = new BehaviorSubject(LineStatus.Complete);

    readonly cells = new Map<CellId, Cell>();

    constructor(public readonly type: LineType, public readonly index: number) {}


}
