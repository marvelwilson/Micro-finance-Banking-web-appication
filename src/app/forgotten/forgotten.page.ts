import { Component, NgModule, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NetworkService } from '../network.service';
import { AlertController } from '@ionic/angular';
import { NgxPrintModule } from 'ngx-print';

@Component({
  selector: 'app-forgotten',
  templateUrl: './forgotten.page.html',
  styleUrls: ['./forgotten.page.scss'],

})
export class ForgottenPage implements OnInit {
  items: any;
  url = 'https://agilfinance.net/service/storage/app/public/';
  id: any;
  amount: any;
  payment: any;
  display = 'd-none';
  dis = 'd-none';
  diss = 'd-none'
  edituser: any;
  sm: any;
  acc_dis = 'd-none'
  sums: any;
  custid: any;
  sumer: any;
  staff: any;
  permit = '';
  address: any;
  hold_items: any;
  pro_show = 'd-none'
  receipt='';

  //edit fields inputs

  constructor(
    public router: Router,
    private Httpnetwork: NetworkService,
    public alertController: AlertController,
  ) {
    this.savings()
  }

  ngOnInit() {
  }


  backtohome() {
    this.router.navigate(['/home'])
  }
  savings() {
    this.Httpnetwork.savings().subscribe((res: any) => {
      if (res == "error") {
        console.log("")
      } else {
        this.items = res;
        for (let index = 0; index < this.items.length; index++) {
          const element = this.items[index];
          this.staff = {

          }
          this.edituser = {
            'id': element.id,
            'passport': element.passport,
            'name': element.name,
            'email': element.email,
            'phone': element.phone,
            'gender': element.gender,
            'signature': element.signature,
            'acc_type': element.acc_type,
            'wallet': element.wallet,
            'acc_num': element.acc_num,
            'avn': element.avn,
            'balance': element.balance,
            'sub_acc': element.sub_acc_type,
            'dob': element.dob,
            'address': element.address,
            'status': element.status,
          }

          // this.cv=e.target.value
        }
      }
    }, (error: any) => {
      console.log("Please Check Your Internet Connect")
    })
  }

  //toggle receipt upload
  receipts(e) {
    if (e.target.value == 'transfer') {
      this.pro_show = 'd-block';
    } else if (e.target.value == 'cash') {
      this.pro_show = 'd-none';
    }
  }
  
  //upload receipt
  provider(e) {
    this.receipt = e.target.files[0]
  }
  
  async SearchID(data) {
    var alert = await this.alertController.create({
      header: '',
      message: '',
      buttons: ['OK'],
    })
    if (data.from == '') {
      alert.header = "Required";
      alert.message = "From field cannot be empty"
      alert.present()
    } else if (data.to == '') {
      alert.header = "Required";
      alert.message = "From field cannot be empty"
      alert.present()
    } else {
      alert.header = "Validating";
      alert.message = "Validating Search <img src='assets/img/ajax_clock_small.gif'>"
      alert.buttons = [""]
      alert.present()
      data['id'] = this.custid
      this.Httpnetwork.searchStatement(data).subscribe((res: any) => {
        if (!res.error) {
          this.sm = res
          this.sumer = `${data.from}----${data.to}`;

          alert.header = "Found";
          alert.message = "Validation Successful"
          alert.buttons = ["OK"]
          alert.present()
          var debit = 0;
          var credit = 0;
          for (let i = 0; i < this.sm.length; i++) {
            const element = this.sm[i];
            if (element.transType == 'Deposit') {
              credit += Number(element.amount)
            } else if (element.transType == 'Withdraw') {
              debit += Number(element.amount)

            }
          }
          this.sums = [{
            'credits': credit,
            'debits': debit,
            'balance': credit - debit,
          }]
        } else {
          alert.header = "Not Found";
          alert.message = res.error
          alert.buttons = ["OK"]
          alert.present()
        }
      }, (error: any) => {

      })
    }
  }

  fund(e) {
    this.acc_dis = 'd-block';
    for (let index = 0; index < this.items.length; index++) {
      const element = this.items[index];
      if (element.id == e.target.value) {
        this.edituser = {
          'id': element.id,
          'userid': element.id,
          'passport': element.passport,
          'name': element.name,
          'email': element.email,
          'phone': element.phone,
          'gender': element.gender,
          'signature': element.signature,
          'acc_type': element.acc_type,
          'sub_acc': element.sub_acc_type,
          'wallet': element.wallet,
          'acc_num': element.acc_num,
          'avn': element.avn,
          'balance': element.balance,
          'dob': element.dob,
          'address': element.address,
          'status': element.status,
        }

      }

      // this.cv=e.target.value
    }
  }
  async Search(data) {
    var alert = await this.alertController.create({
      header: '',
      message: '',
      buttons: ['OK'],

    })
    if (data.search == '') {
      alert.header = "Required";
      alert.message = "Search field cannot be empty"
      alert.present()
    } else if (data.search_type == '') {
      alert.header = "Required";
      alert.message = "Search Type Option cannot be empty"
      alert.present()
    } else {
      alert.header = "Validating";
      alert.message = "Validating Search <img src='assets/img/ajax_clock_small.gif'>"
      alert.buttons = [""]
      alert.present()
      this.Httpnetwork.searchSavings(data).subscribe((res: any) => {
        if (!res.error) {
          this.items = res
          alert.header = "Found";
          alert.message = "Validation Successful"
          alert.buttons = ["OK"]
          alert.present()
        } else {
          alert.header = "Not Found";
          alert.message = res.error
          alert.buttons = ["OK"]
          alert.present()
          this.savings()
        }
      }, (error: any) => {

      })
    }
  }

  async depo() {
    var alert = await this.alertController.create({
      header: 'Credit',
      message: "Crediting <img src='assets/img/ajax_clock_small.gif'>"

    })
    if (this.amount || this.payment != 'undefined') {
      alert.present()
      var formData = new FormData()
      formData.append('amount', this.amount)
      formData.append('payment', this.payment)
      formData.append('receipt', this.receipt)
      formData.append('id', this.id)
      this.Httpnetwork.deposit(formData).subscribe((res: any) => {
        if (res.error) {
          alert.header = 'Insufficients'
          alert.message = res.error
          alert.buttons = ['OK']
        } else {
          this.items = res
          alert.header = 'Credited'
          alert.message = 'Account has being Credited Successfully'
          alert.buttons = ['OK']
          this.amount = ''
          this.dis = 'd-none'
        }
      }, (error: any) => {

      })
      this.amount = ''
      this.payment = ''
    } else {
      alert.header = "Invalid"
      alert.message = "Invalid Amount or In Payments"
      alert.buttons = ['OK']
      alert.present()
    }
  }
  async wtrw() {
    var alert = await this.alertController.create({
      header: 'Debit',
      message: "Debit in progress <img src='assets/img/ajax_clock_small.gif'>"

    })
    if (this.amount) {
      alert.present()
      var formData = new FormData()
      formData.append('amount', this.amount)
      formData.append('id', this.id)
      formData.append('permited', this.permit);
      this.Httpnetwork.withdraw(formData).subscribe((res: any) => {
        if (res.error) {
          alert.header = 'Insufficients'
          alert.message = res.error
          alert.buttons = ['OK']
        } else if (res.due) {
          var byadmin = res.user == 'admin' ? '<br> Or Click Confirm To Bypass Restriction ' + res.percent : '';
          alert.header = 'Policy Restrictions'
          alert.message = res.due + byadmin
          alert.buttons = [
            {
              text: 'Cancle',
              role: 'cancle',
              cssClass: 'text-primary',
            },
            res.user == 'admin' ?
              {
                text: 'Confirm',
                role: 'confirm',
                cssClass: 'text-info',
                handler: () => {
                  this.permit = 'success'
                  this.wtrw()
                }

              }
              : '',
          ]
        } else {
          this.items = res
          alert.header = 'Debit'
          alert.message = 'Account has being Debited Successfully'
          alert.buttons = ['OK']
          this.amount = ''
          this.diss = 'd-none'
          this.permit = ''

        }
      }, (error: any) => {

      })
    } else {
      alert.header = "Invalid"
      alert.message = "Invalid Amount"
      alert.buttons = ['OK']
      alert.present()
    }
  }
  deposit(e) {
    this.dis = 'd-block'
    this.id = e.target.value
  }

  withdraw(e) {
    this.diss = 'd-block';
    this.id = e.target.value
  }

  async view(e) {
    var alert = await this.alertController.create({
      header: 'Debit',
      message: "Debit in progress <img src='assets/img/ajax_clock_small.gif'>"

    })

    var id = e.target.value;
    this.custid = id;
    this.Httpnetwork.statement(id).subscribe((res: any) => {
      if (res.error) {
        alert.header = 'Not Found'
        alert.message = res.error
        alert.buttons = ['OK']
        alert.present()
      } else {
        this.sm = res.his;
        this.hold_items = this.sm
        this.edituser = res.customer;
        this.staff = res.officer
        this.address = res.address
        this.address = `No.${this.address.number+' '+this.address.address+' '+this.address.state}`
        var debit = 0;
        var credit = 0;
        for (let i = 0; i < this.sm.length; i++) {
          const element = this.sm[i];
          if (element.transType == 'Deposit') {
            credit += Number(element.amount)
          } else if (element.transType == 'Withdraw') {
            debit += Number(element.amount)
          }
        }
        this.sums = [{
          'credits': credit,
          'debits': debit,
          'balance': credit - debit,
        }]
        this.display = 'd-block';

      }
    }, (error: any) => {

    })

  }

  modals(param, use) {
    let name = use.target.value
    this.sm = []
    if (param == 'transtype') {
      for (let i = 0; i < this.hold_items.length; i++) {
        const e = this.hold_items[i];
        if (e.transType == name) {
          this.sm.push(e)
        } else if (name == e.staff_name) {
          this.sm.push(e)
        }
      }
    }  else if (param == 'acc_type') {
      for (let i = 0; i < this.hold_items.length; i++) {
        const e = this.hold_items[i];
        if ((e.accType.toLowerCase()) == (name.toLowerCase())) {
          this.sm.push(e)
        }
      }
    }
    else if (param == 'reset') {
      this.sm = this.hold_items
    }

  }
  close() {
    this.display = 'd-none';
    this.dis = 'd-none';
    this.diss = 'd-none';
    this.acc_dis = 'd-none'


  }


}
