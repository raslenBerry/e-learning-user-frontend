import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginRegisterComponent } from './loginregister.component';

describe('LoginregisterComponent', () => {
  let component: LoginRegisterComponent;
  let fixture: ComponentFixture<LoginRegisterComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LoginRegisterComponent]
    });
    fixture = TestBed.createComponent(LoginRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
