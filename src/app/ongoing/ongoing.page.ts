import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NetworkService } from '../network.service';
import { AlertController } from '@ionic/angular';
import { ModalController } from '@ionic/angular';
import { ApproveLoanPage } from '../approve-loan/approve-loan.page';

@Component({
  selector: 'app-ongoing',
  templateUrl: './ongoing.page.html',
  styleUrls: ['./ongoing.page.scss'],
})
export class OngoingPage implements OnInit {
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
    this.getOngoingLoans()
  }

  ngOnInit() {
  }

  async presentModal(loan) {
    const modal = await this.modalController.create({
      component: ApproveLoanPage,
      cssClass: 'applyloan',
      componentProps: {
        'loan': loan
      }
    });

    modal.onDidDismiss().then((res) => {
      console.log('dismiss')
    });
    return await modal.present();
  }

  getOngoingLoans() {
    this.Httpnetwork.getOngoingLoans().subscribe({
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

  open_approve(i){
    this.presentModal(this.items[i])
  }

}
