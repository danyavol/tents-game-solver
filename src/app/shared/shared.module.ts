import { NgModule } from "@angular/core";
import { ArrowDownBtnComponent } from "./components/arrow-down-btn.component";
import { ArrowUpBtnComponent } from "./components/arrow-up-btn.component";

@NgModule({
    declarations: [ArrowDownBtnComponent, ArrowUpBtnComponent],
    exports: [ArrowDownBtnComponent, ArrowUpBtnComponent]
})
export class SharedModule {}
