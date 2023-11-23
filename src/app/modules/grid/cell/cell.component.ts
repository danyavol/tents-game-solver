import { ChangeDetectionStrategy, Component, HostBinding, Input } from '@angular/core';
import { CellType } from '../../../grid/basic/cell';

@Component({
    selector: 'app-cell',
    styleUrls: ['./cell.component.scss'],
    templateUrl: './cell.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CellComponent {
    @Input() cellType = CellType.Empty;
    @HostBinding('class.clickable') @Input() clickable = true;

    CellType = CellType;
    cellColor = 1 + Math.floor(Math.random() * 3);
}
