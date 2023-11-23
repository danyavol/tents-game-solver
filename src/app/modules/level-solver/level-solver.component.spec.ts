import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LevelSolverComponent } from './level-solver.component';

describe('LevelSolverComponent', () => {
  let component: LevelSolverComponent;
  let fixture: ComponentFixture<LevelSolverComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LevelSolverComponent]
    });
    fixture = TestBed.createComponent(LevelSolverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
