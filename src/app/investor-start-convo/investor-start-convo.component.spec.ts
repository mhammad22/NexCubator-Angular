import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvestorStartConvoComponent } from './investor-start-convo.component';

describe('InvestorStartConvoComponent', () => {
  let component: InvestorStartConvoComponent;
  let fixture: ComponentFixture<InvestorStartConvoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InvestorStartConvoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InvestorStartConvoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
