import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InscriptionDataListComponent } from './inscription-data-list.component';

describe('InscriptionDataListComponent', () => {
  let component: InscriptionDataListComponent;
  let fixture: ComponentFixture<InscriptionDataListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InscriptionDataListComponent]
    });
    fixture = TestBed.createComponent(InscriptionDataListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
