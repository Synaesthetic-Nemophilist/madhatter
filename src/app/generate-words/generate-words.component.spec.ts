import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {GenerateWordsComponent} from './generate-words.component';

describe('GenerateWordsComponent', () => {
  let component: GenerateWordsComponent;
  let fixture: ComponentFixture<GenerateWordsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [GenerateWordsComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GenerateWordsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
