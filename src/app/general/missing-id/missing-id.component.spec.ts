import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MissingIdComponent } from './missing-id.component';

describe('MissingIdComponent', () => {
  let component: MissingIdComponent;
  let fixture: ComponentFixture<MissingIdComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MissingIdComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MissingIdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
