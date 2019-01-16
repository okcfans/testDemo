import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'inline-radio',
  templateUrl: 'inline-radio.html'
})
export class InlineRadioComponent {

  @Input() items: Array<{ code: string, text: string, check: boolean }>;
  @Input() selected;
  @Output() change = new EventEmitter();

  constructor() {}

  ngOnInit() {
    for (let item of  this.items) {
      item.check = (this.selected !== undefined && item.code === this.selected);
    }
  }

  changeOption(i) {
    for (let item in this.items) {
      this.items[item].check = false;
    }
    this.items[i].check = true;
    this.change.emit(this.items[i]);
  }

}
