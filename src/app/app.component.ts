import { Component, OnInit  } from '@angular/core';
import { AppService, Person } from './app.service';

declare var require: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  public title = 'app';
  public version: string;
  public messagee: string;
  public people: Person[];

  constructor(private appService: AppService) { }


  public ngOnInit() {
    this.version = require( '../../package.json').version;
    this.getPeople();
  }

  public onClick() {
    const { ipcRenderer } = (<any>window).require('electron');
    ipcRenderer.send('request-software-update', {});
  }

  getPeople(): void {
    this.appService.getPeople()
    .subscribe(people => this.people = people);
  }
}
