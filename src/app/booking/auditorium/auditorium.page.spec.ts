import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AuditoriumPage } from './auditorium.page';

describe('AuditoriumPage', () => {
  let component: AuditoriumPage;
  let fixture: ComponentFixture<AuditoriumPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AuditoriumPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AuditoriumPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
