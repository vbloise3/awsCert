import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CdanQuestionComponent } from './cdan-question.component';

describe('CdanQuestionComponent', () => {
  let component: CdanQuestionComponent;
  let fixture: ComponentFixture<CdanQuestionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CdanQuestionComponent ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CdanQuestionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
