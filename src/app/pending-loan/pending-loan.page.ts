import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NetworkService } from '../network.service';
import { AlertController } from '@ionic/angular';
import { ModalController } from '@ionic/angular';
import { ApproveLoanPage } from '../approve-loan/approve-loan.page';

@Component({
  selector: 'app-pending-loan',
  templateUrl: './pending-loan.page.html',
  styleUrls: ['./pending-loan.page.scss'],
})
export class PendingLoanPage implements OnInit {
  items = []
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
    this.getPendingLoans()
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

  getPendingLoans() {
    this.Httpnetwork.getPendingLoans().subscribe({
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
