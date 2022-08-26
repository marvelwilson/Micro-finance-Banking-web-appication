import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NetworkService } from '../network.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-addstaff',
  templateUrl: './addstaff.page.html',
  styleUrls: ['./addstaff.page.scss'],
})
export class AddstaffPage implements OnInit {
  profiles='assets/img/passport.jpeg'
  cvs='assets/img/signature.png'
  setprofile=''
  setcv=''
  response:any;
  branchlist:any;

  constructor(
    private router: Router,
    public Httpnetwork: NetworkService,
    public alertC: AlertController
  ) {
    this.branches()
   }

  ngOnInit() {
  }

  branches(){
    this.Httpnetwork.getBranches().subscribe((res:any)=>{
       this.branchlist = res
    },(error:any)=>{

    })
}

  backtohome(){
    this.router.navigate(['/home'])
  }

  profile(e){
    if (e.target.files) {
      var reader = new FileReader();
      reader.readAsDataURL(e.target.files[0]);
      reader.onload=(event:any)=>{
        this.profiles=event.target.result;
      }
      this.setprofile=e.target.files[0]
    }
  }

  cv(e){
    if (e.target.files) {
      var reader = new FileReader();
      reader.readAsDataURL(e.target.files[0]);
      reader.onload=(event:any)=>{
        this.cvs=event.target.result;
      }
     this.setcv=e.target.files[0]
    }
  }
  async onSubmit(data){
    var alert = await this.alertC.create({
      message: "Loading <img src='assets/img/ajax_clock_small.gif'>",
      cssClass: 'text-center'


    })
    alert.present()
    var formData = new FormData()
    formData.set('name',data.name)
    formData.set('profile',this.setprofile)
    formData.set('phone',data.phone)
    formData.set('email',data.email)
    formData.set('gender',data.gender)
    formData.set('password',data.password)
    formData.set('password_confirm',data.password_confirm)
    formData.set('branch', data.branch)
    formData.set('role', data.role)
    formData.set('cv', this.setcv)
    this.Httpnetwork.RegStaff(formData).subscribe((res:any)=>{
     
      if (res=="error") {
        this.response="username or password is incorrect"
        alert.remove();
      }else{
         alert.header='Success'
         alert.message="Staff Created Successully"
         alert.present();
      }
    },(error: any)=>{
      if(error.status==422){
          
        var le =[ error.error.message]
        var resErr= error.error.errors;
        for (let index = 0; index < le.length; index++) {
          alert.header='Invalid'
          alert.subHeader=error.error.message
          alert.message=`${!resErr.profile?'':resErr.profile[index]}</br>
          ${!resErr.name?'':resErr.name[index]}</br>
          ${!resErr.phone?'':resErr.phone[index]}</br>
          ${!resErr.email?'':resErr.email[index]}</br>
          ${!resErr.gender?'':resErr.gender[index]}</br>
          ${!resErr.password?'':resErr.password[index]}</br>
          ${!resErr.branch?'':resErr.branch[index]}</br>
          ${!resErr.role?'':resErr.role[index]}</br>
          ${!resErr.cv?'':resErr.cv[index]}`;
          alert.present();
        }
       
      } 
    })
  }
}
