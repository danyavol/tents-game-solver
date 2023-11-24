import { Cell, CellType } from "./basic/cell";

export function cellTypeName(cellType: CellType) {
    switch (cellType) {
        case CellType.Empty: return "Empty";
        case CellType.Grass: return "Grass";
        case CellType.Tent: return "Tent";
        case CellType.Tree: return "Tree";
    }
}

export function logSet(cell: Cell) {
    console.log(`[${cell.id}]: Set ${cellTypeName(cell.type)}`);
}
