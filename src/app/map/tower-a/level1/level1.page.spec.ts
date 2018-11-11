import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Level1Page } from './level1.page';

describe('Level1Page', () => {
  let component: Level1Page;
  let fixture: ComponentFixture<Level1Page>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Level1Page ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Level1Page);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
