import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NetworkService } from '../network.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-pending',
  templateUrl: './pending.page.html',
  styleUrls: ['./pending.page.scss'],
})
export class PendingPage implements OnInit {

  items: any;
  users: any;
url = 'https://agilfinance.net/service/storage/';
  cv:any;
  display='d-none';
  dis='d-none';
  edituser:any;

  //edit fields inputs
  name='';
  email="";
  phone="";
  gender="";
  role="";
  branch="";
  id="";



  constructor(
    public router: Router,
    private Httpnetwork: NetworkService,
    public alertController: AlertController,
  ) {
    this.Pendings()
  }

  ngOnInit() {
  }


  backtohome() {
    this.router.navigate(['/home'])
  }
  Pendings() {

    this.users = JSON.parse(localStorage.getItem('userid')).user;
    this.Httpnetwork.Pendings().subscribe((res: any) => {
      if (res == "error") {
        console.log("")
      } else {
        this.items = res;
        for (let index = 0; index < this.items.length; index++) {
          const element = this.items[index];
          this.edituser={
            'passport':element.passport,
            'name':element.name,
            'email':element.email,
            'phone':element.phone,
            'gender':element.gender,
            'signature':element.signature,
            'acc_type':element.acc_type,
            'sub_acc':element.sub_acc_type,
            'dob':element.dob,
            'address':element.address,
            'status':element.status,
            'acc_num':element.acc_num,
       }
       
        // this.cv=e.target.value
     }
      }
    }, (error: any) => {
      console.log("Please Check Your Internet Connect")
    })
  }
  async Search(data){
    var alert = await this.alertController.create({
      header:'',
      message:'',
      buttons:['OK'],

    })
    if (data.search=='') {
       alert.header="Required";
       alert.message="Search field cannot be empty"
       alert.present()
    }else if(data.search_type==''){
      alert.header="Required";
      alert.message="Search Type Option cannot be empty"
      alert.present()
    }else{
      alert.header="Validating";
      alert.message="Validating Search<img src='assets/img/ajax_clock_small.gif'>"
      alert.buttons=[""]
      alert.present()
      this.Httpnetwork.searchPends(data).subscribe((res:any)=>{
        if(!res.error){
          this.items=res
          alert.header="Found";
          alert.message="Validation Successful"
          alert.buttons=["OK"]
          alert.present()
        }else{
          alert.header="Not Found";
          alert.message=res.error
          alert.buttons=["OK"]
          alert.present()
          this.Pendings()
        }
      },(error:any)=>{

      })
    }
  }
  bunb(e){
    console.log(e)
    var id = e.target.value;
    this.Httpnetwork.bunbStaff(id).subscribe((res:any)=>{
     if (res.block) {
      e.target.innerText='block'
      e.target.setAttribute('class','btn btn-danger')
     }else if (res.unblock) {
      e.target.innerText='unblock'
      e.target.setAttribute('class','btn btn-warning')
     }
    },(error:any)=>{

    })
  }
  
 
  async confirm(e){
     var id = e.target.value
    var alert = await this.alertController.create({
      header:'Confirm Action',
      message:'You are about to delete user with ID:#'+e.target.value,
      buttons:[
        {
          text:'Cancel',
          role:'cancle',
          cssClass:'text-warning',
          handler:()=>{
            console.log(e.target.value)
          }
        },
        {
          text:'Confirm',
          role:'confirm',
          cssClass:'text-danger',
          handler:()=>{
            this.delete(id)
          }
        }
      ],

    })
    alert.present();
  }
  delete(id){
    this.Httpnetwork.delPendings(id).subscribe((res:any)=>{
     if (!res.error) {
       this.items = res
     }else if(res.error){
      
     }
    },(error:any)=>{

    })
  }

  activate(e){
    var id = e.target.value
    this.Httpnetwork.activate(id).subscribe((res:any)=>{
     if (!res.error) {
       this.items = res
     }else if(res.error){
      
     }
    },(error:any)=>{

    })
  }

  view(e){
    this.dis='d-block';
    for (let index = 0; index < this.items.length; index++) {
      const element = this.items[index];
      if (element.id==e.target.value) {
         this.edituser={
           'passport':element.passport,
           'name':element.name,
           'email':element.email,
           'phone':element.phone,
           'gender':element.gender,
           'signature':element.signature,
           'acc_type':element.acc_type,
           'sub_acc':element.sub_acc_type,
           'dob':element.dob,
           'address':element.address,
           'status':element.status,
           'acc_num':element.acc_num,
      }
    }
   
    // this.cv=e.target.value
 }
}

 
  close(){
    this.display='d-none';
    this.dis='d-none';

  }

}
