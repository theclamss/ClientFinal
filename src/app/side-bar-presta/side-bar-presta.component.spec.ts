import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SideBarNav2Component } from './side-bar-presta.component';

describe('SideBarPrestaComponent', () => {
  let component: SideBarNav2Component;
  let fixture: ComponentFixture<SideBarNav2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SideBarNav2Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SideBarNav2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
