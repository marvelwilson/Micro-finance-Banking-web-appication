import { Component, OnInit } from '@angular/core';
import { NetworkService } from '../network.service';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-addgroup',
  templateUrl: './addgroup.page.html',
  styleUrls: ['./addgroup.page.scss'],
})
export class AddgroupPage implements OnInit {
  icon='assets/img/passport.jpeg'
  url=''
  display='d-none'
  branchlist:any;
  stafflist:any;
  amount:any;
  permit=''
  al =''
  val2='d-none'
  constructor(
    private router: Router,
    public xhr: NetworkService,
    private alertC: AlertController,

  ) {
    this.branches()
   }

  ngOnInit() {
  }

  backtohome(){
    this.router.navigate(['/home']);
  }
  async provideOfficer(data){
    var alert = await this.alertC.create({
       header:'',
       message:'please wait... <img src="assets/img/ajax_clock_small.gif">',
    })
    alert.present()
   var formdata = new FormData()
   formdata.set('id',data.target.value);
    this.xhr.getStf(formdata).subscribe((res:any)=>{
      if (res.error) {
        alert.header='Invalid'
        alert.message=res.error
        alert.buttons=['OK']
        alert.present()
      }else{
      this.stafflist = res
      alert.remove()
      }
   },(error:any)=>{

   }) 
  }
   accType(data){
   
    if (data.target.value=='30') {
       this.display='d-block'
      this.val2='d-none'

       this.amount=''
    }else if (data.target.value=='22') {
      this.amount = ''
      this.val2='d-block'
      this.display='d-none'
    }else if (data.target.value=='11') {
      this.amount = '2000'
      this.display='d-none'
      this.val2='d-none'
    
  }
}
  async branches(){
    var alert = await this.alertC.create({
      header:'',
      message:'please wait... <img src="assets/img/ajax_clock_small.gif">',
   })
    this.xhr.getBranches().subscribe((res:any)=>{
       this.branchlist = res
       alert.remove()
    },(error:any)=>{

    })
}
  icons(e){
    if (e.target.files) {
      var reader = new FileReader();
      reader.readAsDataURL(e.target.files[0]);
      reader.onload=(event:any)=>{
        this.icon=event.target.result;
      }
      this.url=e.target.files[0]
    }
  }
  async cal(data){
    var alert = await this.alertC.create({
      header:'',
      message:'',
   })
   
       alert.header="Group Illustration"
       alert.message=`Group Pay in Start's ${data.startDate}, Ends After ${data.gtype*10} Days <br>
        And Fixed Amount Is ${this.amount}`
        alert.buttons=[{
          text:'Cancle',
          role:'cancle',
          cssClass:'text-danger',
          handler:()=>{
          
          }
        },
        {
          text:'Confirm',
          role:'confirm',
          cssClass:'text-warning',
          handler:()=>{
            this.permit ='success'
            this.onSubmit(data);
          }
        }
      ]
      alert.present()
    
  }

  async onSubmit(data){
    var alert = await this.alertC.create({
      header:'',
      message:'please wait... <img src="assets/img/ajax_clock_small.gif">',
   })
  //  alert.present()

  if (data.gtype=='30' || data.gtype=='22') {
    this.amount = data.amount
  }
    var formdata = new FormData()
    formdata.set('permit',this.permit)
    formdata.set('amount',this.amount)
    formdata.set('branch',data.branch)
    formdata.set('gname',data.gname)
    formdata.set('gofficer',data.gofficer)
    formdata.set('gtype',data.gtype)
    formdata.set('icon',this.url)
    formdata.set('startDate',data.startDate)


    this.xhr.createGroup(formdata).subscribe((res:any)=>{
       if (res.error) {
        alert.header='Invalid'
        alert.message=res.error;
        alert.buttons=['OK']
        alert.present()
       }else if(res.success){
         
         if(this.permit==''){
         this.cal(data)
         }else{
          alert.header='Success'
          alert.message=res.success
          alert.buttons=[{
            text:'OK',
            role:'confirm',
            cssClass:'text-primary',
            handler : ()=>{
              alert.remove()
              this.router.navigate(['/mgtgroup'])
            }
          }]
          alert.present()
         }
       }
    },(error:any)=>{
      if(error.status==422){
        var le =[ error.error.message]
        var resErr= error.error.errors;
        for (let index = 0; index < le.length; index++) {
          alert.header='Invalid'
          alert.subHeader=error.error.message
        
          alert.message=`${!resErr.gname?'':resErr.gname[index]+'</br>'}
          ${!resErr.branch?'':resErr.branch[index]+'</br>'}
          ${!resErr.gofficer?'':resErr.gofficer[index]+'</br>'}
          ${!resErr.gtype?'':resErr.gtype[index]+'</br>'}
          ${!resErr.amount?'':resErr.amount[index]+'</br>'}
          ${!resErr.startDate?'':resErr.startDate[index]+'</br>'}
          ${!resErr.icon?'':resErr.icon[index]+'</br>'}`;
          alert.buttons=['OK']
          alert.present();
        }
      }
    })
  }

}
