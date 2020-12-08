import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';

import { AppRoutingModule } from './app-routing.module';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDividerModule } from '@angular/material/divider';
import { MatRadioModule } from '@angular/material/radio';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { TestComponent } from './test/test.component';
import { PageNotFoundComponent } from "./page-not-found/page-not-found.component";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeComponent } from './home/home.component';
import {C2pDynamoDbComponent} from './c2p-dynamo-db/c2p-dynamo-db.component';
import { OnlyNumberDirective} from './directives/only-number.directive';

import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule} from '@angular/forms';
import { BaseComponent } from './base/base.component';
import { DynamoDbserviceService } from './services/dynamo-dbservice';
import { C2pQuestionComponent } from './c2p-question/c2p-question.component';
import { Ca2QuestionComponent } from './ca2-question/ca2-question.component';
import {DataService} from "./data.service";
import { CdaQuestionComponent } from './cda-question/cda-question.component';
import { CmlQuestionComponent } from './cml-question/cml-question.component';
import {CdanQuestionComponent} from "./cdan-question/cdan-question.component";
import { Ca220QuestionComponent } from './ca220-question/ca220-question.component';

const appRoutes: Routes = [
  {
    path: 'tester',
    component: TestComponent
  },
  {
    path: 'c2ppractice',
    component: C2pQuestionComponent
  },
  {
    path: 'ca2practice',
    component: Ca2QuestionComponent
  },
  {
    path: 'cdapractice',
    component: CdaQuestionComponent
  },
  {
    path: 'cmlpractice',
    component: CmlQuestionComponent
  },
  {
    path: 'cdanpractice',
    component: CdanQuestionComponent
  },
  {
    path: 'ca220practice',
    component: Ca220QuestionComponent
  },
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: '1',
    component: HomeComponent
  },
  {
    path: '2',
    component: C2pQuestionComponent
  },
  {
    path: '3',
    component: Ca2QuestionComponent
  },
  {
    path: '4',
    component: CdaQuestionComponent
  },
  {
    path: '5',
    component: CmlQuestionComponent
  },
  {
    path: '6',
    component: CdanQuestionComponent
  },
  {
    path: '7',
    component: Ca220QuestionComponent
  },
  {
    path: '',
    redirectTo: '',
    pathMatch: 'full'
  },
  { path: '**', component: PageNotFoundComponent }
  ];

@NgModule({
  declarations: [
    AppComponent,
    TestComponent,
    PageNotFoundComponent,
    HomeComponent,
    BaseComponent,
    C2pDynamoDbComponent,
    OnlyNumberDirective,
    C2pQuestionComponent,
    Ca2QuestionComponent,
    CdaQuestionComponent,
    CmlQuestionComponent,
    CdanQuestionComponent,
    Ca220QuestionComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatToolbarModule,
    MatCardModule,
    MatSidenavModule,
    FlexLayoutModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatDividerModule,
    MatRadioModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [DynamoDbserviceService, DataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
