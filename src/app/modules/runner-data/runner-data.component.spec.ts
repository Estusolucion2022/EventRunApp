import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RunnerDataComponent } from './runner-data.component';

describe('RunnerDataComponent', () => {
  let component: RunnerDataComponent;
  let fixture: ComponentFixture<RunnerDataComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RunnerDataComponent]
    });
    fixture = TestBed.createComponent(RunnerDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
