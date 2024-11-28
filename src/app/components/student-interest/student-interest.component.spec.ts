import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentInterestComponent } from './student-interest.component';

describe('StudentInterestComponent', () => {
  let component: StudentInterestComponent;
  let fixture: ComponentFixture<StudentInterestComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StudentInterestComponent]
    });
    fixture = TestBed.createComponent(StudentInterestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
