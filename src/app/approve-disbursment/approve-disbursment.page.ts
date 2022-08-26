import { Component, Input, OnInit } from '@angular/core';
import { NetworkService } from '../network.service';
import { AlertController } from '@ionic/angular';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-approve-disbursment',
  templateUrl: './approve-disbursment.page.html',
  styleUrls: ['./approve-disbursment.page.scss'],
})
export class ApproveDisbursmentPage implements OnInit {

  @Input() loan: any;
  period: any
  loan_period: any
  disbursment_date: any;
  start_date: string;
  loan_id: any;
  amount_per_period: any
  payments = []

  constructor(
    private Httpnetwork: NetworkService,
    public modalController: ModalController,
    public alertController: AlertController
  ) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    console.log(this.loan)
    this.loan_id = this.loan.id
    this.period = this.loan.period
    this.loan_period = this.loan.loan_period
    this.amount_per_period = this.loan.amount_per_period
  }

  async approve_disbursment() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      message: "processing... <img src='assets/img/ajax_clock_small.gif'>",
      buttons: ['OK']
    });
    await alert.present();

    let v = this.period.split("---")

    this.payments = []

    if (this.loan_period == 'Daily') {
      for (let i = 1; i <= v[0]; i++) {
        var cd = new Date(this.start_date);
        cd.setDate(cd.getDate() + i);
        let r = cd.toLocaleString().split(",")
        let w = this.format_date(r[0])
        this.payments.push(w)
        console.log('Day ' + i + ' = ' + w)

      }
    }

    if (this.loan_period == 'Weekly') {
      for (let i = 1; i <= v[0]; i++) {
        var cd = new Date(this.start_date);
        cd.setDate(cd.getDate() + (i * 7));
        let r = cd.toLocaleString().split(",")
        let w = this.format_date(r[0])
        this.payments.push(w)
        console.log('Day ' + i + ' = ' + w)

      }
    }

    if (this.loan_period == 'Monthly') {
      for (let i = 1; i <= v[0]; i++) {
        var cd = new Date(this.start_date);
        cd.setDate(cd.getDate() + (i * 30));
        let r = cd.toLocaleString().split(",")
        let w = this.format_date(r[0])
        this.payments.push(w)
        console.log('Day ' + i + ' = ' + w)

      }
    }

    let formdata = new FormData();
    formdata.set("disbursment_date", this.disbursment_date)
    formdata.set("start_date", this.start_date)
    formdata.set("payments", JSON.stringify(this.payments))
    formdata.set("amount_per_period", this.amount_per_period)

    formdata.set("loan_id", this.loan_id)

    

    this.Httpnetwork.approve_disbursment(formdata).subscribe({
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

}
