import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {MadlibComponent} from './madlib.component';

describe('MadlibComponent', () => {
  let component: MadlibComponent;
  let fixture: ComponentFixture<MadlibComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MadlibComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MadlibComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
