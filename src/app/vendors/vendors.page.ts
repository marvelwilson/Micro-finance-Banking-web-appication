import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { NetworkService } from '../network.service';

@Component({
  selector: 'app-vendors',
  templateUrl: './vendors.page.html',
  styleUrls: ['./vendors.page.scss'],
})
export class VendorsPage implements OnInit {

  bal=[0,1];
  items: any;
  staffname=''
url = 'https://agilfinance.net/service/storage/';
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
  sm:any;
  acc_dis='d-none'
  sums:any;
  custid:any;
  sumer:any;
  staff:any;
  permit='';
  picked = '';
  elem = '';
  shuffleNumbers:any;
  already:any;
  re_pre: string;
  recpre ='d-none';
  disser: string;
  od: string;


  //edit fields inputs
 
  constructor(
    public router: Router,
    private Httpnetwork: NetworkService,
    public alertController: AlertController,
  ) {
    this.getVendors()
  }

  ngOnInit() {
  }


  backtohome() {
    this.router.navigate(['/home'])
  }

  async exp(e){
    var alert = await this.alertController.create({ 
      backdropDismiss:false,
       cssClass:'text-center',
      message:"Loading.. <img src='assets/img/ajax_clock_small.gif'>"
  
    })
     alert.present();
      var id = e.target.value;
      this.Httpnetwork.getExp(id).subscribe((res:any)=>{
        if(res.error){
         alert.header='Not Found'
         alert.message=res.error
         alert.buttons=['OK']
         alert.present()
        }else{
         this.sm = res;
         var debit = 0;
         for (let i = 0; i < this.sm.length; i++) {
          const element = this.sm[i];
          debit +=element.expAmpunt;

        }
      this.sums=[{
      'debits':debit,
      }]
         this.disser='d-block';
          alert.remove()
        }
      },(error:any)=>{
        
      })
  }
 async edits(id){
    var alert = await this.alertController.create({
    backdropDismiss:false,
    cssClass:'text-center',
    message:"Loading <img src='assets/img/ajax_clock_small.gif'>"
    })
    alert.present()
    var formdata = new FormData()
    formdata.set('amount',this.amount)
    formdata.set('id',this.id)

    this.Httpnetwork.reset(formdata).subscribe((res: any) => {
      if (res.error) {
        alert.header='Invalid'
        alert.message=res.error
        alert.buttons=['OK']
        alert.present()
      } else {
        alert.header='Success'
        alert.message=res.success
        alert.buttons=['OK']
        alert.present()
        this.users='d-block';
        this.items=res.all
        alert.remove()
      }
    },(error:any)=>{

    })
 }
  async getVendors(){
    var alert = await this.alertController.create({
      backdropDismiss:false,
      cssClass:'text-center',
      message:"Loading <img src='assets/img/ajax_clock_small.gif'>"
      
 
    })
    alert.present()
    this.Httpnetwork.getVendors().subscribe((res: any) => {
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
            'profile':element.profile,
            'name':element.name,
            'email':element.email,
            'phone':element.phone,
            'gender':element.gender,
            'cv':element.cv,
            'acc_type':element.acc_type,
            'wallet':element.wallet,
            'user_type':element.user_type,
            'avn':element.avn,
            'incomes':element.revenue,
            'deposit':element.deposit,
            'balance':element.balance,
            'expenses':element.expenses,
            'deposits':element.deposits,
            'address':element.address,
            'status':element.status,
            'withdrawals':element.withdrawals,
            'revenue':element.revenue,

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
      let formdata = new FormData()
      formdata.set('from',data.from)
      data['id']=this.custid
      this.Httpnetwork.SearchVendor(formdata).subscribe((res:any)=>{
        if(!res.error){
          this.items=res
          alert.header="Found";
          alert.message="Validation Successful"
          alert.buttons=["OK"]
          alert.present()
        }else{
          this.items=res.users
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
     this.Httpnetwork.bills(e.target.value).subscribe((res: any) => {
      
     for (let i = 0; i < res.exp.length; i++) {
        const element = res.exp[i];
       this.edituser.expenses += Number(element.expAmount)
      }
      for (let i = 0; i < res.in.length; i++) {
        const element = res.in[i];
       this.edituser.incomes += Number(element.amount)
      }
      for (let i = 0; i < res.trans.length; i++) {
        const element = res.trans[i];
        if (element.transType=='Deposit') {
            this.edituser.deposits += Number(element.amount)
        }else if(element.transType=='Withdraw'){
          this.edituser.withdrawals += Number(element.amount)
        }
      }
     this.edituser.address=res.address.number+', '+res.address.address+', '+res.address.state+' State, Nigeria';

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
            'profile':element.profile,
            'name':element.name,
            'email':element.email,
            'phone':element.phone,
            'gender':element.gender,
            'cv':element.cv,
            'acc_type':element.acc_type,
            'wallet':element.wallet,
            'user_type':element.user_type,
            'avn':element.avn,
            'incomes':element.revenue,
            'balance':element.balance,
            'expenses':element.expenses,
            'deposits':element.deposits,
            'address':element.address,
            'status':element.status,
            'withdrawals':element.withdrawals,
      }
      
    }
   
    // this.cv=e.target.value
 }
}
  async extend(e){  
  this.id = e.target.value

    var alert = await this.alertController.create({ 
      backdropDismiss:false,
      cssClass:'text-center',
      message:"Loading <img src='assets/img/ajax_clock_small.gif'>"
 
    })
    if (this.acc_num!='') {
      alert.present()
     var formData = new FormData()
     formData.append('extend', this.acc_num)
     formData.append('id', this.id)
      this.Httpnetwork.extend(formData).subscribe((res:any)=>{
        if(res.success){
          this.edituser.days= this.edituser.days+14;
         alert.header='Success'
         alert.message=res.success
         alert.buttons=['OK']
         alert.present()
        }else{         
         
        }
      },(error:any)=>{
        if(error.status==422){
          var le =[ error.error.message]
          var resErr= error.error.errors;
          for (let index = 0; index < le.length; index++) {
            alert.header='Invalid'
            alert.subHeader=error.error.message
          
            alert.message=`${!resErr.acc_num?'':resErr.acc_num[index]+'</br>'}`
            alert.buttons=['OK']
            alert.present();
          }
        }
      })
      
    }
  }
  async delAcc(){  
    var alert = await this.alertController.create({ 
      backdropDismiss:false,
      cssClass:'text-center',
      message:"Loading <img src='assets/img/ajax_clock_small.gif'>"
 
    })
    if (this.acc_num!='') {
      alert.present()
     var formData = new FormData()
     formData.append('acc_num', this.acc_num)
     formData.append('permit', this.permit)
     formData.append('id', this.id)
      this.Httpnetwork.delAcc(formData).subscribe((res:any)=>{
        if(res.error){
         alert.header='Invalid'
         alert.message=res.error
         alert.buttons=['OK']
        }else{
         if ( !res.success) {
          alert.header='Confirm'
          alert.message=`Confirm Account Holder Name: <strong>${res.name}</strong>, And Account Type: <strong>${res.sub_acc_type} ${res.acc_type}</strong>`
          alert.buttons=[{
            text:'Cancle',
            cssClass:'text-danger'
          },{
            text:'Confirm',
            cssClass:'btn btn-dark',
            handler:()=>{
              this.permit='pass'
              this.delAcc()
            }
          }]
          alert.present()
         }else{
          this.amount=''
         this.dis='d-none'
         this.items = res.success
         alert.header='Success'
         alert.message='Account Has Being Removed Successfully'
         alert.buttons=['OK']
         this.permit=''

         }
         
         
        }
      },(error:any)=>{
        if(error.status==422){
          var le =[ error.error.message]
          var resErr= error.error.errors;
          for (let index = 0; index < le.length; index++) {
            alert.header='Invalid'
            alert.subHeader=error.error.message
          
            alert.message=`${!resErr.acc_num?'':resErr.acc_num[index]+'</br>'}`
            alert.buttons=['OK']
            alert.present();
          }
        }
      })
      
    }
  }
 async depo(){
   var alert = await this.alertController.create({ 
     backdropDismiss:false,
      cssClass:'text-center',
     header:'Credit',
     message:"Crediting <img src='assets/img/ajax_clock_small.gif'>"

   })
   if ((this.amount || this.payment!='undefined') && (this.pro_show=='d-block' && this.receipt!='' || this.pro_show=='d-none' && this.receipt=='')) {
     alert.present()
    var formData = new FormData()
    formData.append('amount', this.amount)
    formData.append('id', this.id)
     this.Httpnetwork.FundStaff(formData).subscribe((res:any)=>{
      if(res.error){
        alert.header='Invalid'
        alert.message=res.error
        alert.buttons=['OK']
       }else{
          this.items = res
          for (let i = 0; i < res.length; i++) {
            const element = res[i];
            if(element.id==this.id){
           this.edituser.wallet=element.wallet
          }
          alert.header='Credited'
          alert.message='Account has being Credited Successfully'
          alert.buttons=['OK']
          alert.present()
          this.amount=''
          this.dis='d-none'
         }
         
       }
     },(error:any)=>{
       
     })
    
   }else{ 
     alert.header="Invalid"
     alert.message="All Fields are Required"
     alert.buttons=['OK']
     alert.present()
   }
 }
 async wtrw(){
  var alert = await this.alertController.create({
    message:"Loading <img src='assets/img/ajax_clock_small.gif'>",
    backdropDismiss:false,
    cssClass:'text-center'


  })
  alert.present()
  if (this.amount!='undefined' && this.acc_num!='undefined') {
   var formData = new FormData()
   formData.append('amount', this.amount)
   formData.append('id', this.id)
    this.Httpnetwork.DebitStaff(formData).subscribe((res:any)=>{
      if(res.error){
       alert.header='Invalid'
       alert.message=res.error
       alert.buttons=['OK']
      }else{
       this.items = res
      for (let i = 0; i < res.length; i++) {
         const element = res[i];
         if(this.edituser.id==element.id){
        this.edituser.wallet  = element.wallet
         }
         
       }
    
       alert.header='Debit'
       alert.message='Account has being Debited Successfully'
       alert.buttons=['OK']
       this.amount=''
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

del(e){
  this.disdel='d-block'
  this.id = e.target.value
}
  deposit(e){
    this.dis='d-block'
    this.id = e.target.value
  }
  
  withdraw(e){
     this.diss='d-block';
     this.id = e.target.value
  }
 pre_rec(e){
     this.recpre='d-block'
     this.re_pre=this.url+e.target.value;
 }
 over(e){
 this.id=e.target.value
  this.od='d-block'
 }
 async changePass(data){
  var alert = await this.alertController.create({
    message:"Loading <img src='assets/img/ajax_clock_small.gif'>",

  })
    alert.present()
   var formdata = new FormData()
   data.id=this.id;
    this.Httpnetwork.changePass(data).subscribe((res:any)=>{
      if(!res.error){
        alert.header="Success";
        alert.message=res.success
        alert.buttons=["OK"]
        alert.present()
        data.new_pass=''
        data.old_pass=''
        data.re_pass=''

      }else{
        alert.header="Failed";
        alert.message=res.error
        alert.buttons=["OK"]
        alert.present()
      }
    },(error:any)=>{
      if(error.status==422){
          
        var le =[ error.error.message]
        var resErr= error.error.errors;
        for (let index = 0; index < le.length; index++) {
          alert.header='Invalid'
          alert.subHeader=error.error.message
          alert.message=`${!resErr.old_pass?'':resErr.old_pass[index]+'</br>'}
          ${!resErr.new_pass?'':resErr.new_pass[index]+'</br>'}
          ${!resErr.re_pass?'':resErr.re_pass[index]+'</br>'}`
          alert.buttons=['OK']
          alert.present();
        }
       
      } 
    })
  
   
}
  async view(e){
    var alert = await this.alertController.create({ 
      backdropDismiss:false,
       cssClass:'text-center',
      message:"Loading.. <img src='assets/img/ajax_clock_small.gif'>"
  
    })
   alert.present();
      var id = e.target.value;
      this.custid = id;
      this.Httpnetwork.Vendorstatement(id).subscribe((res:any)=>{
        if(res.error){
         alert.header='Not Found'
         alert.message=res.error
         alert.buttons=['OK']
         alert.present()
        }else{
         this.sm = res;
         var debit = 0;
         var credit = 0;
         for (let i = 0; i < this.sm.length; i++) {
          const element = this.sm[i];
          if (element.transType=='Deposit') {
            credit+=Number(element.amount)
          }else if (element.transType=='Withdraw') {
            debit+=Number(element.amount)
            
          }
        }
      this.sums=[{
      'credits':credit,
      'debits':debit,
      'balance':credit-debit,
      }]
         this.display='d-block';
          alert.remove()
        }
      },(error:any)=>{
        
      })
  
}

async SearchDate(data){
  var alert = await this.alertController.create({
    header:'',
    message:'',
    buttons:['OK'],

  })
  if (data.from=='') {
     alert.header="Required";
     alert.message="From field cannot be empty"
     alert.present()
  }else if(data.to==''){
    alert.header="Required";
    alert.message="From field cannot be empty"
    alert.present()
  }else{
    alert.header="Validating";
    alert.message="Validating Search <img src='assets/img/ajax_clock_small.gif'>"
    alert.buttons=[""]
    alert.present()
    data['id']=this.custid
    this.Httpnetwork.searchDate(data).subscribe((res:any)=>{
      if(!res.error){
        this.sm=res
        this.sumer=`${data.from}----${data.to}`;

        alert.header="Found";
        alert.message="Validation Successful"
        alert.buttons=["OK"]
        alert.present()
        var debit = 0;
        var credit = 0;
        for (let i = 0; i < this.sm.length; i++) {
          const element = this.sm[i];
          if (element.transType=='Deposit') {
            credit+=Number(element.amount)
          }else if (element.transType=='Withdraw') {
            debit+=Number(element.amount)
            
          }
        }
      this.sums=[{
      'credits':credit,
      'debits':debit,
      'balance':credit-debit,
      }]
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
  close1(){ 
    this.display='d-none';
    this.dis='d-none';
    this.diss='d-none';
    this.disadd='d-none'
    this.disdel='d-none'
    this.recpre='d-none'
    this.users='d-none';
    this.disser='d-none';
    this.od='d-none'

  }
  rec(){
    this.recpre='d-none'

  }
  close(){ 
    this.display='d-none';
    this.dis='d-none';
    this.diss='d-none';
    this.acc_dis='d-none'
    this.disadd='d-none'
    this.disdel='d-none'
    this.recpre='d-none'
    this.users='d-none';
    this.disser='d-none';
    this.od='d-none'



  }


}