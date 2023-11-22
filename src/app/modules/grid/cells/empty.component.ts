import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
    selector: 'app-empty',
    styleUrls: ['./cells.component.scss'],
    template: `<div class="cell cell-color-empty"></div>`,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EmptyComponent {}
