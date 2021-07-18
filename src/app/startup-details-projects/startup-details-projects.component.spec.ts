import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StartupDetailsProjectsComponent } from './startup-details-projects.component';

describe('StartupDetailsProjectsComponent', () => {
  let component: StartupDetailsProjectsComponent;
  let fixture: ComponentFixture<StartupDetailsProjectsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StartupDetailsProjectsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StartupDetailsProjectsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
