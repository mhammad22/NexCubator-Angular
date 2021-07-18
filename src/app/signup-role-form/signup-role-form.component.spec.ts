import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignupRoleFormComponent } from './signup-role-form.component';

describe('SignupRoleFormComponent', () => {
  let component: SignupRoleFormComponent;
  let fixture: ComponentFixture<SignupRoleFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SignupRoleFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SignupRoleFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
