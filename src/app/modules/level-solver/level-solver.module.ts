import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LevelSolverComponent } from './level-solver.component';
import { GridModule } from '../grid/grid.module';

@NgModule({
    declarations: [LevelSolverComponent],
    exports: [LevelSolverComponent],
    imports: [GridModule, CommonModule],
})
export class LevelSolverModule {}
