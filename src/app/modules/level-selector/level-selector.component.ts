import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { MAX_GRID_SIZE, MIN_GRID_SIZE } from 'src/app/grid/basic/grid';
import { LevelsStorageService } from 'src/app/services/levels-storage.service';

const validators = [Validators.required, Validators.min(MIN_GRID_SIZE), Validators.max(MAX_GRID_SIZE)];

@Component({
    standalone: true,
    selector: 'app-level-selector',
    templateUrl: './level-selector.component.html',
    styleUrls: ['./level-selector.component.scss'],
    imports: [CommonModule, RouterModule, ReactiveFormsModule],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LevelSelectorComponent {
    levels = inject(LevelsStorageService).levels;
    form = new FormGroup({
        width: new FormControl<number | null>(null, validators),
        height: new FormControl<number | null>(null, validators),
    });
    MIN_GRID_SIZE = MIN_GRID_SIZE;
    MAX_GRID_SIZE = MAX_GRID_SIZE;

    constructor(private router: Router) {}

    onGenerate() {
        this.form.markAllAsTouched();
        if (this.form.invalid) return;

        const { width: w, height: h } = this.form.getRawValue();
        this.router.navigate(['/level-solver'], { queryParams: { w, h } });
    }
}
