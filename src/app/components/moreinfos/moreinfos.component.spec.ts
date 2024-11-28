import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MoreinfosComponent } from './moreinfos.component';

describe('MoreinfosComponent', () => {
  let component: MoreinfosComponent;
  let fixture: ComponentFixture<MoreinfosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MoreinfosComponent]
    });
    fixture = TestBed.createComponent(MoreinfosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
