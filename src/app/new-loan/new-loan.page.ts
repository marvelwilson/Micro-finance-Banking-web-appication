import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NetworkService } from '../network.service';
import { AlertController } from '@ionic/angular';
import { ModalController } from '@ionic/angular';
import { ApplyLoanPage } from '../apply-loan/apply-loan.page'; 

@Component({
  selector: 'app-new-loan',
  templateUrl: './new-loan.page.html',
  styleUrls: ['./new-loan.page.scss'],
})
export class NewLoanPage implements OnInit {
  items: any;
  users: any;
  edituser: any;
  dis: string;
  display: string;
  url = 'https://agilfinance.net/service/storage/app/public/';
  specific = 'd-block'

  constructor(
    public router: Router,
    private Httpnetwork: NetworkService,
    public alertController: AlertController,
    public modalController: ModalController
  ) {
    this.getCustomers()
  }

  ngOnInit() {
  }

  async presentModal(id) {
    const modal = await this.modalController.create({
      component: ApplyLoanPage,
      cssClass: 'applyloan',
      componentProps: {
        'id': id
      }
    });

    modal.onDidDismiss().then((res) => {
      console.log('dismiss')
    });
    return await modal.present();
  }

  getCustomers() {

    this.users = JSON.parse(localStorage.getItem('userid')).user;
    this.Httpnetwork.getCustomers().subscribe((res: any) => {
      if (res == "error") {
        console.log("")
      } else {
        this.items = res;
        for (let index = 0; index < this.items.length; index++) {
          const element = this.items[index];
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
            'created_at': element.created_at,
            'acc_mood': element.acc_mood,

          }

          // this.cv=e.target.value
        }
      }
    }, (error: any) => {
      console.log("Please Check Your Internet Connect")
    })
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
      alert.message = "Validating Search<img src='assets/img/ajax_clock_small.gif'>"
      alert.buttons = [""]
      alert.present()
      this.Httpnetwork.Search(data).subscribe((res: any) => {
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
          this.getCustomers()
        }
      }, (error: any) => {

      })
    }
  }

  open_apply_loan(id){
    this.presentModal(id)
  }

}
