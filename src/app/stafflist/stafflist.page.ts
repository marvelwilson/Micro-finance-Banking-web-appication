import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NetworkService } from '../network.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-stafflist',
  templateUrl: './stafflist.page.html',
  styleUrls: ['./stafflist.page.scss'],
})
export class StafflistPage implements OnInit {
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
  profile="";
  branchlist: any;




  constructor(
    public router: Router,
    private Httpnetwork: NetworkService,
    public alertController: AlertController,
  ) {
    this.getStaff()
    this.branches();
  }

  ngOnInit() {
  }


  backtohome() {
    this.router.navigate(['/home'])
  }
  branches(){
    this.Httpnetwork.getBranches().subscribe((res:any)=>{
       this.branchlist = res
    },(error:any)=>{

    })
}
  async getStaff() {
    var alert = await this.alertController.create({
      message: "Loading <img src='assets/img/ajax_clock_small.gif'>",
      cssClass: 'text-center'
    })
    alert.present()
    this.users = JSON.parse(localStorage.getItem('userid')).user;
    this.Httpnetwork.getStaff().subscribe((res: any) => {
      if (res == "error") {
        console.log("")
       alert.remove()
      } else {
        this.items = res;
        console.log(this.items)
      }
    }, (error: any) => {
      alert.message="Please Check Your Internet Connect"
      alert.buttons=['OK']
      alert.present()
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
      this.Httpnetwork.searchStaff(data).subscribe((res:any)=>{
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
          this.getStaff()
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
  
  async actions(e){
    console.log(e.target.value)
     
    var alert = await this.alertController.create({
      header:'Confirm Action',
      message:'You are about to delete user with ID:#'+e.target.value,
      buttons:[
        {
          text:'Cancel',
          role:'cancle',
          cssClass:'text-danger',
          handler:()=>{
            console.log(e.target.value)
          }
        }
      ],

    })
    alert.present();
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
    this.Httpnetwork.delStaff(id).subscribe((res:any)=>{
     if (!res.error) {
       this.items = res
     }else if(res.error){
     
     }
    },(error:any)=>{

    })
  }

  view(e){
     this.display='d-block';
     this.cv=e.target.value
  }

  edit(e){
    this.dis='d-block';
    for (let index = 0; index < this.items.length; index++) {
      const element = this.items[index];
      if (element.id==e.target.value) {
        this.id=element.id
        this.name=element.name
        this.email=element.email
        this.phone=element.phone
        this.gender=element.gender
        this.role=element.acc_type
        this.branch=element.address
        this.profile=element.profile
       
    }
   
    // this.cv=e.target.value
 }
}

 
  close(){
    this.display='d-none';
    this.dis='d-none';

  }

  async onSubmit(){
  var alert = await this.alertController.create({
    header:'Warning',
    message:'All fields are required',
    backdropDismiss:false,
    cssClass:'text-center',
    buttons:['Ok']
  })
  if(!this.name){
    alert.message='Name Field is required'
    alert.present()
  }else if(!this.email){
    alert.message='Email Field is required'
    alert.present()
  }else if(!this.phone){
    alert.message='Phone Number Field is required'
    alert.present()
  }else{
    var formData = new FormData()
    formData.set('name',this.name)
    formData.set('phone',this.phone)
    formData.set('email',this.email)
    formData.set('gender',this.gender)
    formData.set('branch', this.branch)
    formData.set('role', this.role)
    formData.set('id', this.id)
    this.Httpnetwork.editStaff(formData).subscribe((res:any)=>{
      console.log("SUCCESS===",res);
      if (res.error) {
        alert.message=res.error
        alert.present()
      }else if(!res.error){ 
        alert.header='Success'
        alert.message='Account Has Being Updated <strong>Successfully</strong>'
        alert.present()
        this.items=res
      }
    },(error: any)=>{
      console.warn("Please Check Your Internet Connect")
    })
  }
  }
}
