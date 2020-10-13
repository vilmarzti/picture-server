import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VoteByeComponent } from './vote-bye.component';

describe('VoteByeComponent', () => {
  let component: VoteByeComponent;
  let fixture: ComponentFixture<VoteByeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VoteByeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VoteByeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
