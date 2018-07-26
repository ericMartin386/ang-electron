import { Component, OnInit  } from '@angular/core';

declare var require: any;
declare var electron: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  public title = 'app';
  public version: string;
  public messagee: string;

  public ngOnInit() {
    this.version = require( '../../package.json').version;

    electron.ipcRenderer.on('message', function(event, text) {
      this.message = text;
    });
  }
}
