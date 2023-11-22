import { CellId, CellType } from "src/app/grid-services/cell";
import { LineId } from "src/app/grid-services/line";

export interface TestData {
    name: string;
    width: number;
    height: number;
    cells: {[key: CellId]: CellType};
    lines: {[key: LineId]: number};
}
