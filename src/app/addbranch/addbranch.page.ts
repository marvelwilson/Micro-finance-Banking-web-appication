import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { NetworkService } from '../network.service';

@Component({
  selector: 'app-addbranch',
  templateUrl: './addbranch.page.html',
  styleUrls: ['./addbranch.page.scss'],
})
export class AddbranchPage implements OnInit {
state:any;
err:any;
  constructor(
    private router: Router,
    private alertcon: AlertController,
    private xhr: NetworkService,

  ) { 
    this.states()
  }

  ngOnInit() {
  }
  backtohome(){
   this.router.navigate(['/home'])
  }

  async onSubmit(data){
    console.log(data)
    let alert = await this.alertcon.create({
      header:'',
      message:'',
      buttons:['Ok']
    })
   
       this.xhr.addbranch(data).subscribe((res:any)=>{
             if (res.msg=='success') {
              alert.header='Sucess'
              alert.message='Successfully Added A branch';
              alert.buttons=['OK']
              alert.present()
             }else{
              alert.header='Invalid'
              alert.message='An Error Occured Try Again';
              alert.buttons=['OK']
              alert.present()
             }
            

       },(error:any)=>{
          // this.err = {
          //   "bstate":error.error
          // }
        if(error.status==422){
          
          var le =[ error.error.message]
          var resErr= error.error.errors;
          for (let index = 0; index < le.length; index++) {
            alert.header='Invalid'
            alert.subHeader=error.error.message
            alert.message=`${!resErr.bstate?'':'(State)'+resErr.bstate[index]+'</br>'}
            ${!resErr.ba?'':'(Branch Address)'+resErr.ba[index]+'</br>'}
            ${!resErr.bn?'':'(Branch Number)'+resErr.bn[index]+'</br>'}
            ${!resErr.bod?'':'(branch Opening Date)'+resErr.bod[index]}`;
            alert.present();
          }
         
        } 
       })
    
  }
states(){
  this.state = [
    "Abia",
    "Adamawa",
    "Akwa Ibom",
    "Anambra",
    "Bauchi",
    "Bayelsa",
    "Benue",
    "Borno",
    "Cross River",
    "Delta",
    "Ebonyi",
    "Edo",
    "Ekiti",
    "Enugu",
    "FCT - Abuja",
    "Gombe",
    "Imo",
    "Jigawa",
    "Kaduna",
    "Kano",
    "Katsina",
    "Kebbi",
    "Kogi",
    "Kwara",
    "Lagos",
    "Nasarawa",
    "Niger",
    "Ogun",
    "Ondo",
    "Osun",
    "Oyo",
    "Plateau",
    "Rivers",
    "Sokoto",
    "Taraba",
    "Yobe",
    "Zamfara"
  ]
}
}
