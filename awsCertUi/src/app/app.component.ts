import { Component, OnInit } from '@angular/core';
import {DataService} from "./data.service";

declare function test(): any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'awsCertUi';
  rootStuff: Object;

  constructor(private data: DataService) {

  }

  ngOnInit() {
    test();
    this.data.getRootInfo().subscribe(data => {
        this.rootStuff = data;
        console.log(this.rootStuff);
      }
    );
    this.data.getRootInfoWithParams('yo', 'dude').subscribe(data => {
        this.rootStuff = data;
        console.log(this.rootStuff);
      }
    );
  }
}
