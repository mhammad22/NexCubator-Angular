import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPitchFormComponent } from './add-pitch-form.component';

describe('AddPitchFormComponent', () => {
  let component: AddPitchFormComponent;
  let fixture: ComponentFixture<AddPitchFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddPitchFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddPitchFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
