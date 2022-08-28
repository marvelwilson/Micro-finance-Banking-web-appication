import { Component, OnInit } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';
import { NewLoanPage } from '../new-loan/new-loan.page';
import { PendingLoanPage } from '../pending-loan/pending-loan.page';
import { DisbursmentPage } from '../disbursment/disbursment.page';
import { AllLoansPage } from '../all-loans/all-loans.page';
import { OngoingPage } from '../ongoing/ongoing.page';
import { VirtualAccountPage } from '../virtual-account/virtual-account.page';
import { Router } from '@angular/router';
import { NetworkService } from '../network.service';

@Component({
  selector: 'app-sidebars',
  templateUrl: './sidebars.component.html',
  styleUrls: ['./sidebars.component.scss'],
})
export class SidebarsComponent implements OnInit {
  toggle: any;
  a = false;
  userInfo: any;
  userType: any;
url = 'https://agilfinance.net/service/storage/app/public/';
  pendingcounter: any;
  
  constructor(
    private router: Router,
    public modalController: ModalController,
    public xhr: NetworkService,
    public alertC: AlertController
  ) { }
   
  ngOnInit() {
    this.getuserinfo();
  }

 
  getuserinfo() {
    var data = JSON.parse(localStorage.getItem('userid'));
    this.userInfo = data;
    this.userType = data.user.user_type
    this.xhr.getdata().subscribe((res: any) => {
      if (res != "error") {
        this.pendingcounter = res.pending;
      }
    }, (error: any) => {
      console.log(error)
      if (error.status==401) {
        this.router.navigate(['/login'])
      }else{
       
      }
    
    })
  }


  async presentModal(c) {
    const modal = await this.modalController.create({
      component: c,
      cssClass: 'wide-modal'
    });

    modal.onDidDismiss().then((res) => {
      console.log('dismiss')
    });
    return await modal.present();
  }

  togglee() {
    if (this.a === false) {
      this.toggle = 'toggle-sidebar'
      this.a = true
    } else {
      this.toggle = ''
      this.a = false
    }
  }
  route(links) {

    return this.router.navigate([links]);
  }
  async signout(){
    const alert  = await this.alertC.create({
      message: "Signing out <img src='assets/img/ajax_clock_small.gif'>",
      backdropDismiss: false,
    })
   alert.present()
   this.xhr.signout().subscribe((res:any)=>{
    alert.message=res
    alert.buttons=[{
      text:'OK',
      handler:()=>{
        this.route('/login')
      }
    }]
    
   })
  }

  //add customer function
  addcustomer() {
    this.route('/customers')
  }
  custlist() {
    this.route('/custlist')
  }
  addstaff() {
    this.route('/addstaff')
  }
  Stafflist() {
    this.route('/staff-list')
  }
  pending() {
    this.route('/pending')
  }
  funding() {
    this.route('/funding')
  }
  history() {
    this.route('/history')
  }

  groupMgt() {
    this.route('/mgtgroup')
  }
  personalMgt() {
    this.route('/mgtpersonal')
  }
  addbranch() {
    this.route('/addbranch')
  }
  branchlist() {
    this.route('/branchlist')
  }
  progress() {
    this.route('/active-fixed')
  }
  Completed() {
    this.route('/completed-fixed')
  }
  create() {
    this.route('/create-fixed')
  }
  vendors() {
    this.route('/vendors')
  }
  w2w() {
    this.route('/w2w')
  }
  exp() {
    this.route('/exp')
  }
  inc() {
    this.route('/inc')
  }
  accting() {
    this.route('/accounting')
  }
  boc() {
    this.route('/boc')
  }

  open_new_loan() {
    this.presentModal(NewLoanPage)
  }

  open_pending_loan() {
    this.presentModal(PendingLoanPage)
  }

  open_disbursment() {
    this.presentModal(DisbursmentPage)
  }

  open_all_loans() {
    this.presentModal(AllLoansPage)
  }

  open_ongoing_loans() {
    this.presentModal(OngoingPage)
  }

  open_virtual() {
    this.presentModal(VirtualAccountPage)
  }

  accdash() {
    this.route('/accdash')
  }

  backtodashboard() {
    this.route('/home')
  }

  remit() {
    this.route('/remitance')
  }
  bank() {
    this.route('/banks')
  }
  cashacc() {
    this.route('/cashacc')
  }
 
  interbank() {
    this.route('/interbank')
  }
  recon() {
    this.route('/recon')
  }
  tempcust(){
    this.route('/tempcust')
  }
  fixedasset(){
    this.route('/fixedasset')
  }
  intangible(){
    this.route('/intangible')
  }
  capital(){
    this.route('/capital')
  }
  rgdMgt(){
    this.route('/Regular-Fixed-Deposit')
  }
}
