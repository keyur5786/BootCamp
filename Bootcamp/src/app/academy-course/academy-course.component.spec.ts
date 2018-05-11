import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AcademyCourseComponent } from './academy-course.component';

describe('AcademyCourseComponent', () => {
  let component: AcademyCourseComponent;
  let fixture: ComponentFixture<AcademyCourseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AcademyCourseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AcademyCourseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
