import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { NetworkService } from '../network.service';

@Component({
  selector: 'app-cashacc',
  templateUrl: './cashacc.page.html',
  styleUrls: ['./cashacc.page.scss'],
})
export class CashaccPage implements OnInit {
  branchlist:any;
  items: any;

  constructor(
    public router: Router,
    private xhr: NetworkService,
    public alertController: AlertController,
  ) {
    this.branches();
   }

  ngOnInit() {
    this.getbanks()
  }
  open_staff() {
    this.router.navigate(['/staff-list'])
  }
  branches(){
      this.xhr.getBranches().subscribe((res:any)=>{
         this.branchlist = res
      },(error:any)=>{

      })
  }
  async getbanks() {
    var alert = await this.alertController.create({
      message: "Loading <img src='assets/img/ajax_clock_small.gif'>",
      backdropDismiss: false,
    })
    alert.present();
    this.xhr.getbanks('cashiers').subscribe((res: any) => {
      if (res.error) {
        alert.header='Failed'
        alert.message=res.error,
        alert.buttons=['OK']
        this.items = res.banks;
      } else { 
        this.items = res.banks;
        console.log(this.items)
        alert.remove()
      }
    }, (error: any) => {
      console.log("Please Check Your Internet Connect")
    })
  }
 

}