import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'history',
    loadChildren: () => import('./signup/signup.module').then( m => m.SignupPageModule)
  },
  {
    path: 'funding',
    loadChildren: () => import('./forgotten/forgotten.module').then( m => m.ForgottenPageModule)
  },
  {
    path: 'customers',
    loadChildren: () => import('./customers/customers.module').then( m => m.CustomersPageModule)
  },
  {
    path: 'addstaff',
    loadChildren: () => import('./addstaff/addstaff.module').then( m => m.AddstaffPageModule)
  },
  {
    path: 'staff-list',
    loadChildren: () => import('./stafflist/stafflist.module').then( m => m.StafflistPageModule)
  },
  {
    path: 'custlist',
    loadChildren: () => import('./custlist/custlist.module').then( m => m.CustlistPageModule)
  },
  {
    path: 'pending',
    loadChildren: () => import('./pending/pending.module').then( m => m.PendingPageModule)
  },
  {
    path: 'addgroup',
    loadChildren: () => import('./addgroup/addgroup.module').then( m => m.AddgroupPageModule)
  },
  {
    path: 'mgtgroup',
    loadChildren: () => import('./mgtgroup/mgtgroup.module').then( m => m.MgtgroupPageModule)
  },
  {
    path: 'mgtpersonal',
    loadChildren: () => import('./mgtosusu/mgtosusu.module').then( m => m.MgtosusuPageModule)
  },
  {
    path: 'addbranch',
    loadChildren: () => import('./addbranch/addbranch.module').then( m => m.AddbranchPageModule)
  },
  {
    path: 'branchlist',
    loadChildren: () => import('./branchlist/branchlist.module').then( m => m.BranchlistPageModule)
  },
  {
    path: 'active-fixed',
    loadChildren: () => import('./afd/afd.module').then( m => m.AfdPageModule)
  },
  {
    path: 'create-fixed',
    loadChildren: () => import('./cfd/cfd.module').then( m => m.CfdPageModule)
  },
  {
    path: 'completed-fixed',
    loadChildren: () => import('./fixed/fixed.module').then( m => m.FixedPageModule)
  },
  {
    path: 'vendors',
    loadChildren: () => import('./vendors/vendors.module').then( m => m.VendorsPageModule)
  },
  {
    path: 'w2w',
    loadChildren: () => import('./w2w/w2w.module').then( m => m.W2wPageModule)
  },
  {
    path: 'exp',
    loadChildren: () => import('./exp/exp.module').then( m => m.ExpPageModule)
  },
  {
    path: 'inc',
    loadChildren: () => import('./inc/inc.module').then( m => m.IncPageModule)
  },
  {
    path: 'cexp',
    loadChildren: () => import('./cexp/cexp.module').then( m => m.CexpPageModule)
  },
  {
    path: 'cinc',
    loadChildren: () => import('./cinc/cinc.module').then( m => m.CincPageModule)
  },
  {
    path: 'accounting',
    loadChildren: () => import('./accounting/accounting.module').then( m => m.AccountingPageModule)
  },
  {
    path: 'boc',
    loadChildren: () => import('./boc/boc.module').then( m => m.BocPageModule)
  },
  {
    path: 'addpro',
    loadChildren: () => import('./addpro/addpro.module').then( m => m.AddproPageModule)
  },
  {
    path: 'new-loan',
    loadChildren: () => import('./new-loan/new-loan.module').then( m => m.NewLoanPageModule)
  },
  {
    path: 'apply-loan',
    loadChildren: () => import('./apply-loan/apply-loan.module').then( m => m.ApplyLoanPageModule)
  },
  {
    path: 'pending-loan',
    loadChildren: () => import('./pending-loan/pending-loan.module').then( m => m.PendingLoanPageModule)
  },
  {
    path: 'approve-loan',
    loadChildren: () => import('./approve-loan/approve-loan.module').then( m => m.ApproveLoanPageModule)
  },
  {
    path: 'disbursment',
    loadChildren: () => import('./disbursment/disbursment.module').then( m => m.DisbursmentPageModule)
  },
  {
    path: 'approve-disbursment',
    loadChildren: () => import('./approve-disbursment/approve-disbursment.module').then( m => m.ApproveDisbursmentPageModule)
  },
  {
    path: 'all-loans',
    loadChildren: () => import('./all-loans/all-loans.module').then( m => m.AllLoansPageModule)
  },
  {
    path: 'loan-details',
    loadChildren: () => import('./loan-details/loan-details.module').then( m => m.LoanDetailsPageModule)
  },
  {
    path: 'ongoing',
    loadChildren: () => import('./ongoing/ongoing.module').then( m => m.OngoingPageModule)
  },
  {
    path: 'pay-loan',
    loadChildren: () => import('./pay-loan/pay-loan.module').then( m => m.PayLoanPageModule)
  },
  {
    path: 'virtual-account',
    loadChildren: () => import('./virtual-account/virtual-account.module').then( m => m.VirtualAccountPageModule)
  },
  {
    path: 'accdash',
    loadChildren: () => import('./accdash/accdash.module').then( m => m.AccdashPageModule)
  },
  {
    path: 'remitance',
    loadChildren: () => import('./remitance/remitance.module').then( m => m.RemitancePageModule)
  },
  {
    path: 'interbank',
    loadChildren: () => import('./interbank/interbank.module').then( m => m.InterbankPageModule)
  },
  {
    path: 'recon',
    loadChildren: () => import('./recon/recon.module').then( m => m.ReconPageModule)
  },
  {
    path: 'tempcust',
    loadChildren: () => import('./tempcust/tempcust.module').then( m => m.TempcustPageModule)
  },
  {
    path: 'cashacc',
    loadChildren: () => import('./cashacc/cashacc.module').then( m => m.CashaccPageModule)
  },
  {
    path: 'banks',
    loadChildren: () => import('./banks/banks.module').then( m => m.BanksPageModule)
  },
  {
    path: 'fixedasset',
    loadChildren: () => import('./fixedasset/fixedasset.module').then( m => m.FixedassetPageModule)
  },
  {
    path: 'intangible',
    loadChildren: () => import('./intangible/intangible.module').then( m => m.IntangiblePageModule)
  },
  {
    path: 'capital',
    loadChildren: () => import('./capital/capital.module').then( m => m.CapitalPageModule)
  },
  {
    path: 'Regular-Fixed-Deposit',
    loadChildren: () => import('./rfd/rfd.module').then( m => m.RfdPageModule)
  },

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
