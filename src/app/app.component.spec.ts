import { TestBed, async } from '@angular/core/testing';

import { AppComponent } from './app.component';
import { NgForm, FormGroup, FormBuilder, Validators} from '@angular/forms';
import { IPaySlipDetails, PayslipService } from './shared/services/payslip/payslip.service';
import { NumberValidators } from './shared/services/validators/validator.service';
import { DatePickerOptions, DateModel } from 'ng2-datepicker';
import { ExcelService } from './shared/services/excel.service';
import { routableComponents, AppRoutingModule } from './app-routing.module';
import { RouterTestingModule } from '@angular/router/testing';

import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { ToolTipModule } from 'angular2-tooltip';
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
describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: ExcelService, useClass: MockExcelService },
        { provide: PayslipService, useClass: MockPayslipService },
        FormBuilder,
      ],
      imports: [
        RouterTestingModule, BrowserModule, ToolTipModule, FormsModule, ReactiveFormsModule, DatePickerModule
      ],
      declarations: [
        AppComponent, routableComponents
      ],
    }).compileComponents();
  }));

  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));


  it(`should have as title 'ps' (for payslip)`, async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('ps');
  }));
});
