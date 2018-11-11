import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AuditoriumsInfoPage } from './auditoriums-info.page';

describe('AuditoriumsInfoPage', () => {
  let component: AuditoriumsInfoPage;
  let fixture: ComponentFixture<AuditoriumsInfoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AuditoriumsInfoPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AuditoriumsInfoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
