import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {Ca220QuestionComponent} from "./ca220-question/ca220-question.component";

const routes: Routes = [
  {
    path: '7',
    redirectTo: '2021',
    pathMatch: 'full'
  },
  {
    path: '2021',
    component: Ca220QuestionComponent,
    /*loadChildren: () => import("./tab.module").then(m => m.TabModule)*/
  },
  {
    path: 'ca220practice',
    component: Ca220QuestionComponent,
    /*loadChildren: () => import("./tab.module").then(m => m.TabModule)*/
  },
  {
    path: '#!ca220practice',
    component: Ca220QuestionComponent,
    /*loadChildren: () => import("./tab.module").then(m => m.TabModule)*/
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes,
      { enableTracing: true }
    )],
  exports: [RouterModule]
})
export class AppRoutingModule { }
