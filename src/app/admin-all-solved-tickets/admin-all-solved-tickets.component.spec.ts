import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminAllSolvedTicketsComponent } from './admin-all-solved-tickets.component';

describe('AdminAllSolvedTicketsComponent', () => {
  let component: AdminAllSolvedTicketsComponent;
  let fixture: ComponentFixture<AdminAllSolvedTicketsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminAllSolvedTicketsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminAllSolvedTicketsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
