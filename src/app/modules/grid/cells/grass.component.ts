import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
    selector: 'app-grass',
    styleUrls: ['./cells.component.scss'],
    template: ` <div class="cell cell-color-{{ color }}"></div> `,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GrassComponent {
    color = 1 + Math.floor(Math.random() * 3);
}
