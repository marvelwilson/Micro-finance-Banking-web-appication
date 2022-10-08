import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { NetworkService } from '../network.service';


@Component({
  selector: 'app-accdash',
  templateUrl: './accdash.page.html',
  styleUrls: ['./accdash.page.scss'],
})
export class AccdashPage implements OnInit {
  assets = [
    'Cash at bank',
    'Cash at hand',
    'Account receivable',
    'Loan receivable',
    'Loan interest receivable',
    'Fixed assets, accumulated depreciation',
    'Fixed assets, at cost',
    'Intangible assets, accumulated amortization',
    'Intangible assets, at cost'
  ]

  incomes = [
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
  liabilties = [
    'Account payable',
    'Regular Fixed contributions',
    'Personal Contribution',
    'Group Contribution',
    'Regular Savings',
    '365 Savings',
    'Target Savings',
    'Fixed Savings',

  ]
  expenses = [
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
    'Fixed assets, accumulated depreciation',
    'Intangible assets, accumulated amortization',
    'Membership Interest',
    'Vehicle & Gen Maintenance',
    'Software, Website Maintenance',
    'Bad Debit',
    'Miscellaneous',
  ]

  equities = [
    'Retained earnings',
    'Capital accounts',
  ]

  main_assets: any;
  assets_total: any;
  asset_total_sumable: number;

  lia_total: any;
  main_lia: any[];
  lia_total_sumable: number;

  group: number;
  equity: any;
  equity_amount: any;

  income_amount: any[];


  expenses_amount: any[];

  dexp_amount: any;
  dinc_amount: any;
  inc_amount = 0;
  exp_amount = 0;
  nets=0;

 //filter var
  
  filter={from:'',to:''}

  constructor(
    public router: Router,
    private xhr: NetworkService,
    public alertController: AlertController,
  ) {
    this.getgroup()
    this.accounting()
    this.inc()
    this.exp()
  }

  ngOnInit() {
  }

  FormatNumber(value) {
    if (value == '') {
      return value
    } else {
      return value.toLocaleString()
    }
  }

  getgroup() {

    this.xhr.getGroupsAmount(this.filter).subscribe((res: any) => {
      let me = 0;
      for (let i = 0; i < res.length; i++) {
        me += Number(res[i].wallet);
        me += Number(res[i].balance);
      }
      this.group = me;

    })
  }

  async accounting() {
    var alert = await this.alertController.create({
      message: "Loading <img src='assets/img/ajax_clock_small.gif'>",
      backdropDismiss: false,
    })
    alert.present();
    this.xhr.accounting(this.filter).subscribe((res: any) => {
      if (res.error) {
        alert.header = 'Failed'
        alert.message = res.error,
          alert.buttons = ['OK']
        alert.present()
      } else {
        let main = res.assets_properties

        // Assets Properties
        let assets_holders = [];
        let assets_amounts = []
        let castatbank = 0
        let castathand = 0
        let receivable = 0
        let loan_re = 0
        let loan_inrec = 0
        let fasset = 0
        let dfasset = 0
        let iasset = 0
        let aiasset = 0


        //asset cash at bank
        for (let i = 0; i < main.cash_at_bank.length; i++) {
          if (main.cash_at_bank[i].acc_type == 'bank') {
            castatbank += Number(main.cash_at_bank[i].amount)
          } else if (main.cash_at_bank[i].acc_type == 'receivable') {
            receivable += Number(main.cash_at_bank[i].amount)
          }

        }

        //asset cash at hand
        for (let i = 0; i < main.cash_at_hand.length; i++) {
          castathand += Number(main.cash_at_hand[i].wallet)
        }

        //asset Loan Receivable
        for (let i = 0; i < main.loan_rec.length; i++) {
          loan_re += Number(main.loan_rec[i].loan_amount)
          loan_inrec += Number(main.loan_rec[i].interest)

        }

        //asset Loan Receivable
        for (let i = 0; i < main.assets.length; i++) {
          if (main.assets[i].asset_type == 'fasset') {
            fasset += Number(main.assets[i].acc_cost)
            dfasset += Number(main.assets[i].de_cost)
          } else if (main.assets[i].asset_type == 'iasset') {
            iasset += Number(main.assets[i].acc_cost)
            aiasset += Number(main.assets[i].de_cost)
          }

        }
        assets_amounts.push(castatbank, castathand, receivable, loan_re, loan_inrec, fasset, dfasset, iasset, aiasset)

        // Asset Object Values
        let asset_total = 0
        let asset_total_sumable = 0

        for (let i = 0; i < this.assets.length; i++) {
          const e = {
            'name': this.assets[i],
            'amount': assets_amounts[i]
          };
          assets_holders.push(e)
          asset_total_sumable += assets_amounts[i]
          asset_total += assets_amounts[i]

        }
        this.assets_total = this.FormatNumber(asset_total)
        this.asset_total_sumable = asset_total_sumable
        this.main_assets = assets_holders


        //Liabilities
        let lia_holders = [];
        let lia_amounts = []
        let payable = 0
        let regular = 0
        let A356 = 0
        let target = 0
        let fixed = 0
        let personal = 0
        let cregular = 0


        //asset cash at bank
        for (let i = 0; i < main.cash_at_bank.length; i++) {
          if (main.cash_at_bank[i].acc_type == 'payable') {
            payable += Number(main.cash_at_bank[i].amount)
          }

        }


        //Lia Account Types
        for (let i = 0; i < res.liabilities.length; i++) {
          const a = res.liabilities[i]
          if (a.acc_type == 'savings') {
            if (a.sub_acc_type == 'regular') {
              regular += Number(a.balance)
            } else if (a.sub_acc_type == '365') {
              A356 += Number(a.balance)
            } else if (a.sub_acc_type == 'target') {
              target += Number(a.balance)
            } else if (a.sub_acc_type == 'fixed') {
              fixed += Number(a.balance)
            }
          } else if (a.acc_type == 'contribution') {
            if (a.sub_acc_type == 'personal') {
              personal += Number(a.wallet)
              personal += Number(a.balance)

            } else if (a.sub_acc_type == 'Regular Fixed') {
              cregular += Number(a.wallet)
              cregular += Number(a.balance)

            }
          }

        }
        //get group total amounts

        lia_amounts.push(payable, cregular, personal, this.group, regular, A356, target, fixed)

        //lia Object values
        let lia_total = 0
        let lia_total_sumable = 0

        for (let i = 0; i < this.liabilties.length; i++) {
          const e = {
            'name': this.liabilties[i],
            'amount': lia_amounts[i]
          };
          lia_holders.push(e)
          lia_total_sumable += lia_amounts[i]
          lia_total += lia_amounts[i]
        }

        this.lia_total = this.FormatNumber(lia_total)
        this.lia_total_sumable = lia_total_sumable
        this.main_lia = lia_holders

        //Equity
        let equities = []

        let cap_amount = 0
        for (let i = 0; i < main.cash_at_bank.length; i++) {
          const a = main.cash_at_bank[i]
          if (a.acc_type == 'capital') {
            cap_amount += Number(a.amount)
          }
        }

        let Retained = this.asset_total_sumable - (this.lia_total_sumable + cap_amount)
        this.equity_amount = this.FormatNumber(Retained)
        equities.push(Retained, cap_amount)
        let equity = [];
        for (let i = 0; i < this.equities.length; i++) {
          const e = {
            'name': this.equities[i],
            'amount': equities[i],
          }
          equity.push(e)
        }
        this.equity = equity
        alert.remove()

        //nets
        let nets = this.inc_amount-this.exp_amount>0?this.inc_amount-this.exp_amount:this.exp_amount-this.inc_amount
        this.nets = this.FormatNumber(nets)
      }
    }, (error: any) => {
      console.log("Please Check Your Internet Connect")
    })


  }

  inc() {
    //Income Management
    this.income_amount = []
    this.xhr.getall_incomes(this.filter).subscribe((res: any) => {
      for (let i = 0; i < res.length; i++) {
        let a = {
          'amount': res[i],
          'name': this.incomes[i],

        }
        this.inc_amount += Number(res[i])
        this.income_amount.push(a)

      }
      this.dinc_amount = this.FormatNumber(this.inc_amount)
      // console.log()
    }, (error: any) => {
    })

  }

  exp(){
     //Expense Management
     this.expenses_amount = []
     this.xhr.getall_expenses(this.filter).subscribe((res: any) => {
       for (let i = 0; i < res.length; i++) {
         let a = {
           'amount': res[i],
           'name': this.expenses[i],
         }
         this.expenses_amount.push(a)
         this.exp_amount += Number(res[i])
 
       }
       this.dexp_amount = this.FormatNumber(this.exp_amount)
     }, (error: any) => {
       // alert.message='Please Check Your Internet Connect';
       // alert.buttons=['OK']
       // alert.present()
       // this.router.navigate(['/home'])
 
     })
 
 
  }

 async filterBtn(data) {
  this.filter = data
  this.exp_amount=0
  this.inc_amount=0
  this.getgroup()
  this.accounting()
  this.inc()
  this.exp()
 }
 async resetFilterBtn(){
  this.filter = {from:'', to:''}
  this.exp_amount=0
  this.inc_amount=0
  this.getgroup()
  this.accounting()
  this.inc()
  this.exp()
 }


}
