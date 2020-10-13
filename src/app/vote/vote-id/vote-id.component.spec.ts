import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VoteIdComponent } from './vote-id.component';

describe('VoteIdComponent', () => {
  let component: VoteIdComponent;
  let fixture: ComponentFixture<VoteIdComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VoteIdComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VoteIdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
