import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AcademypanelComponent } from './academypanel.component';

describe('AcademypanelComponent', () => {
  let component: AcademypanelComponent;
  let fixture: ComponentFixture<AcademypanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AcademypanelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AcademypanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
