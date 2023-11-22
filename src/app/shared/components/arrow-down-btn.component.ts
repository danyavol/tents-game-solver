import { Component } from "@angular/core";

@Component({
    selector: "arrow-down-btn",
    templateUrl: "../../../assets/icons/arrow_drop_down.svg",
    styles: [`
        :host svg {
            display: block;
            color: #c7c7c7;
            width: 0.4em;
            height: 0.4em;
            transition: color 0.1s ease;
            cursor: pointer;
            user-select: none;

            &:hover {
                color: #828282;
            }
        }
    `]
})
export class ArrowDownBtnComponent {

}
