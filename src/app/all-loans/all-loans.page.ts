import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NetworkService } from '../network.service';
import { AlertController } from '@ionic/angular';
import { ModalController } from '@ionic/angular';
import { LoanDetailsPage } from '../loan-details/loan-details.page';

@Component({
  selector: 'app-all-loans',
  templateUrl: './all-loans.page.html',
  styleUrls: ['./all-loans.page.scss'],
})
export class AllLoansPage implements OnInit {

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
    this.getAllLoans()
  }

  ngOnInit() {
  }

  async presentModal(loan) {
    const modal = await this.modalController.create({
      component: LoanDetailsPage,
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

  getAllLoans() {
    this.Httpnetwork.getAllLoans().subscribe({
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

  open_loan_detail(i){
    this.presentModal(this.items[i])
  }

}
