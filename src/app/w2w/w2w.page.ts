import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { NetworkService } from '../network.service';

@Component({
  selector: 'app-w2w',
  templateUrl: './w2w.page.html',
  styleUrls: ['./w2w.page.scss'],
})
export class W2wPage implements OnInit {

  validating='d-none';
  preview='d-none';
  userinfo:any;
  name:any;
  acc_type:any;
  wallet:any;
  rate:any;
  permit: string;
  
  
  
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
  
    async onSubmit(data){
      var alert = await this.alertC.create({
        message:"Loading <img src='assets/img/ajax_clock_small.gif'>",
        backdropDismiss:false,
        cssClass:'text-center'
    
    
      })
      alert.present()
        data.permit=this.permit
      this.xhr.W2w(data).subscribe((res:any)=>{
        if(res.error){
          alert.header='Invalid'
          alert.message=res.error
          alert.buttons=['OK']
          alert.present()

         }else{
           if(res.confirm){
            alert.header='Confirm'
            alert.message=`${res.confirm}<br>Sender's Name: <strong>${res.sender.name}</strong> <br> Beneficiary Name: <strong>${res.beneficiary.name} Transfering NGN${data.amount}</strong>`
            alert.buttons=[{
              text:'Cancle',
              cssClass:'text-danger'
            },{
              text:'Confirm',
              cssClass:'btn btn-dark',
              handler:()=>{
                this.permit='pass'
                this.onSubmit(data)
              }
            }]
            alert.present()
           }else if(res.success){
            alert.header='Credited'
            alert.message='Account has being Credited Successfully'
            alert.buttons=['OK']
            alert.present()
           }
           
         }
      },(error:any)=>{
        if(error.status==422){
          
          var le =[ error.error.message]
          var resErr= error.error.errors;
          for (let index = 0; index < le.length; index++) {
            alert.header='Invalid'
            alert.subHeader=error.error.message
            alert.message=`${!resErr.des_acc_num?'':resErr.des_acc_num[index]+'</br>'}
            ${!resErr.des_acc_type?'':resErr.des_acc_type[index]+'</br>'}
            ${!resErr.own_acc_num?'':resErr.own_acc_num[index]+'</br>'}
            ${!resErr.own_acc_type?'':resErr.own_acc_type[index]+'</br>'}
            ${!resErr.amount?'':resErr.amount[index]+'</br>'}`
            alert.buttons=['OK']
            alert.present();
          }
         
        } 
      })
    }
  }
  
