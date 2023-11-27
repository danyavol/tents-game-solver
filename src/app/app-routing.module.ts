import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
    {
        path: 'level-selector',
        loadComponent: () => import('./modules/level-selector/level-selector.component').then(m => m.LevelSelectorComponent)
    },
    {
        path: 'level-solver',
        loadComponent: () => import('./modules/level-solver/level-solver.component').then(m => m.LevelSolverComponent)
    },
    {
        path: '**',
        redirectTo: 'level-selector'
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}
