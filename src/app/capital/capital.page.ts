import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { NetworkService } from '../network.service';

@Component({
  selector: 'app-capital',
  templateUrl: './capital.page.html',
  styleUrls: ['./capital.page.scss'],
})
export class CapitalPage implements OnInit {
  items: any;
  newbank = 'd-none';
  updatebank= 'd-none'
  url = 'https://agilfinance.net/service/storage/';
  specific = 'd-block'
  name='';
  date='';
  amount='';
  id='';

  constructor(
    public router: Router,
    private xhr: NetworkService,
    public alertController: AlertController,
  ) {
    this.getbanks()
  }

  ngOnInit() {
  }



  async modals(params, useful) {
    var alert = await this.alertController.create({
      message: "Loading <img src='assets/img/ajax_clock_small.gif'>",
      backdropDismiss: false,
    })
    alert.present()
    if (params == 'newbank') {
      this.newbank = 'd-block'
      alert.remove()
    }else if(params == 'edit'){
      this.updatebank = 'd-block'
       let id = useful.target.value;
       for (let i = 0; i < this.items.length; i++) {
        const e = this.items[i];
        if (e.id==id) {
          this.name=e.name
          this.date=e.date
          this.amount = e.amount
          this.id = e.id
        }
        
       }
      alert.remove()

    }else if(params == 'delete'){
     alert.remove()
      this.xhr.delbank(this.id).subscribe((res:any)=>{
          if (res.success) {
            alert.header='Success'
            alert.message=res.success
            alert.buttons = ['OK']
            alert.present()
            this.getbanks()
          }else{
            alert.header='Failed'
            alert.message=res.error
            alert.buttons = ['OK']
            alert.present()
          }
      })
    }
    else if(params == 'update'){
      alert.remove()
      let formdata = new FormData()
      formdata.set('name',this.name)
      formdata.set('date',this.date)
      formdata.set('amount',this.amount)
      formdata.set('acc_type','capital')
      formdata.set('id',this.id)

       this.xhr.updatebank(formdata).subscribe((res:any)=>{
           if (res.success) {
             alert.header='Success'
             alert.message=res.success
             alert.buttons = ['OK']
             this.items=res.banks
             alert.present()
           }else{
             alert.header='Failed'
             alert.message=res.error
             alert.buttons = ['OK']
             alert.present()
           }
       },(error:any)=>{
        if(error.status==422){
          
          var le =[ error.error.message]
          var resErr= error.error.errors;
          for (let index = 0; index < le.length; index++) {
            alert.header='Invalid'
            alert.subHeader=error.error.message
            alert.message=`${!resErr.date?'':resErr.date[index]+'</br>'}
            ${!resErr.name?'':resErr.name[index]+'</br>'}
            ${!resErr.amount?'':resErr.amount[index]+'</br>'}`;
            alert.buttons=['OK']
            alert.present();
          }
         
        } 
       })
     }
  }
  async getbanks() {
    var alert = await this.alertController.create({
      message: "Loading <img src='assets/img/ajax_clock_small.gif'>",
      backdropDismiss: false,
    })
    alert.present();
    this.xhr.getbanks('capital').subscribe((res: any) => {
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



  async onSubmit(data) {
    var alert = await this.alertController.create({
      message: "Loading <img src='assets/img/ajax_clock_small.gif'>",
      backdropDismiss: false,
    })
    alert.present();
     data.acc_type='capital'
    this.xhr.bank(data).subscribe((res: any) => {
      if (!res.error) {
        this.items = res.banks;
        alert.header = "Success";
        alert.message = res.success
        alert.buttons = ["OK"]
        alert.present()
      } else {
        alert.header = "Failed";
        alert.message = res.error
        alert.buttons = ["OK"]
        alert.present()
      }
    }, (error: any) => {
      if(error.status==422){
          
        var le =[ error.error.message]
        var resErr= error.error.errors;
        for (let index = 0; index < le.length; index++) {
          alert.header='Invalid'
          alert.subHeader=error.error.message
          alert.message=`${!resErr.date?'':resErr.date[index]+'</br>'}
          ${!resErr.name?'':resErr.name[index]+'</br>'}
          ${!resErr.amount?'':resErr.amount[index]+'</br>'}`;
          alert.buttons=['OK']
          alert.present();
        }
       
      } 
    })
  }



  close() {
    this.newbank = 'd-none';
    // this.dis = 'd-none';
    this.updatebank = 'd-none'

  }
}