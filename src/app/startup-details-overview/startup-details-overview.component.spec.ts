import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StartupDetailsOverviewComponent } from './startup-details-overview.component';

describe('StartupDetailsOverviewComponent', () => {
  let component: StartupDetailsOverviewComponent;
  let fixture: ComponentFixture<StartupDetailsOverviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StartupDetailsOverviewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StartupDetailsOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
