import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
    selector: 'app-tent',
    styleUrls: ['./cells.component.scss'],
    template: `
        <div class="cell cell-color-{{ color }}">
            <img class="tent-icon" src="assets/icons/tent.svg" />
        </div>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TentComponent {
    color = 1 + Math.floor(Math.random() * 3);
}
