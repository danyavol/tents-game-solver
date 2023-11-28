import { Injectable } from "@angular/core";
import { LevelData, testLevels } from "../test-data/test-data";

const KEY = "saved_lavels";

@Injectable({
    providedIn: "root"
})
export class LevelsStorageService {
    readonly levels: LevelData[];

    constructor() {
        const data = localStorage.getItem(KEY);
        if (!data) {
            this.levels = [...testLevels];
            this.saveLevels();
        }
        else this.levels = JSON.parse(data);
    }

    addLevel(level: LevelData): number {
        this.levels.push(level);
        this.saveLevels();
        return this.levels.length - 1;
    }

    updateLevel(index: number, value: Partial<LevelData>) {
        this.levels[index] = {...this.levels[index], ...value};
        this.saveLevels();
    }

    deleteLevel(index: number) {
        this.levels.splice(index, 1);
        this.saveLevels();
    }

    private saveLevels() {
        localStorage.setItem(KEY, JSON.stringify(this.levels));
    }
}
