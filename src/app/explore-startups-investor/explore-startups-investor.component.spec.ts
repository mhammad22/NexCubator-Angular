import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExploreStartupsInvestorComponent } from './explore-startups-investor.component';

describe('ExploreStartupsInvestorComponent', () => {
  let component: ExploreStartupsInvestorComponent;
  let fixture: ComponentFixture<ExploreStartupsInvestorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExploreStartupsInvestorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExploreStartupsInvestorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
