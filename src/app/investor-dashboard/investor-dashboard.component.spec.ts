import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvestorDashboardComponent } from './investor-dashboard.component';

describe('InvestorDashboardComponent', () => {
  let component: InvestorDashboardComponent;
  let fixture: ComponentFixture<InvestorDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InvestorDashboardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InvestorDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
