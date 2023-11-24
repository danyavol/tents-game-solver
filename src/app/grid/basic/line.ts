import { BehaviorSubject, Subject, pairwise, takeUntil } from "rxjs";
import { CellType, type Cell, type CellId } from "./cell";
import { getMapProxy } from "../map-proxy";

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

    /** Total amount of tents that must be placed on this line */
    get tentsAmount() {
        return this._tentsAmount;
    }
    set tentsAmount(value: number) {
        this._tentsAmount = value;
    }
    private _tentsAmount = 0;

    /** How much tents are already placed on this line */
    get tentsPlaced() {
        return this._tentsPlaced;
    }
    private _tentsPlaced = 0;

    /** How much tents are left to be placed on this line */
    get tentsLeft() {
        return this._tentsAmount - this._tentsPlaced;
    }

    get status() {
        return this.status$.value;
    }
    set status(value: LineStatus) {
        this.status$.next(value);
    }

    status$ = new BehaviorSubject(LineStatus.Complete);

    readonly cells = getMapProxy(new Map<CellId, Cell>(), {
        onSet: ({ value: cell }) => {
            if (cell.type === CellType.Tent) this._tentsPlaced++;
            cell.type$.pipe(pairwise(), takeUntil(this.destroy$)).subscribe(([prev, curr]) => {
                if (prev === CellType.Tent && curr !== CellType.Tent) {
                    this._tentsPlaced--;
                } else if (prev !== CellType.Tent && curr === CellType.Tent) {
                    this._tentsPlaced++;
                }
            })
        }
    });

    private destroy$ = new Subject<void>();

    constructor(public readonly type: LineType, public readonly index: number) {}

    destroy(): void {
        this.destroy$.next();
        this.destroy$.complete();
    }
}
