import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminAllStartupsComponent } from './admin-all-startups.component';

describe('AdminAllStartupsComponent', () => {
  let component: AdminAllStartupsComponent;
  let fixture: ComponentFixture<AdminAllStartupsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminAllStartupsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminAllStartupsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
