import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AcademyRegisterComponent } from './academy-register.component';

describe('AcademyRegisterComponent', () => {
  let component: AcademyRegisterComponent;
  let fixture: ComponentFixture<AcademyRegisterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AcademyRegisterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AcademyRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
