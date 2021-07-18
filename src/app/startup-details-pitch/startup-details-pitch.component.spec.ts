import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StartupDetailsPitchComponent } from './startup-details-pitch.component';

describe('StartupDetailsPitchComponent', () => {
  let component: StartupDetailsPitchComponent;
  let fixture: ComponentFixture<StartupDetailsPitchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StartupDetailsPitchComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StartupDetailsPitchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
