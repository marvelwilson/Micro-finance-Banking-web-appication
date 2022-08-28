import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { stringify } from 'querystring';
import { NetworkService } from '../network.service';

@Component({
  selector: 'app-remitance',
  templateUrl: './remitance.page.html',
  styleUrls: ['./remitance.page.scss'],
})
export class RemitancePage implements OnInit {
  items: any;
  cashiers: any;
  edituser: any;
  dis: string;
  newbank = 'd-none';
url = 'https://agilfinance.net/service/storage/app/public/';
  specific = 'd-block'
  thrift: any;
  payer_names: any;
  amounts:Number;
  payers = ''
  datas: any;
  updatebank = 'd-none';

  recieved_in='';
  payer='';
  payer_name='';
  desc='';
  amount='';
  id=''
  constructor(
    public router: Router,
    private xhr: NetworkService,
    public alertController: AlertController,
  ) {

  }

  ngOnInit() {
    this.getbanks()
  }


  backtohome() {
    this.router.navigate(['/home'])
  }

  async modals(params, useful) {
    var alert = await this.alertController.create({
      message: "Loading <img src='assets/img/ajax_clock_small.gif'>",
      backdropDismiss: false,
    })
    alert.present();
    if (params == 'newbank') {
      this.newbank = 'd-block'
      alert.remove()
    } else if (params == 'payer') {
      this.payers= useful.target.value
      if (this.payers== 'Thrift') {
        this.payer_names = this.thrift
      } else if (this.payers== 'customer') {
        this.payer_names = this.items
      }
      alert.remove()
    

    } else if (params == 'payer_name') {
         let id = useful.target.value
      if (this.payers== 'Thrift') {
      
      this.xhr.getAmount(id).subscribe((res: any) => {
        if (res.error) {
           alert.header='Failed'
           alert.message=res.error
           alert.buttons=['OK']
           alert.present()
           this.amounts=0
        } else {
      alert.remove()

         let expense=0
         let withdraw=0
         let deposit=0
         for (let i = 0; i < res.trans.length; i++) {
             const ele = res.trans[i];
          if(ele.transType=='Withdraw'){
           withdraw+=Number(ele.amount)
         }else if(ele.transType=='Deposit'){
          deposit+=Number(ele.amount)
         }
        }
        for (let i = 0; i < res.exp.length; i++) {
          const ele = res.trans[i];
          expense+=Number(ele.amount)
      
     }
     this.amounts=deposit-(withdraw-expense)
      }
      }, (error: any) => {

      })
    } else if (this.payers== 'customer') {
      let cust_amount=0
      for (let i = 0; i < this.payer_names.length; i++) {
        const ele = this.payer_names[i];
        if (id==ele.id) {
          cust_amount=Number(ele.amount)
          }
      }
      if (cust_amount==0) {
        alert.message='Not Remitable'
        alert.buttons=['OK']
        alert.present()
        this.amounts=cust_amount
      }else{
        this.amounts=cust_amount
        alert.remove()

      }
    }
    }else if(params == 'edit'){
      this.updatebank = 'd-block'
       let id = useful.target.value;
       for (let i = 0; i < this.datas.length; i++) {
        const e = this.datas[i];
        if (e.id==id) {
          if (e.payer=='Thrift') {
            this.payer_names=this.thrift;
          }else if(e.payer=='customer'){
            this.payer_names = this.items
          }
          this.recieved_in=e.recieved_in
          this.payer=e.payer
          this.desc=e.desc
          this.amounts = e.amount
          this.payer_name = e.userid
          this.id = e.id
          console.log(this.payer_names)
        }
        
       }
      alert.remove()

    }else if(params == 'update'){
     
       let formdata = new FormData()
       let amount = String(this.amounts)
       formdata.set('amount', amount)
       formdata.set('recieved_in', this.recieved_in)
       formdata.set('payer', this.payer)
       formdata.set('desc', this.desc)
       formdata.set('payer_name', this.payer_name)
       formdata.set('id', this.id)
       formdata.set('receipt_type', 'cash at hand')
       formdata.set('update_type', 'receipt')
       
      this.xhr.updatebank(formdata).subscribe((res: any) => {
        if (res.success) {
          alert.header = "Success";
          alert.message = res.success;
          alert.buttons = ["OK"];
          alert.present()
          this.getbanks()
        } else {
          alert.header = "Failed";
          alert.message = res.error
          alert.buttons =  ["OK"];
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
  
  }
 
  async onSubmit(data) {
    var alert = await this.alertController.create({
      message: "Loading <img src='assets/img/ajax_clock_small.gif'>",
      backdropDismiss: true,
    })
    alert.present();
     data.receipt_type='cash at hand'
     data.amount=this.amounts
    this.xhr.remit(data).subscribe((res: any) => {
      if (!res.error) {
        this.items = res.banks;
        alert.header = "Success";
        alert.message = 'Remited Successfully';
        alert.buttons = ["OK"];
        alert.present()
      } else {
        alert.header = "Failed";
        alert.message = res.error
        alert.buttons =  ["OK"];
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

  async getbanks() {
    var alert = await this.alertController.create({
      message: "Loading <img src='assets/img/ajax_clock_small.gif'>",
      backdropDismiss: false,
    })
    alert.present();
    this.xhr.getbanks('receipts').subscribe((res: any) => {
      this.thrift = res.pos_vendor;
      this.cashiers = res.cashier;
      this.items = res.customers;

      if (res.error) {
        alert.header = 'Failed'
        alert.message = res.error,
          alert.buttons = ['OK']
      } else {
        this.datas = res.banks
        alert.remove()
      }
    }, (error: any) => {
      console.log("Please Check Your Internet Connect")
    })
  }



  close() {
    this.newbank = 'd-none';
    this.dis = 'd-none';
    this.updatebank = 'd-none';


  }
}

