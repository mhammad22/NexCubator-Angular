import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExploreStartupsComponent } from './explore-startups.component';

describe('ExploreStartupsComponent', () => {
  let component: ExploreStartupsComponent;
  let fixture: ComponentFixture<ExploreStartupsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExploreStartupsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExploreStartupsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
