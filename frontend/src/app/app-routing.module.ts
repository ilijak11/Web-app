import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminLoginComponent } from './admin-login/admin-login.component';
import { AdminViewRevenueComponent } from './admin-view-revenue/admin-view-revenue.component';
import { AdminComponent } from './admin/admin.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { CompanyFirstLoginComponent } from './company-first-login/company-first-login.component';
import { CompanyComponent } from './company/company.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { RegisterCompanyAdminComponent } from './register-company-admin/register-company-admin.component';
import { RegisterRequestComponent } from './register-request/register-request.component';
import { RegisterUserComponent } from './register-user/register-user.component';
import { UserBillsComponent } from './user-bills/user-bills.component';
import { UserLoginComponent } from './user-login/user-login.component';
import { UserComponent } from './user/user.component';

const routes: Routes = [
  {path: '', component: LandingPageComponent},
  {path: 'admin-login', component: AdminLoginComponent},
  {path: 'admin', component: AdminComponent},
  {path: 'user', component: UserComponent},
  {path: 'user/change-password', component: ChangePasswordComponent},
  {path: 'admin/change-password', component: ChangePasswordComponent},
  {path: 'company/change-password', component: ChangePasswordComponent},
  {path: 'company/company-first-login', component: CompanyFirstLoginComponent},
  {path: 'company', component: CompanyComponent},
  {path: 'user/bills', component: UserBillsComponent},
  {path: 'admin/report', component: AdminViewRevenueComponent},
  {path: 'admin/register-user', component: RegisterUserComponent},
  {path: 'admin/register-company', component: RegisterCompanyAdminComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
