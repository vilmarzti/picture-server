import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VoteInfoComponent } from './vote-info.component';

describe('VoteInfoComponent', () => {
  let component: VoteInfoComponent;
  let fixture: ComponentFixture<VoteInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VoteInfoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VoteInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
