import { CellId, CellType } from "../grid/basic/cell";
import { LineId } from "../grid/basic/line";
export interface TestData {
    name: string;
    width: number;
    height: number;
    cells: {[key: CellId]: CellType};
    lines: {[key: LineId]: number};
}

export const testLevel1: TestData = {"name":"Level 5x5 A5","width":5,"height":5,"cells":{"0x0":0,"1x0":0,"2x0":0,"3x0":0,"4x0":3,"0x1":0,"1x1":3,"2x1":0,"3x1":0,"4x1":0,"0x2":3,"1x2":0,"2x2":0,"3x2":0,"4x2":0,"0x3":0,"1x3":3,"2x3":0,"3x3":0,"4x3":0,"0x4":0,"1x4":0,"2x4":0,"3x4":3,"4x4":0},"lines":{"c0":2,"r0":0,"r1":3,"r2":0,"r3":1,"r4":1,"c1":0,"c2":1,"c3":0,"c4":2}};

export const testLevel2: TestData = {"name":"Level 7x7 B10","width":7,"height":7,"cells":{"0x0":0,"1x0":0,"2x0":0,"3x0":3,"4x0":0,"5x0":0,"6x0":0,"0x1":0,"1x1":0,"2x1":0,"3x1":0,"4x1":0,"5x1":3,"6x1":0,"0x2":0,"1x2":0,"2x2":0,"3x2":0,"4x2":0,"5x2":3,"6x2":0,"0x3":3,"1x3":0,"2x3":3,"3x3":0,"4x3":0,"5x3":0,"6x3":0,"0x4":0,"1x4":0,"2x4":0,"3x4":0,"4x4":0,"5x4":0,"6x4":0,"0x5":3,"1x5":3,"2x5":0,"3x5":0,"4x5":3,"5x5":0,"6x5":0,"0x6":0,"1x6":0,"2x6":0,"3x6":3,"4x6":0,"5x6":0,"6x6":0},"lines":{"c0":2,"c1":1,"c2":2,"c3":0,"c4":1,"c5":2,"c6":1,"r0":1,"r1":1,"r2":2,"r3":1,"r4":1,"r5":1,"r6":2}}
