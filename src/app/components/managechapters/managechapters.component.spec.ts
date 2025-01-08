import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagechaptersComponent } from './managechapters.component';

describe('ManagechaptersComponent', () => {
  let component: ManagechaptersComponent;
  let fixture: ComponentFixture<ManagechaptersComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ManagechaptersComponent]
    });
    fixture = TestBed.createComponent(ManagechaptersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
