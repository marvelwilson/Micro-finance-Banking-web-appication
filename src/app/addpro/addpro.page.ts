import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { NetworkService } from '../network.service';

@Component({
  selector: 'app-addpro',
  templateUrl: './addpro.page.html',
  styleUrls: ['./addpro.page.scss'],
})
export class AddproPage implements OnInit {

  validating='d-none';
  preview='d-none';
  userinfo:any;
  name:any;
  acc_type:any;
  wallet:any;
  rate:any;
  permit: string;
  file_properties:any;
  
  
    constructor(
      private router : Router,
      private alertC : AlertController,
      public xhr : NetworkService,
    ) { }
  
    ngOnInit() {
    }
    backtohome(){
      this.router.navigate(['/boc']);
    }
    pimage(e){
     this.file_properties = e.target.files[0]
    }
    async onSubmit(data){
      var alert = await this.alertC.create({
        message:"Loading <img src='assets/img/ajax_clock_small.gif'>",
        backdropDismiss:false,
        cssClass:'text-center'
    
    
      })
      alert.present()
      var datas = new FormData()
     datas.append('filename',this.file_properties) 
     datas.append('ptype',data.ptype)
     datas.append('pimage',data.pimage) 
     datas.append('pname',data.pname) 
     datas.append('pbrand',data.pbrand) 
     datas.append('amount',data.amount) 
     datas.append('pcat',data.pcat)

      this.xhr.addPro(datas).subscribe((res:any)=>{
        if(res.error){
          alert.header='Invalid'
          alert.message=res.error
          alert.buttons=['OK']
          alert.present()

         }else if(res.success){
            alert.header='Success'
            alert.message=res.success
            alert.buttons=['OK']
            alert.present()
           }
      },(error:any)=>{
        if(error.status==422){
          
          var le =[ error.error.message]
          var resErr= error.error.errors;
          for (let index = 0; index < le.length; index++) {
            alert.header='Invalid'
            alert.subHeader=error.error.message
            alert.message=`${!resErr.pcat?'':resErr.pcat[index]+'</br>'}
            ${!resErr.ptype?'':resErr.ptype[index]+'</br>'}
            ${!resErr.pbrand?'':resErr.pbrand[index]+'</br>'}
            ${!resErr.pname?'':resErr.pname[index]+'</br>'}
            ${!resErr.amount?'':resErr.amount[index]+'</br>'}
            ${!resErr.pimage?'':resErr.pimage[index]+'</br>'}`

            alert.buttons=['OK']
            alert.present();
          }
         
        } 
      })
    }
  }
