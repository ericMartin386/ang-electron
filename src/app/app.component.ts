import { Component, OnInit  } from '@angular/core';

declare var require: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  public title = 'app';
  public version: string;

  public ngOnInit() {
    this.version = require( '../../package.json').version;
  }
}
