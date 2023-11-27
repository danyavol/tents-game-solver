import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LevelSelectorComponent } from './level-selector.component';

describe('LevelSelectorComponent', () => {
  let component: LevelSelectorComponent;
  let fixture: ComponentFixture<LevelSelectorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LevelSelectorComponent]
    });
    fixture = TestBed.createComponent(LevelSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
