import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvestorHomePageComponent } from './investor-home-page.component';

describe('InvestorHomePageComponent', () => {
  let component: InvestorHomePageComponent;
  let fixture: ComponentFixture<InvestorHomePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InvestorHomePageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InvestorHomePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
