import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VoteAllComponent } from './vote-all.component';

describe('VoteAllComponent', () => {
  let component: VoteAllComponent;
  let fixture: ComponentFixture<VoteAllComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VoteAllComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VoteAllComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
