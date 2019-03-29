import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CdaQuestionComponent } from './cda-question.component';

describe('CdaQuestionComponent', () => {
  let component: CdaQuestionComponent;
  let fixture: ComponentFixture<CdaQuestionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CdaQuestionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CdaQuestionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
