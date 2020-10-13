import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewIdComponent } from './view-id.component';

describe('ViewIdComponent', () => {
  let component: ViewIdComponent;
  let fixture: ComponentFixture<ViewIdComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewIdComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewIdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
