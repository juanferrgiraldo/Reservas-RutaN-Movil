import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TowerAPage } from './tower-a.page';

describe('TowerAPage', () => {
  let component: TowerAPage;
  let fixture: ComponentFixture<TowerAPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TowerAPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TowerAPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
