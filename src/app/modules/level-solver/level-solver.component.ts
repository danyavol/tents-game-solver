import { AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, ViewChild } from '@angular/core';
import { LevelData } from 'src/app/test-data/test-data';
import { Grid, MAX_TENTS_AMOUNT, MIN_TENTS_AMOUNT } from '../../grid/basic/grid';
import { Cell, CellType } from '../../grid/basic/cell';
import { Line } from '../../grid/basic/line';
import { GridComponent, GridMode } from '../grid/grid.component';
import { solveGrid } from 'src/app/grid/solver';
import { CommonModule } from '@angular/common';
import { GridModule } from '../grid/grid.module';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { startWith } from 'rxjs';
import { LevelsStorageService } from 'src/app/services/levels-storage.service';

declare var window: Window & { grid: Grid };
@Component({
    standalone: true,
    selector: 'app-level-solver',
    templateUrl: './level-solver.component.html',
    styleUrls: ['./level-solver.component.scss'],
    imports: [GridModule, CommonModule, ReactiveFormsModule, RouterModule],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LevelSolverComponent implements AfterViewInit {
    @ViewChild(GridComponent) gridComp!: GridComponent;
    @ViewChild('titleElem') titleElem!: ElementRef;
    grid!: Grid;
    GridMode = GridMode;

    levelName = new FormControl<string>('Custom level', { nonNullable: true });
    mode = GridMode.Edit;
    levelIndex: null | number = null;
    solved = false;

    get isSaved() {
        return !this.gridDirty && this.levelName.pristine;
    }

    private gridDirty = false;

    constructor(route: ActivatedRoute, router: Router, private levelsStorage: LevelsStorageService) {
        const { w, h, l } = route.snapshot.queryParams;

        if (l != null) {
            const level = this.levelsStorage.levels[l];
            if (!level) router.navigate(['/level-selector']);
            this.levelIndex = l;
            this.levelName.setValue(level.name);
            this.initGrid(level);
        } else if (w && h) {
            try {
                this.grid = new Grid(parseInt(w), parseInt(h));
            } catch(err) {
                router.navigate(['/level-selector']);
            }
        } else {
            router.navigate(['/level-selector']);
        }
    }

    ngAfterViewInit(): void {
        this.levelName.valueChanges.pipe(startWith(this.levelName.value)).subscribe(value => {
            this.titleElem.nativeElement.dataset['value'] = value ?? '';
        })
    }

    onCellClick({ cell }: { cell: Cell }) {
        if (this.mode === GridMode.View) return;

        if (cell.type === CellType.Tree) {
            cell.type = CellType.Empty;
        } else {
            cell.type = CellType.Tree;
        }
        this.gridDirty = true;
    }

    onTentIncrease(line: Line) {
        if (line.tentsAmount + 1 <= MAX_TENTS_AMOUNT) {
            line.tentsAmount++;
            this.gridDirty = true;
        }
    }

    onTentDecrease(line: Line) {
        if (line.tentsAmount - 1 >= MIN_TENTS_AMOUNT) {
            line.tentsAmount--;
            this.gridDirty = true;
        }
    }

    solve() {
        solveGrid(this.grid);
        this.mode = GridMode.View;
        this.gridComp.cdr.markForCheck();
        this.solved = true;
        this.levelName.disable();
    }

    save() {
        const result: LevelData = {
            name: this.levelName.value,
            width: this.grid.width,
            height: this.grid.height,
            cells: {},
            lines: {},
        };

        this.grid.cells.forEach((cell, id) => {
            result.cells[id] = cell.type;
        });

        this.grid.lines.forEach((line, id) => {
            result.lines[id] = line.tentsAmount;
        });

        if (this.levelIndex) {
            this.levelsStorage.updateLevel(this.levelIndex, result);
        } else {
            this.levelIndex = this.levelsStorage.addLevel(result);
        }
        this.gridDirty = false;
        this.levelName.markAsPristine();
    }

    private initGrid(levelData: LevelData) {
        this.grid = new Grid(levelData.width, levelData.height);
        this.grid.initLevelCells(levelData.cells);
        this.grid.initLevelLines(levelData.lines);

        window.grid = this.grid;
    }
}
