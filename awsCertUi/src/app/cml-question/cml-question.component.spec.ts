import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CmlQuestionComponent } from './cml-question.component';

describe('CmlQuestionComponent', () => {
  let component: CmlQuestionComponent;
  let fixture: ComponentFixture<CmlQuestionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CmlQuestionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CmlQuestionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
