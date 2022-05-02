import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DelayCalibrationComponent } from './delay-calibration.component';


describe('DelayCalibrationComponent', () => {
  let component: DelayCalibrationComponent;
  let fixture: ComponentFixture<DelayCalibrationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DelayCalibrationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DelayCalibrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
