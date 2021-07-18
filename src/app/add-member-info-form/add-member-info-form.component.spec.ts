import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddMemberInfoFormComponent } from './add-member-info-form.component';

describe('AddMemberInfoFormComponent', () => {
  let component: AddMemberInfoFormComponent;
  let fixture: ComponentFixture<AddMemberInfoFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddMemberInfoFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddMemberInfoFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
