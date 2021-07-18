import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddProjectInfoFormComponent } from './add-project-info-form.component';

describe('AddProjectInfoFormComponent', () => {
  let component: AddProjectInfoFormComponent;
  let fixture: ComponentFixture<AddProjectInfoFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddProjectInfoFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddProjectInfoFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
