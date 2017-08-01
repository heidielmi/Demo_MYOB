import { Injectable } from '@angular/core';

export interface IPaySlipDetails {
  fullName: string;
  payPeriod: string;
  grossIncome: number;
  incomeTax: number;
  netIncome: number;
  super: number;
}
export enum TaxRules {
  fixedBaseForBracket37Plus = 3572,
  fixedBaseForBracket80Plus = 17547,
  fixedBaseForBracket180Plus = 54547,
  taxRateForBracket37Plus = 0.325,
  taxRateForBracket80Plus = 0.37,
  taxRateForBracket180Plus = 0.45
}
@Injectable()
export class PayslipService {

  constructor() { }


  /**
  * getTotalNumberOfUsers - return get Total Number Of Users who have registered in the redcap_portal
  *
  * @return {Observable<number>}  return Angular2 Observable number
  */
   public CalculatePaySlipDetails(firstName: string, lastName: string ,
      annualSalary: number, superRate: number, paymentStartDate: string): IPaySlipDetails {
      const CalculatedPayPeriod = this.CalculatePayPeriod(paymentStartDate);
      const CalculatedGrossIncome = this.CalculateGrossIncome(annualSalary);
      const CalculatedIncomeTax = this.CalculateIncomeTax(annualSalary);
      const CalculatedNetIncome = this.CalculateNetIncome(CalculatedGrossIncome, CalculatedIncomeTax);
      const CalculatedSuper = this.CalculateSuper(CalculatedGrossIncome, superRate);
      return {
        'fullName': firstName + lastName,
        'payPeriod': CalculatedPayPeriod,
        'grossIncome': CalculatedGrossIncome,
        'incomeTax': CalculatedIncomeTax,
        'netIncome': CalculatedNetIncome,
        'super': CalculatedSuper
      }
  }
  /**
  * return calender month
  *
  */
  public CalculatePayPeriod(paymentStartDate: string): string {
    let payPeriod;
    switch (paymentStartDate) {
        case'01': {
            payPeriod = '01 January –31 January';
            break;
        }
        case'02': {
            payPeriod = '01 Feburary –28 Feburary';
            break;
        }
        case'03': {
            payPeriod = '01 March –31 March';
            break;
        }
        case'04': {
            payPeriod = '01 April –30 April';
            break;
        }
        case'05': {
            payPeriod = '01 May –31 May';
            break;
        }
        case'06': {
            payPeriod = '01 june –30 June';
            break;
        }
        case'07': {
            payPeriod = '01 July –31 July';
            break;
        }
        case'08': {
            payPeriod = '01 August –31 August';
            break;
        }
        case'09': {
          payPeriod = '01 September –30 September';
            break;
        }
        case'10': {
          payPeriod = '01 October –31 October';
            break;
        }
        case'11': {
            payPeriod = '01 November –30 November';
            break;
        }
        case'12': {
            payPeriod = '01 December –31 December';
            break;
        }
        default: {
            payPeriod = 'Unknown';
        }
      }
    return  payPeriod ;
  }

  /**
  * return grossIncome based on formula (annual salary) / 12
  * Note: All calculation results should be rounded to the whole dollar. If >= 50 cents round up to the next dollar, otherwise round down
  */
  public CalculateGrossIncome(annualSalary: number): number {
    let calculatedAnnualSalary =  annualSalary / 12 ;
    // now round the incomeTax to the nearest number
    calculatedAnnualSalary =  Math.round(calculatedAnnualSalary);
    return calculatedAnnualSalary;
  }
  /**
  * return IncomeTax based on the tax table
  * Note: All calculation results should be rounded to the whole dollar. If >= 50 cents round up to the next dollar, otherwise round down
  */
  public CalculateIncomeTax(annualSalary: number): number {
    let IncomeTax = 0;
    let salaryAboveBase = 0;
    if (annualSalary <= 18200) {
      // check if annual salary is less than $18,200 the IncomeTax will be 0
      IncomeTax = 0;
    } else if (annualSalary >= 18201 && annualSalary <= 37000) {
      //  if salary is between $18,201,$37,000, then 19c for each $over  $18,200
      salaryAboveBase = annualSalary - 18200
      IncomeTax = 0.19 * salaryAboveBase;
    } else if (annualSalary >= 37001 && annualSalary <= 80000) {
      //  if salary is between $37,001-­$80,000, then tax would be  $3,572 plus 32.5c for each $1 over $37,000
      salaryAboveBase = annualSalary - 37000
      IncomeTax = TaxRules.fixedBaseForBracket37Plus + (TaxRules.taxRateForBracket37Plus * salaryAboveBase);
    } else if (annualSalary >= 80001 && annualSalary <= 180000) {
      //  if salary is between $80,001  $180,000, then tax would be $17,547 plus 37c for each $1 over $80,000
      salaryAboveBase = annualSalary - 80000
      IncomeTax = TaxRules.fixedBaseForBracket80Plus + (TaxRules.taxRateForBracket80Plus * salaryAboveBase);
    } else if (annualSalary >= 180001) {
      //  if salary is $180,001 and over, then tax would be $54,547 plus 45c for each $1 over $180,000
      salaryAboveBase = annualSalary - 180000
      IncomeTax = TaxRules.fixedBaseForBracket180Plus + (TaxRules.taxRateForBracket180Plus * salaryAboveBase);
    }
    // now round the incomeTax per month to the nearest number
    IncomeTax =  Math.round(IncomeTax / 12);
    return IncomeTax;
  }
  /**
  * return NetIncome based on formula (gross income) ‐ (income tax)
  * Note: All calculation results should be rounded to the whole dollar. If >= 50 cents round up to the next dollar, otherwise round down
  *
  */
  public CalculateNetIncome(calculatedGrossIncome: number, CalculatedIncomeTax: number): number {
    let calculatedNetIncome =  calculatedGrossIncome - CalculatedIncomeTax ;
    // now round the incomeTax to the nearest number
    calculatedNetIncome =  Math.round(calculatedNetIncome);
    return calculatedNetIncome;
  }
  /**
  * return super based on formula (gross income) x (super rate)
  * Note: All calculation results should be rounded to the whole dollar. If >= 50 cents round up to the next dollar, otherwise round down
  *
  */
  public CalculateSuper(CalculatedGrossIncome: number, superRate: number): number {
    let calculatedSuper =  CalculatedGrossIncome * (superRate / 100) ;
    // now round the incomeTax to the nearest number
    calculatedSuper =  Math.round(calculatedSuper);
    return calculatedSuper;
  }
}
