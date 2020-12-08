import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Ca220QuestionComponent } from './ca220-question.component';

describe('Ca220QuestionComponent', () => {
  let component: Ca220QuestionComponent;
  let fixture: ComponentFixture<Ca220QuestionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Ca220QuestionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Ca220QuestionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
