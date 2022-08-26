import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NetworkService } from '../network.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-branchlist',
  templateUrl: './branchlist.page.html',
  styleUrls: ['./branchlist.page.scss'],
})
export class BranchlistPage implements OnInit {
  branchlist:any;

  constructor(
    public router: Router,
    private xhr: NetworkService,
    public alertController: AlertController,
  ) {
    this.branches();
   }

  ngOnInit() {
  }
  backtohome() {
    this.router.navigate(['/home'])
  }
  branches(){
      this.xhr.getBranches().subscribe((res:any)=>{
         this.branchlist = res
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
   this.xhr.delBranch(id).subscribe((res:any)=>{
    if (!res.error) {
      this.branchlist = res
    }else if(res.error){
     
    }
   },(error:any)=>{

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
    this.xhr.searchBranches(data).subscribe((res:any)=>{
      if(!res.error){
        this.branchlist=res
        alert.header="Found";
        alert.message="Validation Successful"
        alert.buttons=["OK"]
        alert.present()
      }else{
        alert.header="Not Found";
        alert.message=res.error
        alert.buttons=["OK"]
        alert.present()
        this.branches()
      }
    },(error:any)=>{

    })
  }
}
}
