import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AcademyNavbarComponent } from './academy-navbar.component';

describe('AcademyNavbarComponent', () => {
  let component: AcademyNavbarComponent;
  let fixture: ComponentFixture<AcademyNavbarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AcademyNavbarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AcademyNavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
