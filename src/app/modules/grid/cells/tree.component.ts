import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
    selector: 'app-tree',
    styleUrls: ['./cells.component.scss'],
    template: `
        <div class="cell cell-color-{{ color }}">
            <img class="tree-icon" src="assets/icons/tree.svg" />
        </div>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TreeComponent {
    color = 1 + Math.floor(Math.random() * 3);
}
