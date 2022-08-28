import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { NetworkService } from '../network.service';

@Component({
  selector: 'app-inc',
  templateUrl: './inc.page.html',
  styleUrls: ['./inc.page.scss'],
})
export class IncPage implements OnInit {
  bal=[0,1];
  items: any;
  staffname=''
url = 'https://agilfinance.net/service/storage/app/public/';
  id:any;
  amount:any;
  payment:any;
  acc_num:any;
  receipt = '';
  pro_show='d-none'
  users='d-none'
  display='d-none';
  dis='d-none';
  diss='d-none'
  disadd='d-none'
  disdel='d-none'
  edituser:any;
  acc_dis='d-none'
  sums:any;
  custid:any;
  sumer:any;
  staff:any;


  //edit fields inputs
 
  constructor(
    public router: Router,
    private Httpnetwork: NetworkService,
    public alertController: AlertController,
  ) {
    this.getIn()
  }

  ngOnInit() {
  }


  backtohome() {
    this.router.navigate(['/home'])
  }
  createIn() {
    this.router.navigate(['/cinc'])
  }
  async getIn(){
    var alert = await this.alertController.create({
      backdropDismiss:false,
      cssClass:'text-center',
      message:"Loading <img src='assets/img/ajax_clock_small.gif'>"
      
 
    })
    alert.present()
    this.Httpnetwork.getIn().subscribe((res: any) => {
      if (res.error) {
        alert.header='Invalid'
        alert.message=res.error
        alert.buttons=['OK']
        alert.present()
      } else {
       
        alert.remove()
        this.items = res;
        for (let index = 0; index < this.items.length; index++) {
          const element = this.items[index];
          this.staff = {
         
          }
          this.edituser={
            'id':element.id,
            'amount':element.amount,
            'date':element.date,
            'inctype':element.inctype,
            'peroid':element.peroid,
            'repeat':element.repeat,
            'desc':element.desc,
            'branch':element.branch,
            'receipt':element.receipt,  
        }
        // this.cv=e.target.value
     }
      }
    }, (error: any) => {
      console.log("Please Check Your Internet Connect")
    })
  }
  async SearchID(data){
    var alert = await this.alertController.create({
      backdropDismiss:false,
      cssClass:'text-center',
      buttons:['OK'],

    })
    if (data.search=='') {
       alert.header="Required";
       alert.message="Search cannot be empty"
       alert.present()
    }else{
      alert.message="Validating Search <img src='assets/img/ajax_clock_small.gif'>"
      alert.buttons=[""]
      alert.present()
      data['id']=this.custid
      this.Httpnetwork.searchIn(data).subscribe((res:any)=>{
        if(!res.error){
          this.items=res
          alert.header="Found";
          alert.message="Search Found"
          alert.buttons=["OK"]
          alert.present()
        }else{
          alert.header="Not Found";
          alert.message=res.error
          alert.buttons=["OK"]
          alert.present()
        }
      },(error:any)=>{

      })
    
     
     
    }
  }
  async fund(e){
     const alert = await this.alertController.create({ 
            message:"loading <img src='assets/img/ajax_clock_small.gif'>",
            backdropDismiss:false,
            cssClass:'text-center'

     })
     alert.present()
    this.Httpnetwork.expStaff(e.target.value).subscribe((res: any) => {
      this.edituser.staffname=res.name
    alert.remove()
    },(error: any)=>{
      console.warn(error)
    })
    this.acc_dis='d-block';
    for (let index = 0; index < this.items.length; index++) {
      const element = this.items[index];
      if (element.id==e.target.value) {
         this.edituser={
          'id':element.id,
          'amount':element.amount,
          'date':element.date,
          'inctype':element.inctype,
          'peroid':element.peroid,
          'repeat':element.repeat,
          'desc':element.desc,
          'branch':element.branch,
          'receipt':element.receipt,
      }
      
    }
   
    // this.cv=e.target.value
 }
}
 
 async wtrw(data){
  var alert = await this.alertController.create({
    message:"Loading <img src='assets/img/ajax_clock_small.gif'>",
    backdropDismiss:false,
    cssClass:'text-center'


  })
  alert.present()
  // console.log(data)
  if (data.amount!='') {
   var formData = new FormData()
   formData.append('amount', data.amount)
   formData.append('id', this.id)
    this.Httpnetwork.resetIn(formData).subscribe((res:any)=>{
    this.items=res

      if(res.error){
       alert.header='Invalid'
       alert.message=res.error
       alert.buttons=['OK']
      }else{
       alert.header='Debit'
       alert.message='Amount Updated Successfully'
       alert.buttons=['OK']
       this.diss='d-none'

      }
    },(error:any)=>{
      
    })
  }else{
    alert.header="Invalid"
    alert.message="All Fields Are Required";
    alert.buttons=['OK']
    alert.present()
  }
}


async del(e){
  this.id = e.target.value
  var alert = await this.alertController.create({
    message:"Loading <img src='assets/img/ajax_clock_small.gif'>",
    backdropDismiss:false,
    cssClass:'text-center'


  })
  alert.present
  this.Httpnetwork.delIn(this.id).subscribe((res:any)=>{
    this.items=res
   alert.header='Success'
   alert.message='Delete Successfully'
   alert.buttons=['OK']
   alert.present()
  })
}
  change(data){
    let value = data.target.value
    let formdata = new FormData()
    formdata.set('id',this.id)
    formdata.set('reoccuring',value)
    if(value=='yes'){
      data.target.value='no'
      data.target.innerText='Stop'
    }else{
      data.target.value='yes'
      data.target.innerText='Start'
    }
    this.Httpnetwork.changeIn(formdata).subscribe((res:any)=>{
      this.items=res
     
    },(error:any)=>{

    })
  }

  withdraw(e){
     this.diss='d-block';
     this.id = e.target.value
     for (let index = 0; index < this.items.length; index++) {
       const element = this.items[index];
       if (element.id==e.target.value) {
          this.edituser={
            'id':element.id,
            'amount':element.amount,
            'date':element.date,
            'inctype':element.inctype,
            'peroid':element.peroid,
            'repeat':element.repeat,
            'desc':element.desc,
            'branch':element.branch,
            'receipt':element.receipt,
       }
       
     }
    
     // this.cv=e.target.value
  }
  }
  

  close1(){ 
    this.display='d-none';
    this.dis='d-none';
    this.diss='d-none';
    this.disadd='d-none'
    this.disdel='d-none'
    this.users='d-none';


  }
  close(){ 
    this.display='d-none';
    this.dis='d-none';
    this.diss='d-none';
    this.acc_dis='d-none'
    this.disadd='d-none'
    this.disdel='d-none'
    this.users='d-none';

  }


}