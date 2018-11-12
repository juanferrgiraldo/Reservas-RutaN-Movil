import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MultiRoomPage } from './multi-room.page';

describe('MultiRoomPage', () => {
  let component: MultiRoomPage;
  let fixture: ComponentFixture<MultiRoomPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MultiRoomPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MultiRoomPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
