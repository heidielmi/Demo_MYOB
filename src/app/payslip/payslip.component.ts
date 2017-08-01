import { Component, OnInit } from '@angular/core';
import { NgForm, FormGroup, FormBuilder, Validators} from '@angular/forms';
import { IPaySlipDetails, PayslipService } from '../shared/services/payslip/payslip.service';
import { NumberValidators } from '../shared/services/validators/validator.service';
import { DatePickerOptions, DateModel } from 'ng2-datepicker';
import { ExcelService } from '../shared/services/excel.service';

@Component({
  selector: 'ps-payslip',
  templateUrl: './payslip.component.html',
  styleUrls: ['./payslip.component.css']
})
export class PayslipComponent implements OnInit {
  paySlipDetails: IPaySlipDetails;
  paySlipDetailList: IPaySlipDetails[] = [];
  complexForm: FormGroup;
  date: DateModel;
  options: DatePickerOptions;
  constructor(fb: FormBuilder, private _payslipService: PayslipService, private _excelService: ExcelService) {
    this.complexForm = fb.group({
      'firstName': [null, Validators.required],
      'lastName': [null, Validators.required],
      'annualSalary': [null, Validators.compose([Validators.required, NumberValidators.floor(0)])],
      'superRate': [null, Validators.compose([Validators.required, NumberValidators.range(0, 50)])],
      'payPeriod': [null, Validators.required]
    });
    this.options = new DatePickerOptions();
  }
  submitForm(payslipForm: NgForm) {
    // empty the list and then fill it up with the latest values from form
    this.paySlipDetailList = [];
    this.paySlipDetails = this._payslipService.CalculatePaySlipDetails(this.complexForm.controls['firstName'].value,
    this.complexForm.controls['lastName'].value, this.complexForm.controls['annualSalary'].value,
    this.complexForm.controls['superRate'].value, this.date.month);
    this.paySlipDetailList.push(this.paySlipDetails);
    this.exportToExcel(this.paySlipDetailList);
  }

  ngOnInit() {
  }

  exportToExcel(payslipDetails: any[]) {
    this._excelService.exportAsExcelFile(payslipDetails, 'payslip');
  }

}
