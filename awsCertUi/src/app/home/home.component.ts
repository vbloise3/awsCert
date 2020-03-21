import { Component, OnInit } from '@angular/core';
import {DataService} from "../data.service";
import { Router, Routes, RouterModule } from '@angular/router';
import {placeholdersToParams} from "@angular/compiler/src/render3/view/i18n/util";

declare function test(): any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})

export class HomeComponent implements OnInit {
  title = 'awsCertUi';
  isDarkTheme: boolean = false;
  rootStuff: Object;
  currentPath = '';

  constructor(private data: DataService, private _router: Router) {
    this.currentPath = this._router.url;
  }

  ngOnInit() {
    test();
    this.data.getRootInfo().subscribe(data => {
        this.rootStuff = data;
        console.log(this.rootStuff);
        console.log('in root call');

      }
    );
    let theReturnedJSON: any;
    theReturnedJSON = this.data.getRootInfoWithParams('yo', 'dude').subscribe(data => {
        this.rootStuff = data;
        console.log(this.rootStuff);
        console.log('in email call');
      }
    );
    console.log(theReturnedJSON);
  }

  getCurrentPath() {
    if (this.currentPath === '/')
      return true;
    else
      return false;
  }

}
