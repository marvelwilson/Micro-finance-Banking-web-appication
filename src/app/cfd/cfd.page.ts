import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { NetworkService } from '../network.service';



@Component({
  selector: 'app-cfd',
  templateUrl: './cfd.page.html',
  styleUrls: ['./cfd.page.scss'],
})
export class CfdPage implements OnInit {
 
validating='d-none';
preview='d-none';
userinfo:any;
name:any;
acc_type:any;
wallet:any;
rate:any;



  constructor(
    private router : Router,
    private alertC : AlertController,
    public xhr : NetworkService,
  ) { }

  ngOnInit() {
  }
  backtohome(){
    this.router.navigate(['/home']);
  }

  async onMouseout(value){
    var alert = await this.alertC.create({

    })
    this.validating='d-block'
   var formdata = new FormData()
     formdata.set('acc_num', value.target.value)
    this.xhr.fixed(formdata).subscribe((res:any)=>{
      if (res.error) {
      alert.header='Invalid'
      alert.message=res.error
      alert.buttons = ['OK']
      this.validating='d-none'
      alert.present()
      this.validating='d-none'
      this.preview='d-none'
      }else{
      this.validating='d-none'
      this.preview='d-block'
      this.userinfo = res;
      this.wallet=res[0].wallet
      this.name = res[0].name
      this.acc_type = res[0].sub_acc_type+' Savings'
      this.rate=0;
      }
    },(error:any)=>{
      console.log(error)
    })
  }
  async createFixed(data){
    var alert = await this.alertC.create({

    })
    this.xhr.createFixed(data).subscribe((res:any)=>{
     if (res.success) {
      alert.header = 'Success'
      alert.message= res.success;
      alert.buttons = ['Ok']
      alert.present();
      this.validating='d-none'
      this.preview='d-none'
      this.router.navigate(['/active-fixed']);
     }else if(res.error){
      this.validating='d-none'
      this.preview='d-none'
      alert.header = 'Invalid'
      alert.message= res.error;
      alert.buttons = ['Ok']
      alert.present();
     }
    },(error:any)=>{

    })
  }
 async onSubmit(data){
   var alert = await this.alertC.create({

   })
   if (data.amount=='' || data.duration=='' || data.acc_num==''){
        alert.header = 'Invalid'
        alert.message= 'All Field Are Required';
        alert.buttons = ['Ok']
        alert.present();
   }else if(data.amount > this.wallet){
        alert.header = 'Invalid'
        alert.message= 'Amount Exceed Wallet Balance';
        alert.buttons = ['Ok']
        alert.present();
   }else{
    this.rate=data.duration*data.amount/100+data.amount
    alert.header = 'Sum'
    alert.message= 'Total Sum Is: NGN'+this.rate;
    alert.buttons = [
      {
        text:'Cancle',
        role:'cancle',
        handler:()=>{
       
        }
      },
      {
      text:'Confirm',
      role:'confirm',
      cssClass:'text-info',
      handler:()=>{
      this.createFixed(data)
      }
    }
    ]
    alert.present();
   }
 }
}
