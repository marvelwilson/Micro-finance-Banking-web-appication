import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NetworkService } from '../network.service';
import { AlertController } from '@ionic/angular';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-virtual-account',
  templateUrl: './virtual-account.page.html',
  styleUrls: ['./virtual-account.page.scss'],
})
export class VirtualAccountPage implements OnInit {

  name: any
  lname: any
  gender: any
  email: any
  phone: any
  nin: any
  address: any
  account_type: any
  bank: any
  dob: any
  bvn: any
  branch: any

  constructor(
    private Httpnetwork: NetworkService,
    public modalController: ModalController,
    public alertController: AlertController
  ) { }

  ngOnInit() {
  }
  
  async open_account(){
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      message: "processing... <img src='assets/img/ajax_clock_small.gif'>",
      buttons: ['OK']
    });
    await alert.present();

    let formdata = new FormData();
    formdata.set("name", this.name)
    formdata.set("lname", this.lname)
    formdata.set("gender", this.gender)

    formdata.set("email", this.email)
    formdata.set("phone", this.phone)
    formdata.set("nin", this.nin)
    formdata.set("address", this.address)
    formdata.set("account_type", this.account_type)
    formdata.set("bank", this.bank)
    formdata.set("dob", this.dob)
    formdata.set("bvn", this.bvn)
    formdata.set("branch", this.branch)

    this.Httpnetwork.open_account(formdata).subscribe(
      (res: any) => {
        console.log(res)

      }, (error: any) => {
        console.log("ERROR ===", error);
      }
    );
  }

}
