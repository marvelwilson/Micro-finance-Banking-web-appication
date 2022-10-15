import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { NetworkService } from '../network.service';

@Component({
  selector: 'app-mgtosusu',
  templateUrl: './mgtosusu.page.html',
  styleUrls: ['./mgtosusu.page.scss'],
})
export class MgtosusuPage implements OnInit {
  bal = [0, 1];
  items: any;
  staffname = ''
  url = 'https://agilfinance.net/service/storage/app/public/';
  id: any;
  amount: any;
  payment: any;
  acc_num: any;
  receipt = '';
  pro_show = 'd-none'
  users = 'd-none'
  display = 'd-none';
  dis = 'd-none';
  diss = 'd-none'
  disadd = 'd-none'
  disdel = 'd-none'
  edituser: any;
  sm: any;
  acc_dis = 'd-none'
  sums: any;
  custid: any;
  sumer: any;
  staff: any;
  permit = '';
  picked = '';
  elem = '';
  shuffleNumbers: any;
  already: any;
  re_pre: string;
  recpre = 'd-none';
  disser: string;
  od: string;
  his: any;
  cashIn: any[];
  zeros: any;
  depositAmount: any;
  todaydate: any;


  //edit fields inputs

  constructor(
    public router: Router,
    private Httpnetwork: NetworkService,
    public alertController: AlertController,
  ) {
    this.getPersonal()
  }

  ngOnInit() {
  }


  backtohome() {
    this.router.navigate(['/home'])
  }

  reset(e) {
    this.disser = 'd-block';
    this.id = e.target.value
  }
  async edits(id) {
    var alert = await this.alertController.create({
      backdropDismiss: true,
      cssClass: 'text-center',
      message: "Loading <img src='assets/img/ajax_clock_small.gif'>"
    })
    alert.present()
    var formdata = new FormData()
    formdata.set('amount', this.amount)
    formdata.set('id', this.id)

    this.Httpnetwork.reset(formdata).subscribe((res: any) => {
      if (res.error) {
        alert.header = 'Invalid'
        alert.message = res.error
        alert.buttons = ['OK']
        alert.present()
      } else {
        alert.header = 'Success'
        alert.message = res.success
        alert.buttons = ['OK']
        alert.present()
        this.users = 'd-block';
        this.items = res.all
        alert.remove()
      }
    }, (error: any) => {

    })
  }
  async getPersonal() {
    var alert = await this.alertController.create({
      backdropDismiss: true,
      cssClass: 'text-center',
      message: "Loading <img src='assets/img/ajax_clock_small.gif'>"


    })
    alert.present()
    this.Httpnetwork.getPersonal('personal').subscribe((res: any) => {
      if (res.error) {
        alert.header = 'Invalid'
        alert.message = res.error
        alert.buttons = ['OK']
        alert.present()
      } else {

        alert.remove()
        this.items = res.save;
        this.his = res.his;
        this.todaydate = res.todaysdate;

        for (let index = 0; index < this.items.length; index++) {
          const element = this.items[index];
          this.staff = {

          }
          this.edituser = {
            'id': element.id,
            'passport': element.passport,
            'name': element.name,
            'days': element.days,
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
            'credits': element.credits,
            'rate': element.rate,
            'm_d': element.m_d,
            'o_d': element.o_d,
            'debit': element.debit,
            'circle_start': element.circle_start,
          }

          // this.cv=e.target.value
        }
      }
    }, (error: any) => {
      console.log("Please Check Your Internet Connect")
    })
  }
  async SearchID(data) {
    var alert = await this.alertController.create({
      backdropDismiss: true,
      cssClass: 'text-center',
      buttons: ['OK'],
    })
    if (data.search == '') {
      alert.header = "Required";
      alert.message = "Search cannot be empty"
      alert.present()
    } else {
      alert.message = "Validating Search <img src='assets/img/ajax_clock_small.gif'>"
      alert.buttons = [""]
      alert.present()
      data['id'] = this.custid
      this.Httpnetwork.SearchPersonal(data).subscribe((res: any) => {
        if (!res.error) {
          this.items = res
          alert.header = "Found";
          alert.message = "Validation Successful"
          alert.buttons = ["OK"]
          alert.present()
        } else {
          this.items = res.users
          alert.header = "Not Found";
          alert.message = res.error
          alert.buttons = ["OK"]
          alert.present()
        }
      }, (error: any) => {

      })



    }
  }
  async fund(e) {
    const alert = await this.alertController.create({
      message: "loading <img src='assets/img/ajax_clock_small.gif'>",
      backdropDismiss: true,
      cssClass: 'text-center'

    })
    alert.present()
    this.Httpnetwork.off_gb(e.target.value).subscribe((res: any) => {
      var runing = 0;
      var available = 0;
      for (let i = 0; i < res.members.length; i++) {
        const element = res.members[i];
        runing += Number(element.balance)
        available += Number(element.wallet)


      }

     
      //Cash In history
      let cashIn = []
    let userdate = this.edituser.circle_start.split('-')[0]+'-'+this.edituser.circle_start.split('-')[1]
      for (let i = 0; i < this.his.length; i++) {
        const element = this.his[i];
        let hisdate = element.created_at.split(' ')[0]
        hisdate = hisdate.split('-')[0]+'-'+hisdate.split('-')[1]

        if (userdate<=hisdate && (e.target.value == element.customerid && element.staff_name !== 'Head Office')) {
        
          hisdate = element.created_at.split(' ')[0]
          hisdate = hisdate.split('-')[2]+'/'+hisdate.split('-')[1]
          element.created_at = hisdate
          cashIn.push(element)

        }
      }
      this.cashIn = cashIn
      this.depositAmount = this.cashIn.length>0?this.cashIn[cashIn.length-1].amount:0;
      this.zeros = res.officer.id;
      

      this.bal = [runing, available];
      this.staffname = res.officer.name;
      alert.remove()
    }, (error: any) => {
      console.warn(error)
    })
    this.acc_dis = 'd-block';
    for (let index = 0; index < this.items.length; index++) {
      const element = this.items[index];
      if (element.id == e.target.value) {
        this.edituser = {
          'id': element.id,
          'userid': element.id,
          'passport': element.passport,
          'days': element.days,
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
          'credits': element.credits,
          'rate': element.rate,
          'm_d': element.m_d,
          'o_d': element.o_d,
          'debit': element.debit,
          'circle_start': element.circle_start,


        }

      }

      // this.cv=e.target.value
    }
  }
  async extend(e) {
    this.id = e.target.value

    var alert = await this.alertController.create({
      backdropDismiss: true,
      cssClass: 'text-center',
      message: "Loading <img src='assets/img/ajax_clock_small.gif'>"

    })
    if (this.acc_num != '') {
      alert.present()
      var formData = new FormData()
      formData.append('extend', this.acc_num)
      formData.append('id', this.id)
      this.Httpnetwork.extend(formData).subscribe((res: any) => {
        if (res.success) {
          this.edituser.days = this.edituser.days + 14;
          alert.header = 'Success'
          alert.message = res.success
          alert.buttons = ['OK']
          alert.present()
        } else {

        }
      }, (error: any) => {
        if (error.status == 422) {
          var le = [error.error.message]
          var resErr = error.error.errors;
          for (let index = 0; index < le.length; index++) {
            alert.header = 'Invalid'
            alert.subHeader = error.error.message

            alert.message = `${!resErr.acc_num ? '' : resErr.acc_num[index] + '</br>'}`
            alert.buttons = ['OK']
            alert.present();
          }
        }
      })

    }
  }
  async delAcc() {
    var alert = await this.alertController.create({
      backdropDismiss: true,
      cssClass: 'text-center',
      message: "Loading <img src='assets/img/ajax_clock_small.gif'>"

    })
    if (this.acc_num != '') {
      alert.present()
      var formData = new FormData()
      formData.append('acc_num', this.acc_num)
      formData.append('permit', this.permit)
      formData.append('id', this.id)
      this.Httpnetwork.delAcc(formData).subscribe((res: any) => {
        if (res.error) {
          alert.header = 'Invalid'
          alert.message = res.error
          alert.buttons = ['OK']
        } else {
          if (!res.success) {
            alert.header = 'Confirm'
            alert.message = `Confirm Account Holder Name: <strong>${res.name}</strong>, And Account Type: <strong>${res.sub_acc_type} ${res.acc_type}</strong>`
            alert.buttons = [{
              text: 'Cancle',
              cssClass: 'text-danger'
            }, {
              text: 'Confirm',
              cssClass: 'btn btn-dark',
              handler: () => {
                this.permit = 'pass'
                this.delAcc()
              }
            }]
            alert.present()
          } else {
            this.amount = ''
            this.dis = 'd-none'
            this.items = res.success
            alert.header = 'Success'
            alert.message = 'Account Has Being Removed Successfully'
            alert.buttons = ['OK']
            this.permit = ''

          }


        }
      }, (error: any) => {
        if (error.status == 422) {
          var le = [error.error.message]
          var resErr = error.error.errors;
          for (let index = 0; index < le.length; index++) {
            alert.header = 'Invalid'
            alert.subHeader = error.error.message

            alert.message = `${!resErr.acc_num ? '' : resErr.acc_num[index] + '</br>'}`
            alert.buttons = ['OK']
            alert.present();
          }
        }
      })

    }
  }
  receipts(e) {
    if (e.target.value == 'transfer') {
      this.pro_show = 'd-block';
    } else if (e.target.value == 'cash') {
      this.pro_show = 'd-none';
    }
  }
  provider(e) {
    this.receipt = e.target.files[0]
  }
  async depo() {
    var alert = await this.alertController.create({
      backdropDismiss: true,
      cssClass: 'text-center',
      header: 'Credit',
      message: "Crediting <img src='assets/img/ajax_clock_small.gif'>"

    })
    if ((this.amount || this.payment != 'undefined') && (this.pro_show == 'd-block' && this.receipt != '' || this.pro_show == 'd-none' && this.receipt == '')) {
      alert.present()
      var formData = new FormData()
      formData.append('amount', this.amount)
      formData.append('payment', this.payment)
      formData.append('permit', this.permit)
      formData.append('receipt', this.receipt)
      formData.append('acc_types', 'personal')

      formData.append('id', this.id)
      this.Httpnetwork.pdeposit(formData).subscribe((res: any) => {
        if (res.error) {
          alert.header = 'Invalid'
          alert.message = res.error
          alert.buttons = ['OK']
        } else {
          if (!res.success) {
            alert.header = 'Confirm'
            alert.message = ` Crediting NGN${res[0]} <br>Confirm Account Holder<br> Name: <strong>${res[1].name}</strong> <br> Account Type: <strong>${res[1].sub_acc_type} ${res[1].acc_type}</strong>`
            alert.buttons = [{
              text: 'Cancle',
              cssClass: 'text-danger'
            }, {
              text: 'Confirm',
              cssClass: 'btn btn-dark',
              handler: () => {
                this.permit = 'pass'
                this.depo()
              }
            }]
            alert.present()
          } else if (res.success == 'll') {
            this.items = res.group
            var runing = 0;
            var available = 0;
            for (let i = 0; i < res.group.length; i++) {
              const element = res.group[i];
              if (element.id == this.id) {
                this.edituser.balance = element.balance
                this.edituser.wallet = element.wallet

              }


            }
            alert.header = 'Credited'
            alert.message = 'Account has being Credited Successfully'
            alert.buttons = ['OK']
            alert.present()
            this.permit = ''
            this.amount = ''
            this.dis = 'd-none'
            this.receipt = ''
          }

        }
      }, (error: any) => {

      })

    } else {
      alert.header = "Invalid"
      alert.message = "All Fields are Required"
      alert.buttons = ['OK']
      alert.present()
    }
  }
  async wtrw() {
    var alert = await this.alertController.create({
      message: "Loading <img src='assets/img/ajax_clock_small.gif'>",
      backdropDismiss: true,
      cssClass: 'text-center'


    })
    alert.present()
    if (this.amount != 'undefined' && this.acc_num != 'undefined') {
      var formData = new FormData()
      formData.append('amount', this.amount)
      formData.append('acc_num', this.acc_num)

      formData.append('id', this.id)
      formData.append('permited', this.permit);
      this.Httpnetwork.Pwithdraw(formData).subscribe((res: any) => {
        if (res.error && !res.access) {
          alert.header = 'Invalid'
          alert.message = res.error
          alert.buttons = ['OK']
        } else if (res.access) {
          var byadmin = res.error;
          alert.header = 'Restrictions Policy'
          alert.message = byadmin
          alert.buttons = [
            {
              text: 'Cancle',
              role: 'cancle',
              cssClass: 'text-primary',
            },
            {
              text: 'Confirm',
              role: 'confirm',
              cssClass: 'text-info',
              handler: () => {
                this.permit = 'success'
                this.wtrw()
              }

            }
          ]
        } else {
          this.items = res.personal
          var runing = 0;
          var available = 0;
          for (let i = 0; i < res.personal.length; i++) {
            const element = res.personal[i];
            if (this.edituser.id == element.id) {
              this.edituser.balance = element.balance
              this.edituser.wallet = element.wallet
            }

          }

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
      alert.message = "All Fields Are Required";
      alert.buttons = ['OK']
      alert.present()
    }
  }

  del(e) {
    this.disdel = 'd-block'
    this.id = e.target.value
  }
  deposit(e) {
    this.dis = 'd-block'
    this.id = e.target.value
  }

  withdraw(e) {
    this.diss = 'd-block';
    this.id = e.target.value
    this.amount = 0;

  }
  pre_rec(e) {
    this.recpre = 'd-block'
    this.re_pre = this.url + e.target.value;
    this.amount = 0;

  }
  over(e) {
    this.id = e.target.value
    this.od = 'd-block'
    this.amount = 33;
  }
  async o_d(data) {
    var alert = await this.alertController.create({
      message: "Loading <img src='assets/img/ajax_clock_small.gif'>",

    })
    if (this.amount == '') {
      alert.header = "Required";
      alert.message = "Amount field cannot be empty"
      alert.present()
    } else {
      alert.message = "Please Wait... <img src='assets/img/ajax_clock_small.gif'>",
        alert.present()
      var formdata = new FormData()
      formdata.set('id', this.id);
      formdata.set('amount', this.amount);
      formdata.set('od_type', 'personal');
      this.Httpnetwork.o_d(formdata).subscribe((res: any) => {
        if (!res.error) {
          this.items = res.personals
          alert.header = "Success";
          alert.message = res.success
          alert.buttons = ["OK"]
          alert.present()
        } else {
          alert.header = "Failed";
          alert.message = res.error
          alert.buttons = ["OK"]
          alert.present()
        }
      }, (error: any) => {

      })



    }
  }
  async view(e) {
    var alert = await this.alertController.create({
      backdropDismiss: true,
      cssClass: 'text-center',
      message: "Loading.. <img src='assets/img/ajax_clock_small.gif'>"

    })
    alert.present();
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
        this.edituser = res.customer;
        this.staff = res.officer
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
        alert.remove()
      }
    }, (error: any) => {

    })

  }

  async getTrans(data) {
    const alert = await this.alertController.create({
      message: "loading <img src='assets/img/ajax_clock_small.gif'>",
      backdropDismiss: true,
      cssClass: 'text-center'

    })
    alert.present()
    let formdata = new FormData()
    formdata.set('type', data.target.value)
    formdata.set('id', this.custid)

    this.Httpnetwork.getTrans(formdata).subscribe((res: any) => {
      if (!res.error) {
        this.sm = res
        alert.remove()
      } else {
        alert.header = 'Failed'
        alert.message = res.error
        alert.present()
      }

    }, (error: any) => {

    })
  }


  close1() {
    this.display = 'd-none';
    this.dis = 'd-none';
    this.diss = 'd-none';
    this.disadd = 'd-none'
    this.disdel = 'd-none'
    this.recpre = 'd-none'
    this.users = 'd-none';
    this.disser = 'd-none';
    this.od = 'd-none'

  }
  rec() {
    this.recpre = 'd-none'

  }
  close() {
    this.display = 'd-none';
    this.dis = 'd-none';
    this.diss = 'd-none';
    this.acc_dis = 'd-none'
    this.disadd = 'd-none'
    this.disdel = 'd-none'
    this.recpre = 'd-none'
    this.users = 'd-none';
    this.disser = 'd-none';
    this.od = 'd-none'
  }


}