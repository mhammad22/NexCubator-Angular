import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StartupDetailsTeamComponent } from './startup-details-team.component';

describe('StartupDetailsTeamComponent', () => {
  let component: StartupDetailsTeamComponent;
  let fixture: ComponentFixture<StartupDetailsTeamComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StartupDetailsTeamComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StartupDetailsTeamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
