import { Component, OnInit } from '@angular/core';
import {DataService} from "../data.service";
import { Router, Routes, RouterModule } from '@angular/router';

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
      }
    );
    this.data.getRootInfoWithParams('yo', 'dude').subscribe(data => {
        this.rootStuff = data;
        console.log(this.rootStuff);
      }
    );
  }

  getCurrentPath() {
    if (this.currentPath === '/')
      return true;
    else
      return false;
  }

}
