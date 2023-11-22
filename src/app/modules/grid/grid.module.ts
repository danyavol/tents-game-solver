import { NgModule } from "@angular/core";
import { TreeComponent } from "./cells/tree.component";
import { TentComponent } from "./cells/tent.component";
import { GrassComponent } from "./cells/grass.component";
import { EmptyComponent } from "./cells/empty.component";
import { GridComponent } from "./grid.component";
import { CommonModule } from "@angular/common";
import { SharedModule } from "src/app/shared/shared.module";

@NgModule({
    declarations: [TreeComponent, TentComponent, GrassComponent, EmptyComponent, GridComponent],
    imports: [CommonModule, SharedModule],
    exports: [GridComponent]
})
export class GridModule {}
