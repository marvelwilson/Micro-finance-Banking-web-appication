import { Component, Input, OnInit } from '@angular/core';
import { NetworkService } from '../network.service';
import { AlertController } from '@ionic/angular';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-pay-loan',
  templateUrl: './pay-loan.page.html',
  styleUrls: ['./pay-loan.page.scss'],
})
export class PayLoanPage implements OnInit {
  @Input() data: any
  amount: any
  description: any

  constructor(
    private Httpnetwork: NetworkService,
    public modalController: ModalController,
    public alertController: AlertController
  ) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    // alert(this.data.payment_id)
  }

  pay_loan(){
    let formdata = new FormData();
    formdata.set("amount", this.amount)
    formdata.set("description", this.description)
    formdata.set("loan_id", this.data.loan_id)
    formdata.set("payment_id", this.data.payment_id)

    this.Httpnetwork.pay_loan(formdata).subscribe({
      next: (result: any) => {
        console.log(result);
      },
      error: (err: any) => {
        console.log(err);
      },
      complete: () => {
        console.log('complete');
      }
    })

  }

}
