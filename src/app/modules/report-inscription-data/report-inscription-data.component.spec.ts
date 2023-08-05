import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportInscriptionDataComponent } from './report-inscription-data.component';

describe('ReportInscriptionDataComponent', () => {
  let component: ReportInscriptionDataComponent;
  let fixture: ComponentFixture<ReportInscriptionDataComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ReportInscriptionDataComponent]
    });
    fixture = TestBed.createComponent(ReportInscriptionDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
