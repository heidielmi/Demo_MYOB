import { TestBed, inject } from '@angular/core/testing';

import { PayslipService } from './payslip.service';

describe('PayslipService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PayslipService]
    });
  });

  it('should be created', inject([PayslipService], (service: PayslipService) => {
    expect(service).toBeTruthy();
  }));
  it('should be calculate gross income', inject([PayslipService], (service: PayslipService) => {
      let result = service.CalculateGrossIncome(60050);
      expect(result).toEqual(5004);
  })); 
  it('should be calculate pay period', inject([PayslipService], (service: PayslipService) => {
      let result = service.CalculatePayPeriod('03');
      expect(result).toEqual('01 March –31 March');
  })); 
  it('should be calculate IncomeTax', inject([PayslipService], (service: PayslipService) => {
      let result = service.CalculateIncomeTax(60050);
      expect(result).toEqual(922);
  })); 
  it('should be calculate NetIncome', inject([PayslipService], (service: PayslipService) => {
      let result = service.CalculateNetIncome(5004, 922);
      expect(result).toEqual(4082);
  })); 
  it('should be calculate super', inject([PayslipService], (service: PayslipService) => {
      let result = service.CalculateSuper(5004, 9);
      expect(result).toEqual(450);
  })); 
});
