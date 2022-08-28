import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { NetworkService } from '../network.service';

@Component({
  selector: 'app-fixedasset',
  templateUrl: './fixedasset.page.html',
  styleUrls: ['./fixedasset.page.scss'],
})
export class FixedassetPage implements OnInit {
  items: any;
  edituser: any;
  dis: string;
  newbank='d-none';
  url = 'https://agilfinance.net/service/storage/app/public/';
  specific = 'd-block'
  amount:any;
  acc_cost: number;
  updatebank='d-none';
  name='';
  desc='';
  de_cost='';
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


  backtohome() {
    this.router.navigate(['/home'])
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
          this.desc=e.desc
          this.acc_cost = e.acc_cost
          this.de_cost = e.de_cost
          this.amount = e.book_value
          this.id = e.id
        }
        
       }
      alert.remove()

    }else if(params == 'delete'){
     let formdata = new FormData()
      formdata.set('id',this.id)
      formdata.set('type','fasset')
      this.xhr.delAsset(formdata).subscribe((res:any)=>{
          if (res.success) {
            alert.header='Success'
            alert.message=res.success
            alert.buttons = ['OK']
            alert.present()
            this.updatebank='d-none'
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
      let formdata = new FormData()
      formdata.set('name',this.name)
      formdata.set('desc',this.desc)
      formdata.set('acc_cost',String(this.acc_cost))
      formdata.set('de_cost',this.de_cost)
      formdata.set('receipt_type', 'fasset')
      formdata.set('id',this.id)

       this.xhr.updateAsset(formdata).subscribe((res:any)=>{
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
  this.xhr.getbanks('fasset').subscribe((res: any) => {
    
    this.items = res.asset;

    if (res.error) {
      alert.header = 'Failed'
      alert.message = res.error,
        alert.buttons = ['OK']
    } else {
      alert.remove()
    }
  }, (error: any) => {
    console.log("Please Check Your Internet Connect")
  })
}



getValue(params, values){
  let ad = 0;
 if (params=='acc_cost') {
   this.acc_cost=values.target.value
 }else if(params=='ad'){
    ad= values.target.value
    this.amount = this.acc_cost-ad
 }

}

async onSubmit(data) {
  var alert = await this.alertController.create({
    message: "Loading <img src='assets/img/ajax_clock_small.gif'>",
    backdropDismiss: false,
  })
  alert.present();
   data.receipt_type='fasset'
  this.xhr.asset(data).subscribe((res: any) => {
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
        alert.message=`${!resErr.name?'':resErr.name[index]+'</br>'}
        ${!resErr.desc?'':resErr.desc[index]+'</br>'}
        ${!resErr.acc_cost?'':resErr.acc_cost[index]+'</br>'}
        ${!resErr.de_cost?'':resErr.de_cost[index]+'</br>'}`;
        alert.buttons=['OK']
        alert.present();
      }
     
    } 
  })
}

  async Search(data) {
    var alert = await this.alertController.create({
      header: '',
      message: '',
      buttons: ['OK'],

    })
    if (data.search == '') {
      alert.header = "Required";
      alert.message = "Search field cannot be empty"
      alert.present()
    } else if (data.search_type == '') {
      alert.header = "Required";
      alert.message = "Search Type Option cannot be empty"
      alert.present()
    } else {
      alert.header = "Validating";
      alert.message = "Validating Search<img src='assets/img/ajax_clock_small.gif'>"
      alert.buttons = [""]
      alert.present()
      this.xhr.Search(data).subscribe((res: any) => {
        if (!res.error) {
          this.items = res
          alert.header = "Found";
          alert.message = "Validation Successful"
          alert.buttons = ["OK"]
          alert.present()
        } else {
          alert.header = "Not Found";
          alert.message = res.error
          alert.buttons = ["OK"]
          alert.present()
          this.getbanks()
        }
      }, (error: any) => {

      })
    }
  }

  
  bunb(e) {
    var id = e.target.value;
    this.xhr.bunb(id).subscribe((res: any) => {
      if (res.block) {
        e.target.innerText = 'block'
        e.target.setAttribute('class', 'btn btn-danger')
      } else if (res.unblock) {
        e.target.innerText = 'unblock'
        e.target.setAttribute('class', 'btn btn-warning')
      }
    }, (error: any) => {

    })
  }
  close() {
    this.newbank = 'd-none';
    this.updatebank = 'd-none';

    this.dis = 'd-none';
  }
}