import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { NetworkService } from '../network.service';

@Component({
  selector: 'app-cinc',
  templateUrl: './cinc.page.html',
  styleUrls: ['./cinc.page.scss'],
})
export class CincPage implements OnInit {
  icon = 'assets/img/passport.jpeg'
  url = ''
  display = 'd-none'
  branchlist: any;
  stafflist: any;
  amount: any;
  permit = ''
  al = ''
  sm: any;
  val2 = 'd-none'
  receipt = '';
  peroids: any;
  constructor(
    private router: Router,
    public xhr: NetworkService,
    private alertC: AlertController,

  ) {
    this.branches()
    this.peroids = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31];
    this.sm = [
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
  }

  ngOnInit() {
  }

  backtohome() {
    this.router.navigate(['/home']);
  }

  async provideOfficer(data) {
    var alert = await this.alertC.create({
      header: '',
      message: 'please wait... <img src="assets/img/ajax_clock_small.gif">',
    })
    alert.present()
    var formdata = new FormData()
    formdata.set('id', data.target.value);
    this.xhr.getStf(formdata).subscribe((res: any) => {
      if (res.error) {
        alert.header = 'Invalid'
        alert.message = res.error
        alert.buttons = ['OK']
        alert.present()
      } else {
        this.stafflist = res
        alert.remove()
      }
    }, (error: any) => {

    })
  }

  reoccure(data) {

    if (data.target.value == 'yes') {
      this.display = 'd-block'
    } else if (data.target.value == 'no') {
      this.display = 'd-none'
    }
  }
  async branches() {
    var alert = await this.alertC.create({
      header: '',
      message: 'please wait... <img src="assets/img/ajax_clock_small.gif">',
    })
    this.xhr.getBranches().subscribe((res: any) => {
      this.branchlist = res
      alert.remove()
    }, (error: any) => {

    })
  }
  icons(e) {
    this.receipt = e.target.files[0]
  }

  async onSubmit(data) {
    var alert = await this.alertC.create({
      header: '',
      message: 'Loading... <img src="assets/img/ajax_clock_small.gif">',
    })
    alert.present()
    if (data.reoccurring == 'yes' && data.peroid == '') {
      alert.header = 'Invalid'
      alert.message = 'Peroid Reoccurance Is Required'
    } else {
      data.receipt = this.receipt
      var formdata = new FormData()
      formdata.set('branch', data.branch)
      formdata.set('desc', data.desc)
      formdata.set('amount', data.amount)
      formdata.set('date', data.date)
      formdata.set('type', data.type)
      formdata.set('peroid', data.peroid)
      formdata.set('receipt', this.receipt)
      formdata.set('reoccurring', data.reoccurring)

      this.xhr.modifyIn(formdata).subscribe((res: any) => {
        if (res.error) {
          alert.header = 'Invalid'
          alert.message = res.error;
          alert.buttons = ['OK']
          alert.present()
        } else if (res.success) {

          alert.header = 'Success'
          alert.message = res.success
          alert.buttons = [{
            text: 'OK',
            role: 'confirm',
            cssClass: 'text-primary',
            handler: () => {
              alert.remove()
              this.router.navigate(['/inc'])
            }
          }]
          alert.present()
        }

      }, (error: any) => {
        if (error.status == 422) {
          var le = [error.error.message]
          var resErr = error.error.errors;
          for (let index = 0; index < le.length; index++) {
            alert.header = 'Invalid'
            alert.subHeader = error.error.message

            alert.message = `${!resErr.exp_type ? '' : resErr.exp_type[index] + '</br>'}
          ${!resErr.exp_amount ? '' : resErr.exp_amount[index] + '</br>'}
          ${!resErr.exp_date ? '' : resErr.exp_date[index] + '</br>'}`;
            alert.buttons = ['OK']
            alert.present();
          }
        }
      })
    }
  }
}
