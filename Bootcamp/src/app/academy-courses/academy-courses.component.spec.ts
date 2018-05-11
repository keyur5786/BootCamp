import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AcademyCoursesComponent } from './academy-courses.component';

describe('AcademyCoursesComponent', () => {
  let component: AcademyCoursesComponent;
  let fixture: ComponentFixture<AcademyCoursesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AcademyCoursesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AcademyCoursesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
