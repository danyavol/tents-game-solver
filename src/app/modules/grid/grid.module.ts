import { NgModule } from "@angular/core";
import { GridComponent } from "./grid.component";
import { CommonModule } from "@angular/common";
import { CellComponent } from "./cell/cell.component";
import { SvgIconComponent } from "angular-svg-icon";

@NgModule({
    declarations: [GridComponent, CellComponent],
    imports: [CommonModule, SvgIconComponent],
    exports: [GridComponent]
})
export class GridModule {}
