import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AcademyHomeComponent } from './academy-home.component';

describe('AcademyHomeComponent', () => {
  let component: AcademyHomeComponent;
  let fixture: ComponentFixture<AcademyHomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AcademyHomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AcademyHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
