import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChitFundComponent } from './chit-fund.component';

describe('ChitFundComponent', () => {
  let component: ChitFundComponent;
  let fixture: ComponentFixture<ChitFundComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChitFundComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChitFundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
