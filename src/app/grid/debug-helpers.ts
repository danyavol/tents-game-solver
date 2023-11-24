import { Cell, CellType } from "./basic/cell";
import { LineId } from "./basic/line";

export function getCellIcon(cellType: CellType) {
    switch (cellType) {
        case CellType.Empty: return "⬜";
        case CellType.Grass: return "🟩";
        case CellType.Tent: return "⛺";
        case CellType.Tree: return "🌳";
    }
}

export function logSet(cell: Cell) {
    console.log(`[${cell.id}]: Set ${getCellIcon(cell.type)}`);
}

export function logCombinations(lineId: LineId, cells: Cell[], combinations: CellType[][]) {
    const title = `[line ${lineId}]: ${combinations.length} combinations found for ${cells.map(c => c.id).join(' ')}\n`;
    const result = combinations.map((combs, i) =>
        i + ': ' + combs.map((comb) => getCellIcon(comb)).join(' ')
    ).join('\n');
    console.log(title + result);
}
