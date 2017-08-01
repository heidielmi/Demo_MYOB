import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { AppComponent } from './app.component';
import { routableComponents, AppRoutingModule } from './app-routing.module';
import { ToolTipModule } from 'angular2-tooltip';
import { PayslipService } from './shared/services/payslip/payslip.service';
import { ExcelService } from './shared/services/excel.service';
import { DatePickerModule } from 'ng2-datepicker';

@NgModule({
  declarations: [
    AppComponent,
    routableComponents
  ],
  imports: [
    AppRoutingModule, BrowserModule, ToolTipModule, FormsModule, ReactiveFormsModule, DatePickerModule
  ],
  providers: [PayslipService, ExcelService],
  bootstrap: [AppComponent]
})
export class AppModule { }
