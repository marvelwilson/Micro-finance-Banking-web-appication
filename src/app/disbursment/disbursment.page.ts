import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NetworkService } from '../network.service';
import { AlertController } from '@ionic/angular';
import { ModalController } from '@ionic/angular';
import { ApproveDisbursmentPage } from '../approve-disbursment/approve-disbursment.page';

@Component({
  selector: 'app-disbursment',
  templateUrl: './disbursment.page.html',
  styleUrls: ['./disbursment.page.scss'],
})
export class DisbursmentPage implements OnInit {

  items = []
  users: any;
  edituser: any;
  dis: string;
  display: string;
  url = 'https://agilfinance.net/service/storage/';
  specific = 'd-block'

  constructor(
    public router: Router,
    private Httpnetwork: NetworkService,
    public alertController: AlertController,
    public modalController: ModalController
  ) { 
    this.getApprovedLoans()
  }

  ngOnInit() {
  }

  async presentModal(loan) {
    const modal = await this.modalController.create({
      component: ApproveDisbursmentPage,
      componentProps: {
        'loan': loan
      }
    });

    modal.onDidDismiss().then((res) => {
      console.log('dismiss')
    });
    return await modal.present();
  }

  getApprovedLoans() {
    this.Httpnetwork.getApprovedLoans().subscribe({
      next: (result: any) => {
        this.items = result.loans
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

  open_approve_disbursment(i){
    this.presentModal(this.items[i])
  }

}
