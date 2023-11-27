import { Cell, CellType } from "./basic/cell";
import { LineId } from "./basic/line";
import { Combination } from "./solver";

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

export function logCombinations(lineId: LineId, combinations: Combination[]) {
    const title = `[line ${lineId}]: ${combinations.length} possible combinations found for ${combinations[0]?.map(([cell]) => cell.id).join(' ')}\n`;
    const result = combinations.map((comb, i) =>
        i + ': ' + comb.map(([_, cellType]) => getCellIcon(cellType)).join(' ')
    ).join('\n');
    console.log(title + result);
}

export function logInvalidCombination(lineId: LineId, comb: Combination) {
    console.log(`[line ${lineId}]: Invalid combination was removed - ${comb.map(([_, cellType]) => getCellIcon(cellType)).join(' ')}`)
}
