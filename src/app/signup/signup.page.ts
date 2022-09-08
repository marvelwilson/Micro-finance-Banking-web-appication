import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NetworkService } from '../network.service';
import { AlertController } from '@ionic/angular';
import { NgxPrintModule } from 'ngx-print';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {
  items: any;
  users: any;
url = 'https://agilfinance.net/service/storage/app/public/';
  id: any;
  amount: any;

  dis = 'd-none';
  diss = 'd-none'
  edituser: any;
  sm: any;
  sums: any;
  sumer: any;
  thrift: any[];
  hold_items: any;
  rev = 'd-none';
  transID = '';
  hole: any;
  customers: any;
  branches: any;
  staff = '';
  cust = '';
  address: string;
  addr='';
  zeros: any;

  //edit fields inputs

  constructor(
    public router: Router,
    private Httpnetwork: NetworkService,
    public alertController: AlertController,
  ) {
    this.transHistory()
  }

  ngOnInit() {
  }


  backtohome() {
    this.router.navigate(['/home'])
  }



  modals(param, use) {
    let name = use.target.value
    var hold_items=this.hold_items
    this.sm = []
    if (param == 'transtype') {
      for (let i = 0; i < hold_items.length; i++) {
        const e = hold_items[i];
        if (e.transType == name) {
          this.sm.push(e)
          hold_items.push(e)
        } else if (name == e.staff_name) {
          this.sm.push(e)
          hold_items.push(e)

        }
      }
    } else if (param == 'Officer') {
      for (let i = 0; i < hold_items.length; i++) {
        const e = hold_items[i];
        if (name == e.staff_name) {
          this.sm.push(e)
          hold_items.push(e)

        }
      }
    } else if (param == 'acc_type') {
      for (let i = 0; i < hold_items.length; i++) {
        const e = hold_items[i];
        if ((e.accType.toLowerCase()) == (name.toLowerCase())) {
          this.sm.push(e)
          hold_items.push(e)

        }
      }
    }
    else if (param == 'reset') {
      this.sm = this.hold_items
    }
  }

  async revert(param) {
    var alert = await this.alertController.create({
      cssClass: 'text-center',
      message: "Loading.. <img src='assets/img/ajax_clock_small.gif'>"

    })
    if (param == 'reverse') {
      this.rev = 'd-block'
    } else if (param == 'run') {
      alert.present()

      let data = { 'id': this.transID }
      this.Httpnetwork.revert(data).subscribe((res: any) => {
        if (res.error) {
          alert.header = 'Failed'
          alert.message = res.error
          alert.buttons = ['OK']
          alert.present()
        } else {
          alert.header = 'Success!'
          alert.message = res.success
          alert.buttons = ['OK']
          alert.present()
          console.log(res)
          this.transHistory()
          this.hold_items = this.sm
          // this.hole=res.staffs


          var debit = 0;
          var credit = 0;
          // for (let i = 0; i < this.sm.length; i++) {
          //   const element = this.sm[i];
          //   if (element.transType == 'Deposit') {
          //     credit += Number(element.amount)
          //   } else if (element.transType == 'Withdraw') {
          //     debit += Number(element.amount)
          //   }
          // }
          this.sums = [{
            'credits': credit,
            'debits': debit,
            'balance': credit - debit,
          }]
          this.transHistory()
        }
      }, (error: any) => {

      })

    }
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
      this.Httpnetwork.searchSStatement(data).subscribe((res: any) => {
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

  async wtrw() {
    var alert = await this.alertController.create({
      header: 'Debit',
      message: "Debit in progress <img src='assets/img/ajax_clock_small.gif'>"

    })
    if (this.amount) {
      alert.present()
      var formData = new FormData()
      formData.set('amount', this.amount)
      formData.set('id', this.id)
      this.Httpnetwork.withdraw(formData).subscribe((res: any) => {
        if (res.error) {
          alert.header = 'Insufficients'
          alert.message = res.error
          alert.buttons = ['OK']
        } else {
          this.items = res
          alert.header = 'Debit'
          alert.message = 'Account has being Debited Successfully'
          alert.buttons = ['OK']
          this.amount = ''
          this.diss = 'd-none'
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
    this.id = e.target.value.split('h')[0]
    let custid = e.target.value.split('h')[1]
    let id = e.target.value.split('h')[2]
    var accType = e.target.value.split('h')[3]
     accType = accType.split(' ')[accType.split(' ').length-1]

     let modalsid;
    if (accType.toLocaleLowerCase()=='savings') {
      modalsid = document.getElementById('savings_'+id)
    }else{
      modalsid = document.getElementById('modalsid_'+id)
    }
   this.zeros = ['0','0','0','0'];
   this.zeros = this.zeros.splice(this.zeros.length-this.id.length,this.id.length)
   let addup ='';
   this.zeros.map((e)=>{
    addup+=e
   })
   this.zeros = addup+this.id

   modalsid.setAttribute('class',`modal fade show ${this.dis} `)

    for (let i = 0; i < this.hole.length; i++) {
      const e = this.hole[i];
      if (e.id == this.id) {
        this.staff = e
        for (let a = 0; a < this.branches.length; a++) {
          const eg = this.branches[a];
          if (e.address == eg.id) {
            this.addr = eg
          }
        }
      }
    }
    for (let i = 0; i < this.customers.length; i++) {
      let e = this.customers[i];
      if (custid == e.id) {
        this.cust = e
      }
    }
  }

  withdraw(e) {
    this.diss = 'd-block';
    this.id = e.target.value
  }

  async transHistory() {
    var alert = await this.alertController.create({
      header: 'Debit',
      message: "Debit in progress <img src='assets/img/ajax_clock_small.gif'>"

    })

    this.Httpnetwork.transHistory().subscribe((res: any) => {
      if (res.error) {
        alert.header = 'Not Found'
        alert.message = res.error
        alert.buttons = ['OK']
        alert.present()
      } else {
        this.sm = res.trans;
        this.hole = res.staffs;
        this.customers = res.customers;
        this.branches = res.branch;



        this.hold_items = this.sm

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

      }
    }, (error: any) => {

    })


    this.Httpnetwork.getThrift().subscribe((res: any) => {
      alert.remove()
      if (!res.error) {
        this.thrift = []
        for (let i = 0; i < res.length; i++) {
          if (res[i].acc_type == 'Thrift') {
            this.thrift.push(res[i])
          }
        }
      } else {
        alert.header = 'Failed'
        alert.message = res.error
        alert.buttons = ['OK']
        alert.present()
      }
    })

  }

  close(e) {
    this.dis = 'd-none';
    this.diss = 'd-none';
    this.rev = 'd-none';
   if (e) {
    let modalsid = document.getElementById('modalsid_'+e.target.value)
    modalsid.setAttribute('class',`modal fade show ${this.dis} `)
   }
  }


}

