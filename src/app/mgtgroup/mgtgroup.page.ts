import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'
import { NetworkService } from '../network.service'
import { AlertController } from '@ionic/angular'
@Component({
  selector: 'app-mgtgroup',
  templateUrl: './mgtgroup.page.html',
  styleUrls: ['./mgtgroup.page.scss'],
})
export class MgtgroupPage implements OnInit {
  bal = [0, 1];
  items: any;
  staffname = ''
  url = 'https://agilfinance.net/service/storage/app/public/';
  id: any;
  amount='';
  payment='';
  acc_num='';
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
  edit = 'd-none'
  start_date = '';
  names: any;
  group: any;
  groups: any;
  date: string | Blob;
  od='d-none';
  repay = 'd-block'
  end_date = '';
  name = '';
  gid = '';
  user: any;
  trans: any;
  trans_amount: any[];
  missdays: any[];
  overdrafts: any;
  userList: any;
  his: any;

  //edit fields inputs
  constructor(
    public router: Router,
    private Httpnetwork: NetworkService,
    public alertController: AlertController,
  ) {
    this.getGroups()
  }

  ngOnInit() {
  }


  backtohome() {
    this.router.navigate(['/home'])
  }
  addgroup() {
    this.router.navigate(['/addgroup'])
  }
  async getVal() {
    this.elem = ''
    this.picked = this.shuffleNumbers[0]
    let alert = await this.alertController.create({
      backdropDismiss: true,
      cssClass: 'text-center h-1 text-secondary',
      message: "<img src='assets/img/Check.gif'> <br> <br> <h2>Your Number Is :" + this.shuffleNumbers[0] + "</h2>",
      buttons: [{
        text:'OK',
        handler: ()=>{
          this.sendAcc();
          
        }
      }]
    })
    alert.present();
 
  }
  async edits(id) {
    let alert = await this.alertController.create({
      backdropDismiss: true,
      cssClass: 'text-center',
      message: "Loading <img src='assets/img/ajax_clock_small.gif'>"
    })
    alert.present()
    this.Httpnetwork.getMembers(id.target.value).subscribe((res: any) => {
      if (res.error) {
        alert.header = 'Invalid'
        alert.message = res.error
        alert.buttons = ['OK']
        alert.present()
      } else {
        this.users = 'd-block';
        this.sm = res.members
        this.names = res.names
        this.group = res.group

        alert.remove()
      }
    }, (error: any) => {

    })
  }
  async getGroups() {
    let alert = await this.alertController.create({
      backdropDismiss: true,
      cssClass: 'text-center',
      message: "Loading <img src='assets/img/ajax_clock_small.gif'>"


    })
    alert.present()
    this.Httpnetwork.getGroups().subscribe((res: any) => {
      if (res.error) {
        alert.header = 'Invalid'
        alert.message = res.error
        alert.buttons = ['OK']
        alert.present()
      } else {

        alert.remove()
        this.items = res.save;
        this.trans = res.trans;
        this.user = res.user;

        this.trans_amount=[]
        this.missdays=[]
        this.overdrafts=[]

        let depo = 0;
        let withdraw = 0;
        let md = 0;
        let overdrafts = 0;


       

        for (let i = 0; i < this.items.length; i++) {
          const el = this.items[i];
          for (let t = 0; t < this.trans.length; t++) {
            const h = this.trans[t];
            if (el.id==h.customerid) {
              if (h.transType=='Deposit') {
               depo+=Number(h.amount)
              }else if (h.transType=='Wthdraw') {
               withdraw+=Number(h.amount)
              }

            }
          }

          let p={
            'depo':depo,
            'withdraw':withdraw,
          }
         this.trans_amount.push(p)


         for (let u = 0; u < this.user.length; u++) {
          const us = this.user[u];
            if (el.name==us.gname){
              if(us.m_d>0) {
              md+=Number(us.m_d)
            }else if(us.m_d<1 || us.m_d==null) {
              md+=0
            }
            
          }
         }
         let m = {
          'days':md
         }
         md=0
     this.missdays.push(m)
     for (let u = 0; u < this.user.length; u++) {
      const us = this.user[u];
        if (el.name==us.gname){
        if(us.o_d>0) {
          overdrafts+=Number(us.o_d)
        }else if(us.o_d<1 || us.o_d==null) {
          overdrafts+=0
        }
    
       

      }
     }
     let o = {
      'amount':overdrafts
     }
     this.overdrafts.push(o)
          }
        for (let index = 0; index < this.items.length; index++) {
          const element = this.items[index];
          this.staff = {

          }
          this.edituser = {
            'id': element.id,
            'userid': element.userid,
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
            'credits': element.credits,
            'rate': element.rate,


          }
          // this.cv=e.target.value
        }
      }
    }, (error: any) => {
      console.log("Please Check Your Internet Connect")
    })
  }
  async SearchID(data) {
    let alert = await this.alertController.create({
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
      this.Httpnetwork.searchGroup(data).subscribe((res: any) => {
        if (!res.error) {
          this.sm = res
          alert.header = "Found";
          alert.message = "Validation Successful"
          alert.buttons = ["OK"]
          alert.present()
          let debit = 0;
          let credit = 0;
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
  async fund(e) {
    const alert = await this.alertController.create({
      message: "loading <img src='assets/img/ajax_clock_small.gif'>",
      backdropDismiss: true,
      cssClass: 'text-center'

    })
    alert.present()
    this.Httpnetwork.off_gb(e.target.value).subscribe((res: any) => {
      let runing = 0;
      let available = 0;
      for (let i = 0; i < res.members.length; i++) {
        const element = res.members[i];
        runing += Number(element.balance)
        available += Number(element.wallet)


      }
      this.bal = [runing, available];
      this.staffname = res.officer.name;
      this.groups = res.groups;

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
          'userid': element.userid,
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
          'credits': element.credits,
          'rate': element.rate,


        }

      }

      // this.cv=e.target.value
    }
  }
  async Search(data) {
    let alert = await this.alertController.create({
      backdropDismiss: true,
      cssClass: 'text-center',
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
          this.getGroups()
        }
      }, (error: any) => {

      })
    }
  }

  async sendAcc() {
    let alert = await this.alertController.create({
      backdropDismiss: true,
      cssClass: 'text-center',
      message: "Loading <img src='assets/img/ajax_clock_small.gif'>"

    })
    if (this.acc_num != '') {
      alert.present()
      let formData = new FormData()
      let d = new Date()
      let picked = Number(this.picked) * (this.groups.days)* (this.groups.days);
      let main_picked = picked > 0 ? picked + Number(d.getDate()) : d.getDate()
      d.setDate(main_picked)
      this.date = d.getDate() + '-' + (d.getMonth()+1) + '-' + d.getFullYear()
      // console.log(this.date)        
      formData.set('acc_num', this.acc_num)
      formData.set('permit', this.permit)
      formData.set('picked', this.picked)
      formData.set('date', this.date)
      formData.set('id', this.id)
      console.log(this.date)
      this.Httpnetwork.sendAcc(formData).subscribe((res: any) => {
        if (res.error) {
          alert.header = 'Invalid'
          alert.message = res.error
          alert.buttons = ['OK']
          this.picked = ''
          this.permit = ''
        } else {
          if (!res.success) {
            if (this.picked == '') {
              alert.header = 'Pick'
              alert.message = 'Pick a number for your turn(payout)'
              alert.buttons = ['OK']
              let array = res.shuffled;
              let all = []
              for (let i = 0; i < res.all_users.length; i++) {
                const element = res.all_users[i].icon;
                all.push(element)
              }
              this.shuffleNumbers = array;
              this.already = all.sort((a, b) => { return a - b });

              for (let i = 0; i < this.already.length; i++) {
                console.log(i)
                // const a = this.already[i];
                for (let a = 0; a < this.shuffleNumbers.length; a++) {
                  console.log(a)
                  if (this.shuffleNumbers[a] == this.already[i]) {
                    this.shuffleNumbers.splice(a, 1)

                    break
                  }

                }

              }
              function shuffle(newdata) {
                return newdata.sort(() => Math.random() - 0.5);
              }
              this.shuffleNumbers = shuffle(this.shuffleNumbers)
              this.elem = 'something';
            } else {
              alert.header = 'Confirm'
              alert.message = `Confirm Account Holder <br> Name: <strong>${res.checking.name}</strong> <br> Account Type: <strong>${res.checking.sub_acc_type} ${res.checking.acc_type}</strong>`
              alert.buttons = [{
                text: 'Cancle',
                cssClass: 'text-danger',
                handler: () => {
                  this.picked = ''
                }
              }, {
                text: 'Confirm',
                cssClass: 'btn btn-dark ',
                handler: () => {
                  this.permit = 'pass'
                  this.sendAcc()
                }
              }]
              alert.present()
            }
          } else {
            this.amount = ''
            this.dis = 'd-none'
            this.close()
            this.items = res.success
            alert.header = 'Success'
            alert.message = 'Account Has Being Added Successfully'
            alert.buttons = ['OK']
            this.picked = ''
            this.permit = ''

          }


        }
      }, (error: any) => {
        if (error.status == 422) {
          let le = [error.error.message]
          let resErr = error.error.errors;
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
    let alert = await this.alertController.create({
      backdropDismiss: true,
      cssClass: 'text-center',
      message: "Loading <img src='assets/img/ajax_clock_small.gif'>"

    })
    if (this.acc_num != '') {
      alert.present()
      let formData = new FormData()
      formData.set('acc_num', this.acc_num)
      formData.set('permit', this.permit)
      formData.set('id', this.id)
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
          let le = [error.error.message]
          let resErr = error.error.errors;
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
    let alert = await this.alertController.create({
      backdropDismiss: true,
      cssClass: 'text-center',
      header: 'Credit',
      message: "Crediting <img src='assets/img/ajax_clock_small.gif'>"

    })
    if ((this.amount || this.payment != '') && (this.pro_show == 'd-block' && this.receipt != '' || this.pro_show == 'd-none' && this.receipt == '')) {
      alert.present()
      let formData = new FormData()
      formData.set('amount', this.amount)
      formData.set('payment', this.payment)
      formData.set('acc_num', this.acc_num)
      formData.set('receipt', this.receipt)
      formData.set('permit', this.permit)
      formData.set('payment_type', this.repay)
      formData.set('id', this.id)
      this.Httpnetwork.gdeposit(formData).subscribe((res: any) => {
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
            alert.header = 'Credited'
            alert.message = 'Account has being Credited Successfully'
            alert.buttons = ['OK']
            alert.present()
            this.permit = ''
            this.amount = ''
            this.dis = 'd-none'
            this.receipt = ''
            this.getGroups()
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
    let alert = await this.alertController.create({
      message: "Loading <img src='assets/img/ajax_clock_small.gif'>",
      backdropDismiss: true,
      cssClass: 'text-center'


    })
    alert.present()
    if (this.amount != 'undefined' && this.acc_num != 'undefined') {
      let formData = new FormData()
      formData.set('amount', this.amount)
      formData.set('acc_num', this.acc_num)

      formData.set('id', this.id)
      formData.set('permited', this.permit);
      this.Httpnetwork.gwithdraw(formData).subscribe((res: any) => {
        if (res.error && !res.access) {
          alert.header = 'Invalid'
          alert.message = res.error
          alert.buttons = ['OK']
        } else if (res.access) {
          let byadmin = res.error;
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
          this.items = res.group
          let runing = 0;
          let available = 0;
          for (let i = 0; i < res.members.length; i++) {
            const element = res.members[i];
            runing += Number(element.balance)
            available += Number(element.wallet)


          }
          this.bal = [runing, available];
          alert.header = 'Debit'
          alert.message = 'Account has being Debited Successfully'
          alert.buttons = ['OK']
          this.amount = ''
          this.diss = 'd-none'
          this.permit = ''
          this.getGroups()

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
  
  over(e) {
    this.id = e.target.value
    this.od = 'd-block'
  }
  async o_d(data) {
    var alert = await this.alertController.create({
      message: "Loading <img src='assets/img/ajax_clock_small.gif'>",

    })
    if (this.acc_num == '') {
      alert.header = "Required";
      alert.message = "Account Number Field Cannot Be Empty"
      alert.present()
    } else {
      alert.message = "Please Wait... <img src='assets/img/ajax_clock_small.gif'>",
        alert.present()
      var formdata = new FormData()
      formdata.set('id', this.id);
      formdata.set('acc_num', this.acc_num);
      formdata.set('od_type', 'group');


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

  add(e) {
    this.disadd = 'd-block'
    this.id = e.target.value
  }
  del(e) {
    this.disdel = 'd-block'
    this.id = e.target.value
  }
  async deposit(e) {
    let alert = await this.alertController.create({
      header:'Choose Deposit Type',
      inputs:[{
        type:'radio',
        label:'Repay Over Draft',
        handler:()=>{
          this.dis = 'd-block'
          this.repay = 'overdraft'
          this.id = e.target.value
          alert.dismiss()
        }
      },
      {
        type:'radio',
        label:'Group Contribution Deposit',
        handler:()=>{
          this.dis = 'd-block'
          this.repay = 'contribution'
          this.id = e.target.value
          alert.dismiss()
        }
      }],
      
    })
    alert.present()
    
  }

  withdraw(e) {
    this.diss = 'd-block';
    this.id = e.target.value
  }
  pre_rec(e) {
    this.recpre = 'd-block'
    this.re_pre = this.url + e.target.value;
  }
  async SearchState(data) {
    let alert = await this.alertController.create({
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
          let debit = 0;
          let credit = 0;
          this.sm.filter((element) => {
            if (element.transType == 'Deposit') {
              credit += Number(element.amount)
            } else if (element.transType == 'Withdraw') {
              debit += Number(element.amount)

            }
          })
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
  reset(){
    this.his = this.sm
    let debit = 0;
    let credit = 0;
    for (let i = 0; i < this.his.length; i++) {
      const element = this.his[i];
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
  eventListener(val, e){
    e = e.target.value
   let emptyarr=[]
    if (val=='users') {
       this.sm.map(a=>{

        if (e==a.acc_num) {
          emptyarr.push(a)
        }
       })
    }
    this.his=emptyarr

    let debit = 0;
    let credit = 0;
    for (let i = 0; i < this.his.length; i++) {
      const element = this.his[i];
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
  async view(e) {
    let alert = await this.alertController.create({
      backdropDismiss: true,
      cssClass: 'text-center',
      message: "Loading.. <img src='assets/img/ajax_clock_small.gif'>"

    })
    alert.present();
    let id = e.target.value;
    this.custid = id;
    this.Httpnetwork.statement(id).subscribe((res: any) => {
      if (res.error) {
        alert.header = 'Not Found'
        alert.message = res.error
        alert.buttons = ['OK']
        alert.present()
      } else {

        this.sm = res.his;
        this.his = this.sm;
        this.edituser = res.customer;
        this.staff = res.officer
        this.userList = res.users
        let debit = 0;
        let credit = 0;
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

  async changeDate(d) {
    let main_id = d.target.value
    let date;
    let gname;
    let msg;
    for (let i = 0; i < this.sm.length; i++) {
      const e = this.sm[i];
      if (e.id == main_id) {
        date = e.icon
        gname = e.gname
      }

    }

    let main = new Date()
    main.setDate((this.group.days * (date)) + main.getDate())
    let main_Date = main.getDate() + '-' + (main.getMonth()+1)  + '-' + main.getFullYear()
    let alert = await this.alertController.create({
      message: "Click <span class='text-primary'>Confirm</span> To Reset Date",
      backdropDismiss: false,
      buttons: [{
        cssClass: 'text-danger',
        text: 'Cancle',
      }, {
        cssClass: 'text-success',
        text: 'Confirm',
        handler: () => {

          let formdata = new FormData()
          formdata.set('id', main_id)
          formdata.set('date', main_Date)
          formdata.set('gname', gname)

          this.Httpnetwork.ChangeDate(formdata).subscribe((res: any) => {
            this.sm = res.members
            msg = res.success
          })
        }
      }]
    })
    alert.present()
  }

  async group_updates(params, useful) {
    let alert = await this.alertController.create({
      backdropDismiss: true,
      // cssClass:'text-center',
      message: "Loading <img src='assets/img/ajax_clock_small.gif'>"
    })
    alert.present()
    if (params == 'edit') {
      this.edit = 'd-block'
      let id = useful.target.value;
      this.items.filter((e) => {
        if (e.id == id) {
          this.start_date = e.duration
          this.end_date = e.updated_day
          this.name = e.name
          this.gid = e.id
        }

      })
      alert.remove()

    } else if (params == 'update') {
      let formdata = new FormData()
      formdata.set('name', this.name)
      formdata.set('start_date', this.start_date)
      formdata.set('end_date', this.end_date)
      formdata.set('acc_type', 'group')
      formdata.set('id', this.gid)

      this.Httpnetwork.updatebank(formdata).subscribe((res: any) => {
        if (res.success) {
          alert.header = 'Success'
          alert.message = res.success
          alert.buttons = ['OK']
          this.items = res.groups
          alert.present()
        } else {
          alert.header = 'Failed'
          alert.message = res.error
          alert.buttons = ['OK']
          this.items = res.groups
          alert.present()
        }
      }, (error: any) => {
        if (error.status == 422) {

          let le = [error.error.message]
          let resErr = error.error.errors;
          le.filter((index) => {
            alert.header = 'Invalid'
            alert.subHeader = error.error.message
            alert.message = `${!resErr.start_date ? '' : resErr.start_date[index] + '</br>'}
          ${!resErr.end_date ? '' : resErr.end_date[index] + '</br>'}
          ${!resErr.name ? '' : resErr.name[index] + '</br>'}`;
            alert.buttons = ['OK']
            alert.present();
          })

        }
      })
    }
  }
  close1() {
    this.display = 'd-none';
    this.dis = 'd-none';
    this.diss = 'd-none';
    this.disadd = 'd-none'
    this.disdel = 'd-none'
    this.recpre = 'd-none'
    this.users = 'd-none';
    this.edit = 'd-none'
    this.od='d-none'


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
    this.edit = 'd-none'
    this.od='d-none'

  }


}