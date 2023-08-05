import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateInscriptionDataComponent } from './create-inscription-data.component';

describe('CreateInscriptionDataComponent', () => {
  let component: CreateInscriptionDataComponent;
  let fixture: ComponentFixture<CreateInscriptionDataComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreateInscriptionDataComponent]
    });
    fixture = TestBed.createComponent(CreateInscriptionDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
