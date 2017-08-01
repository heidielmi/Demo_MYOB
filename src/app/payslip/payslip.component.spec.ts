import { async, ComponentFixture, TestBed, inject} from '@angular/core/testing';
import { PayslipComponent } from './payslip.component';
import { NgForm, FormGroup, FormBuilder, Validators} from '@angular/forms';
import { IPaySlipDetails, PayslipService } from '../shared/services/payslip/payslip.service';
import { NumberValidators } from '../shared/services/validators/validator.service';
import { DatePickerOptions, DateModel } from 'ng2-datepicker';
import { ExcelService } from '../shared/services/excel.service';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { DatePickerModule } from 'ng2-datepicker';
class MockExcelService {
   public exportAsExcelFile(json: any[], excelFileName: string): void {
   }
  public  saveAsExcelFile(buffer: any, fileName: string): void  {
  }
}
class MockPayslipService {
   public CalculatePaySlipDetails(firstName: string, lastName: string ,
      annualSalary: number, superRate: number, paymentStartDate: string): IPaySlipDetails {
        return {
          'fullName': 'David Rudd',
          'payPeriod': '01 March –31 March',
          'grossIncome': 5004,
          'incomeTax': 922,
          'netIncome': 4082,
          'super': 450
        }
   }
}
describe('PayslipComponent', () => {
  let component: PayslipComponent;
  let fixture: ComponentFixture<PayslipComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: ExcelService, useClass: MockExcelService },
        { provide: PayslipService, useClass: MockPayslipService },
        FormBuilder,
        PayslipComponent
      ],
      imports: [
       FormsModule, ReactiveFormsModule, DatePickerModule
     ],
      declarations: [ PayslipComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PayslipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  //   component.date =  {
  //     day: 'string',
  //   month: 'string',
  //   year: 'string',
  //  formatted: 'string',
  //  momentObj : null
  //   };
      fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
  it('Should generate the payslip-result-details when user click Generate Payslip button', inject([PayslipComponent],
    (PayslipComponent) => {
    PayslipComponent.date =  {
      month: 'test month'
    };
    PayslipComponent.submitForm();
    const result = [{
      'fullName': 'David Rudd',
      'payPeriod': '01 March –31 March',
      'grossIncome': 5004,
      'incomeTax': 922,
      'netIncome': 4082,
      'super': 450
    }];
    expect(PayslipComponent.paySlipDetailList).toEqual (result);
   }));

   it('Should call the pay-slip-result-excel service when user click Generate Payslip button', inject([PayslipComponent, ExcelService],
     (PayslipComponent, srv) => {
     PayslipComponent.date =  {
       month: 'test month'
     };
     spyOn(srv, 'exportAsExcelFile');
      PayslipComponent.submitForm();
     expect(srv.exportAsExcelFile).toHaveBeenCalled();
    }));

    it('Should import the pay-slip-result-excel file when user click Generate Payslip button', inject([PayslipComponent, ExcelService],
      (PayslipComponent, srv) => {
      PayslipComponent.date =  {
        month: 'test month'
      };
      spyOn(srv, 'exportAsExcelFile');
       PayslipComponent.exportToExcel();
      expect(srv.exportAsExcelFile).toHaveBeenCalled();
     }));
});
