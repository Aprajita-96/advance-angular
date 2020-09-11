import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HeadermobComponent } from './headermob.component';

describe('HeadermobComponent', () => {
  let component: HeadermobComponent;
  let fixture: ComponentFixture<HeadermobComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HeadermobComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeadermobComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
