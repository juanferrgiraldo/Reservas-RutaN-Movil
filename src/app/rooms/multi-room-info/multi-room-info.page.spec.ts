import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MultiRoomInfoPage } from './multi-room-info.page';

describe('MultiRoomInfoPage', () => {
  let component: MultiRoomInfoPage;
  let fixture: ComponentFixture<MultiRoomInfoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MultiRoomInfoPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MultiRoomInfoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
