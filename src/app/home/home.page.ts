import { Component } from '@angular/core';
import { NetworkService } from '../network.service';
import { interval } from 'rxjs';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  userInfo: any;
  userType: any;
  amounts: any;
  amount: any;
  pendingcounter: any;
  staff: any;
  deposit: number;
  withdraw: number;
  inc: number;
  exp: number;
  hold_res: any;
  check_peroid: any;
  dates: any;

  constructor(
    public Httpnetwork: NetworkService,
    public alertController: AlertController,
    public route: Router
  ) {
    this.getuserinfo();
    this.getDatas();
  }
  ngOnInit(){
  setInterval(()=>{
    this.autoUpdate()
  }, 1000)
  }

  peroid(value) {
    this.check_peroid = value
    let date_=this.dates
    let res = this.hold_res
    if (value == 'All Time') {
      this.deposit = 0
      this.withdraw = 0
      for (let i = 0; i < res.trans.length; i++) {
        const e = res.trans[i];
        if (e.transType == 'Deposit') {
          this.deposit += Number(e.amount)
        } else if (e.transType == 'Withdraw') {
          this.withdraw += Number(e.amount)
        }

      }
      this.inc = 0;
      for (let i = 0; i < res.inc.length; i++) {
        const e = res.inc[i];
        this.inc += Number(e.amount)
      }
      this.exp = 0;
      for (let i = 0; i < res.exp.length; i++) {
        const e = res.exp[i];
        this.exp += Number(e.expAmount)
      }
    } else {

      if (value == 'Today') {
      let todays_date = date_;
      this.deposit = 0
      this.withdraw = 0
      for (let i = 0; i < res.trans.length; i++) {
        const e = res.trans[i];
        let main_date = e.created_at.split(' ')[0]
       
        if (main_date==todays_date) {
          if (e.transType == 'Deposit') {
            this.deposit += Number(e.amount)
          } else if (e.transType == 'Withdraw') {
            this.withdraw += Number(e.amount)
          }
        }
      }
      this.inc = 0;
      for (let i = 0; i < res.inc.length; i++) {
        const e = res.inc[i];
        let main_date = e.created_at.split(' ')[0]
        if (main_date==todays_date) {
          this.inc += Number(e.amount)
        }
      }
      this.exp = 0;
      for (let i = 0; i < res.exp.length; i++) {
        const e = res.exp[i];
        let main_date = e.created_at.split(' ')[0]
        if (main_date==todays_date) {
          this.exp += Number(e.expAmount)
        }
      }
      } else if (value == 'This Month') {
        let todays_date = date_.split('-');
        todays_date = todays_date[0]+'-'+todays_date[1];
        this.deposit = 0
        this.withdraw = 0
        for (let i = 0; i < res.trans.length; i++) {
          const e = res.trans[i];
          let main_date = e.created_at.split(' ')[0]
           main_date = main_date.split('-')[0]+'-'+main_date.split('-')[1]
          if (main_date==todays_date) {
            if (e.transType == 'Deposit') {
              this.deposit += Number(e.amount)
            } else if (e.transType == 'Withdraw') {
              this.withdraw += Number(e.amount)
            }
          }
        }
        this.inc = 0;
        for (let i = 0; i < res.inc.length; i++) {
          const e = res.inc[i];
          let main_date = e.created_at.split(' ')[0]
           main_date = main_date.split('-')[0]+'-'+main_date.split('-')[1]
          if (main_date==todays_date) {
            this.inc += Number(e.amount)
          }
        }
        this.exp = 0;
        for (let i = 0; i < res.exp.length; i++) {
          const e = res.exp[i];
          let main_date = e.created_at.split(' ')[0]
          main_date = main_date.split('-')[0]+'-'+main_date.split('-')[1]
          if (main_date==todays_date) {
            this.exp += Number(e.expAmount)
          }
        }
      } else if (value == 'This year') {
         let todays_date = date_.split('-');
        todays_date = todays_date[0];
        this.deposit = 0
        this.withdraw = 0
        for (let i = 0; i < res.trans.length; i++) {
          const e = res.trans[i];
          let main_date = e.created_at.split(' ')[0]
           main_date = main_date.split('-')[0]
          if (main_date==todays_date) {
            if (e.transType == 'Deposit') {
              this.deposit += Number(e.amount)
            } else if (e.transType == 'Withdraw') {
              this.withdraw += Number(e.amount)
            }
          }
        }
        this.inc = 0;
        for (let i = 0; i < res.inc.length; i++) {
          const e = res.inc[i];
          let main_date = e.created_at.split(' ')[0]
          main_date = main_date.split('-')[0]
          if (main_date==todays_date) {
            this.inc += Number(e.amount)
          }
        }
        this.exp = 0;
        for (let i = 0; i < res.exp.length; i++) {
          const e = res.exp[i];
          let main_date = e.created_at.split(' ')[0]
           main_date = main_date.split('-')[0]
          if (main_date==todays_date) {
            this.exp += Number(e.expAmount)
          }
        }
      }

 
    }
  }

  autoUpdate(){
    this.Httpnetwork.autoUpdate().subscribe((res:any)=>{
     console.log(res)
    },(error:any)=>{
      console.log(error)
    })
  }
  getuserinfo() {
    var data = JSON.parse(localStorage.getItem('userid'));
    this.userInfo = data;
    this.userType = data.user.user_type
  }
  async getDatas() {
    var alert = await this.alertController.create({
      message: "Loading <img src='assets/img/ajax_clock_small.gif'>",
      backdropDismiss: false,
      cssClass: 'text-center'


    })
    alert.present()
    this.Httpnetwork.getdata().subscribe((res: any) => {
      if (res != "error") {
        this.hold_res = res
        this.amounts = res.activecusts;
        this.amount = res.custs;
        this.pendingcounter = res.pending;
        this.staff = res.staff;
        this.dates = res.date

        this.deposit = 0
        this.withdraw = 0
        for (let i = 0; i < res.trans.length; i++) {
          const e = res.trans[i];
          if (e.transType == 'Deposit') {
            this.deposit += Number(e.amount)
          } else if (e.transType == 'Withdraw') {
            this.withdraw += Number(e.amount)
          }

        }
        this.inc = 0;
        for (let i = 0; i < res.inc.length; i++) {
          const e = res.inc[i];
          this.inc += Number(e.amount)
        }
        this.exp = 0;
        for (let i = 0; i < res.exp.length; i++) {
          const e = res.exp[i];
          this.exp += Number(e.expAmount)
        }
        alert.remove()
      }
    }, (error: any) => {
      console.log(error)
      if (error.status == 401) {
        alert.header = 'Failed'
        alert.message = error.statusText
        alert.buttons = ['OK']
        alert.present()
        this.route.navigate(['/login'])
      } else {
        alert.header = 'Failed'
        alert.message = "Please Check Your Internet Connect"
        alert.buttons = ['OK']
        alert.present()
      }

    })
  }

}
