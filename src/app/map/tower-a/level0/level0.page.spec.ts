import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Level0Page } from './level0.page';

describe('Level0Page', () => {
  let component: Level0Page;
  let fixture: ComponentFixture<Level0Page>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Level0Page ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Level0Page);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
