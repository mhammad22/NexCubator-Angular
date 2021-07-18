import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddNewStartupFormComponent } from './add-new-startup-form.component';

describe('AddNewStartupFormComponent', () => {
  let component: AddNewStartupFormComponent;
  let fixture: ComponentFixture<AddNewStartupFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddNewStartupFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddNewStartupFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
