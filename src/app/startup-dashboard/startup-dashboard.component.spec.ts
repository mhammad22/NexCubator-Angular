import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StartupDashboardComponent } from './startup-dashboard.component';

describe('StartupDashboardComponent', () => {
  let component: StartupDashboardComponent;
  let fixture: ComponentFixture<StartupDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StartupDashboardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StartupDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
