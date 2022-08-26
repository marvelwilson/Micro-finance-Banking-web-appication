import { Component, Input, OnInit } from '@angular/core';
import { NetworkService } from '../network.service';
import { AlertController } from '@ionic/angular';
import { ModalController } from '@ionic/angular';
import { PayLoanPage } from '../pay-loan/pay-loan.page';

@Component({
  selector: 'app-loan-details',
  templateUrl: './loan-details.page.html',
  styleUrls: ['./loan-details.page.scss'],
})
export class LoanDetailsPage implements OnInit {

  @Input() loan: any
  period: any
  loan_period: any
  start_date: any
  payments = []
  today: any
  loan_amount: any
  si: any

  constructor(
    private Httpnetwork: NetworkService,
    public modalController: ModalController,
    public alertController: AlertController
  ) {

  }

  ngOnInit() {
  }

  ionViewWillEnter() {
    console.log(this.loan)
    this.period = this.loan.period
    this.loan_period = this.loan.loan_period
    this.loan_amount = this.loan.loan_amount
    this.start_date = this.loan.start_date

    this.today = new Date().getTime();
    
    if (this.loan.status == 'On going') {
      this.get_payments(this.loan.id)
    }

    
  }

  async presentModal(data) {
    const modal = await this.modalController.create({
      component: PayLoanPage,
      componentProps: {
        'data': data
      }
    });

    modal.onDidDismiss().then((res) => {
      console.log('dismiss')
    });
    return await modal.present();
  }

  get_payments(id) {
    this.Httpnetwork.get_payments(id).subscribe({
      next: (result: any) => {
        this.payments = result.data
        let v = this.period.split("---")
        for (let i = 0; i < this.payments.length; i++) {
          let cdd = new Date(this.payments[i].due_date).getTime()
          if(this.today > cdd){
            var fault = (this.loan.loan_penalty * this.loan_amount) / 100
          }
          this.payments[i].d_date = cdd
          this.payments[i].fault = fault
          this.payments[i].si = this.loan_amount / parseInt(v[0])
          this.payments[i].interest = (this.payments[i].si * parseInt(v[1])) / 100
        }
        console.log(this.payments);
      },
      error: (err: any) => {
        console.log(err);
      },
      complete: () => {
        console.log('complete');
      }
    })
  }

  format_date(d) {
    let newd = d.split('/')

    if (newd[0].length == 1) {
      newd[0] = '0' + newd[0]
    }

    if (newd[1].length == 1) {
      newd[1] = '0' + newd[1]
    }

    return newd[2] + '-' + newd[0] + '-' + newd[1]
  }

  pay_loan(id){
    let data = {
      loan_id: this.loan.id,
      payment_id: id
    }
    this.presentModal(data)
  }

}
