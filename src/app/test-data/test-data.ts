import { CellId, CellType } from "../grid/basic/cell";
import { LineId } from "../grid/basic/line";
export interface TestData {
    name: string;
    width: number;
    height: number;
    cells: {[key: CellId]: CellType};
    lines: {[key: LineId]: number};
}

export const testLevel1: TestData = {"name":"Level5x5A5","width":5,"height":5,"cells":{"0x0":0,"1x0":0,"2x0":0,"3x0":0,"4x0":3,"0x1":0,"1x1":3,"2x1":0,"3x1":0,"4x1":0,"0x2":3,"1x2":0,"2x2":0,"3x2":0,"4x2":0,"0x3":0,"1x3":3,"2x3":0,"3x3":0,"4x3":0,"0x4":0,"1x4":0,"2x4":0,"3x4":3,"4x4":0},"lines":{"c0":2,"r0":0,"r1":3,"r2":0,"r3":1,"r4":1,"c1":0,"c2":1,"c3":0,"c4":2}};
