import { formatNumber } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular'; 
import { NetworkService } from '../network.service';

@Component({
  selector: 'app-accounting',
  templateUrl: './accounting.page.html',
  styleUrls: ['./accounting.page.scss'],
})
export class AccountingPage implements OnInit {
  sm:any;
  inc:any;
  income_amount: any;
  expenses_amount: any;
  dexp_amount: any;
  dinc_amount: any;
  constructor(
    public alertController : AlertController,
    public xhr : NetworkService,
    public router : Router,

  ) { 
   
    this.Inc_Exp();
    this.inc = [
      'Personal Contribution Charges',
      'Group Contribution Charges',
      'Regular Fixed Contribution Charges',
      'Insurance Fee',
      'Verification Fee',
      'Interest On Loan',
      'SMS Charges',
      'Vitual Wallet Inter Bank Charges',
      'Membership Dues',
      'Registeration Fee',
      'Inter Bank Charges',
      'Overdraft Charges',
      'Airtime, Data & Satelite Cashback',
    ]
    this.sm = [
      'Salaries & Wages',
      'Employee Commission',
      'Transportation',
      'Fuel for Power and Vechicle',
      'Airtime & Data Internet',
      'Printing, Design & Photograph',
      'Employee Benefits',
      'Furniture & Equipment',
      'Insurance',
      'Debit Recovery Expenses',
      'Maintenance & Repair',
      'Office & Stationary supplies',
      'Bank Account Maintenance fee',
      'Legal Fee',
      'Payroll Taxes',
      'Office Rent',
      'Research & Developement',
      'Utility bill',
      'Advertising & Marketing',
      'Travel',
      'Membership Interest',
      'Vehicle & Gen Maintenance',
      'Software, Website Maintenance',
      'Bad Debit',
      'Miscellaneous',
    ]
  }

  ngOnInit() {
  }
  backtohome(){
    this.router.navigate(['/home'])
  }
  
  FormatNumber(value){
    if (value=='') {
      return value
    }else{
      return value.toLocaleString()
    }
  }
async Inc_Exp(){
  var alert = await this.alertController.create({
    message:"Loading <img src='assets/img/ajax_clock_small.gif'>",
    backdropDismiss:false,
    cssClass:'text-center'


  })
  alert.present();
  this.xhr.getall_incomes().subscribe((res:any)=>{
   alert.remove()
   let dinc_amount =0;
  this.income_amount=[]
  for (let i = 0; i < res.length; i++) {
      let a = {
        'amount':res[i],
        'type':this.inc[i],

      }
      this.income_amount.push(a)
      dinc_amount+=res[i]
      
  }
   this.dinc_amount=this.FormatNumber(dinc_amount)
  },(error:any)=>{
    alert.message='Please Check Your Internet Connect';
    alert.buttons=['OK']
    alert.present()
    this.router.navigate(['/home'])
  })
  this.xhr.getall_expenses().subscribe((res:any)=>{
    let dexp_amount = 0;
    this.expenses_amount=[]
    for (let i = 0; i < res.length; i++) {
        let a = {
          'amount':res[i],
          'type':this.sm[i],
  
        }
        this.expenses_amount.push(a)
         dexp_amount+=res[i]
    }
  this.dexp_amount=this.FormatNumber(dexp_amount)
   },(error:any)=>{
    // alert.message='Please Check Your Internet Connect';
    // alert.buttons=['OK']
    // alert.present()
    // this.router.navigate(['/home'])

   })

}
 
}
