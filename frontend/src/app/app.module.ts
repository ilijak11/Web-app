import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserLoginComponent } from './user-login/user-login.component';
import { AdminLoginComponent } from './admin-login/admin-login.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { HttpClientModule } from '@angular/common/http';
import { AdminComponent } from './admin/admin.component';
import { RegisterUserComponent } from './register-user/register-user.component';
import { Router } from '@angular/router';
import { RegisterCompanyAdminComponent } from './register-company-admin/register-company-admin.component';
import { RegisterCompanyComponent } from './register-company/register-company.component';
import { UserComponent } from './user/user.component';
import { UserDisplayComponent } from './user-display/user-display.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { RegisterBankAccountsComponent } from './register-bank-accounts/register-bank-accounts.component';
import { RegisterStorageUnitsComponent } from './register-storage-units/register-storage-units.component';
import { RegisterCashRegistersComponent } from './register-cash-registers/register-cash-registers.component';
import { RegisterRequestComponent } from './register-request/register-request.component';
import { CompanyComponent } from './company/company.component';
import { CompanyFirstLoginComponent } from './company-first-login/company-first-login.component';
import { CompanyViewInformationComponent } from './company-view-information/company-view-information.component';
import { CompanyViewBankAccountsComponent } from './company-view-bank-accounts/company-view-bank-accounts.component';
import { CompanyViewStorageUnistComponent } from './company-view-storage-unist/company-view-storage-unist.component';
import { CompanyViewCashRegistersComponent } from './company-view-cash-registers/company-view-cash-registers.component';
import { ItemsAndServicesComponent } from './items-and-services/items-and-services.component';
import { AddItemComponent } from './add-item/add-item.component';
import { UpdateItemComponent } from './update-item/update-item.component';
import { OrderersComponent } from './orderers/orderers.component';
import { ItemCategoryComponent } from './item-category/item-category.component';
import { ItemCategoryViewComponent } from './item-category-view/item-category-view.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule } from '@angular/material/dialog';
import { ItemSelectDialogComponent } from './item-select-dialog/item-select-dialog.component';
import { CategoryDisplayComponent } from './category-display/category-display.component';
import { SubCategoryDisplayComponent } from './sub-category-display/sub-category-display.component';
import { UserProductViewComponent } from './user-product-view/user-product-view.component';
import { DiplayCompanyProductsComponent } from './diplay-company-products/diplay-company-products.component';
import { TableLayoutComponent } from './table-layout/table-layout.component';
import { TableLayoutObjectComponent } from './table-layout-object/table-layout-object.component';
import { TableLayoutObjectSectionComponent } from './table-layout-object-section/table-layout-object-section.component';
import { BillComponent } from './bill/bill.component';
import { BillItemComponent } from './bill-item/bill-item.component';
import { ReportComponent } from './report/report.component';
import { ViewBillDetailsComponent } from './view-bill-details/view-bill-details.component';
import { UserBillsComponent } from './user-bills/user-bills.component';
import { AdminViewRevenueComponent } from './admin-view-revenue/admin-view-revenue.component';
import { BillRestaurantComponent } from './bill-restaurant/bill-restaurant.component';
import { BillTableLayoutComponent } from './bill-table-layout/bill-table-layout.component';
import { BillTableLayoutSectionComponent } from './bill-table-layout-section/bill-table-layout-section.component';
import { BillTableComponent } from './bill-table/bill-table.component';
import { AdminDeactivateCompanyComponent } from './admin-deactivate-company/admin-deactivate-company.component';
import { CompanyPageComponent } from './company-page/company-page.component';

@NgModule({
  declarations: [
    AppComponent,
    UserLoginComponent,
    AdminLoginComponent,
    LandingPageComponent,
    AdminComponent,
    RegisterUserComponent,
    RegisterCompanyAdminComponent,
    RegisterCompanyComponent,
    UserComponent,
    UserDisplayComponent,
    ChangePasswordComponent,
    RegisterBankAccountsComponent,
    RegisterStorageUnitsComponent,
    RegisterCashRegistersComponent,
    RegisterRequestComponent,
    CompanyComponent,
    CompanyFirstLoginComponent,
    CompanyViewInformationComponent,
    CompanyViewBankAccountsComponent,
    CompanyViewStorageUnistComponent,
    CompanyViewCashRegistersComponent,
    ItemsAndServicesComponent,
    AddItemComponent,
    UpdateItemComponent,
    OrderersComponent,
    ItemCategoryComponent,
    ItemCategoryViewComponent,
    ItemSelectDialogComponent,
    CategoryDisplayComponent,
    SubCategoryDisplayComponent,
    UserProductViewComponent,
    DiplayCompanyProductsComponent,
    TableLayoutComponent,
    TableLayoutObjectComponent,
    TableLayoutObjectSectionComponent,
    BillComponent,
    BillItemComponent,
    ReportComponent,
    ViewBillDetailsComponent,
    UserBillsComponent,
    AdminViewRevenueComponent,
    BillRestaurantComponent,
    BillTableLayoutComponent,
    BillTableLayoutSectionComponent,
    BillTableComponent,
    AdminDeactivateCompanyComponent,
    CompanyPageComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule, 
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    NoopAnimationsModule,
    MatDialogModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
