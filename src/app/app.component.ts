import { ChangeDetectionStrategy, Component } from '@angular/core';
import { testLevel1 } from './test-data/test-data';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {
    testLevel1 = testLevel1;
}
