import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VoteMissingComponent } from './vote-missing.component';

describe('VoteMissingComponent', () => {
  let component: VoteMissingComponent;
  let fixture: ComponentFixture<VoteMissingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VoteMissingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VoteMissingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
