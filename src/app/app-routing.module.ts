import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PayslipComponent } from './payslip/payslip.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';

const routes: Routes = [
    { path: '', pathMatch: 'full', redirectTo: 'payslip' },
    { path: 'payslip', component: PayslipComponent},
    { path: '**', pathMatch: 'full', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routableComponents = [
    PayslipComponent,
    PageNotFoundComponent,
    NavBarComponent,
];
