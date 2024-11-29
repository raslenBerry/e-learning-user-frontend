import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageCoursesTrainerComponent } from './manage-courses-trainer.component';

describe('ManageCoursesTrainerComponent', () => {
  let component: ManageCoursesTrainerComponent;
  let fixture: ComponentFixture<ManageCoursesTrainerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ManageCoursesTrainerComponent]
    });
    fixture = TestBed.createComponent(ManageCoursesTrainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
