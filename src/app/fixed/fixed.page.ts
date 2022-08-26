import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NetworkService } from '../network.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-fixed',
  templateUrl: './fixed.page.html',
  styleUrls: ['./fixed.page.scss'],
})
export class FixedPage implements OnInit {

  details:any;
  constructor(
    private router: Router,
    public xhr: NetworkService,
    private alertC: AlertController,

  ) { 
    this.getCFixed();
  }

  ngOnInit() {
  }
  backtohome(){
    this.router.navigate(['/home'])
  }
  async onSubmit(data){
    var alert = await this.alertC.create({
      header:'Searching',
      message:'Loading Data.....'
      
    })
    alert.present()
    if (data.acc_num=="") {
       alert.header='Required'
       alert.message='Account Number Field Is Required'
       alert.buttons = ['OK']
       alert.present()
    }
    this.xhr.searchCFixed(data).subscribe((res:any)=>{
       if(res.error){
       alert.header='Invalid'
       alert.message=res.error
       alert.buttons = ['OK']
       alert.present()
       }else{
        alert.header='Found'
        alert.message="Fixed Depost Was Found Successfuly"
        alert.buttons = ['OK']
        alert.present()
         this.details=res
       }
    },(error:any)=>{

    })
  }
  async getCFixed(){
    var alert = await this.alertC.create({
      header:'Request',
      message:'Loading Data.....'

    })
    alert.present()
     this.xhr.getCFixed().subscribe((res:any)=>{
           if (res.error) {
            alert.header='Invalid',
            alert.message=res.error
            alert.present()
           }else{
              this.details = res;
              alert.header='Found',
              alert.message="Active Fixed Deposit Was Found";
              alert.buttons = ['OK']
              alert.present()
           }
     },(error:any)=>{

     })
  }
}
