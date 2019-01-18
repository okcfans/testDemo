import { Component, Input } from '@angular/core';

@Component({
  selector: 'page-null',
  templateUrl: 'page-null.html'
})
export class PageNullComponent {

  @Input() err: string;

  constructor() {}

}
