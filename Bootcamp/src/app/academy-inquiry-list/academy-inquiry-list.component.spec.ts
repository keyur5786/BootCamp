import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AcademyInquiryListComponent } from './academy-inquiry-list.component';

describe('AcademyInquiryListComponent', () => {
  let component: AcademyInquiryListComponent;
  let fixture: ComponentFixture<AcademyInquiryListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AcademyInquiryListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AcademyInquiryListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
