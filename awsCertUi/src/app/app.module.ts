import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';

import { AppRoutingModule } from './app-routing.module';
import { MatSidenavModule, MatToolbarModule } from '@angular/material';
import {MatButtonModule, MatCardModule, MatDialogModule, MatSnackBarModule, MatIconModule} from '@angular/material';
import { MatDividerModule, MatRadioModule} from '@angular/material';
import { MatFormFieldModule } from '@angular/material';
import { MatInputModule, MatCheckboxModule } from '@angular/material';
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
    CdaQuestionComponent
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
