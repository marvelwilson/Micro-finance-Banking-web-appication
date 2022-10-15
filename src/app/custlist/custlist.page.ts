import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NetworkService } from '../network.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-custlist',
  templateUrl: './custlist.page.html',
  styleUrls: ['./custlist.page.scss'],
})
export class CustlistPage implements OnInit {
  items: any;
  users: any;
  edituser: any;
  dis: string;
  display: string;
  url = 'https://agilfinance.net/service/storage/app/public/';
  specific = 'd-block'
  id='';
  passport='';
  name='';
  email='';
  phone='';
  gender='';
  acc_type='';
  signature='';
  wallet='';
  acc_num='';
  balance='';
  avn='';
  sub_acc_type='';
  dob='';
  address='';
  status='';
  created_at='';
  acc_mood='';
  branchlist: any;
  thrift: any;
  Thrift=''
  ass_id='';
  urlpass='';
  sig='';
  officer='';
  sms='';
  acc_offs='';

  th_off: any[];
  acc_off: any[];
  hold_items: any;
  temp_items: any;

  constructor(
    public router: Router,
    private Httpnetwork: NetworkService,
    public alertController: AlertController,
  ) {
    this.getCustomers()
    this.getThrifts()

  }

  ngOnInit() {
  }


  backtohome() {
    this.router.navigate(['/home'])
  }
  async getThrifts(){
    var alert = await this.alertController.create({
      message:"Please Wait <img src='assets/img/ajax_clock_small.gif'>"
 
    })
    alert.present()
    this.Httpnetwork.getThrift().subscribe((res:any)=>{
      alert.remove()
       if(!res.error){
        this.thrift = res
        this.th_off=[]
        this.acc_off=[]
        for (let i = 0; i < this.thrift.length; i++) {
          const e = this.thrift[i];
          if (e.acc_type=='Thrift') {
            this.th_off.push(e)
          }else if(e.acc_type=='Credit&Marketing'){
            this.acc_off.push(e)
          }
          
        }
        console.log(this.acc_off)

        console.log(res)
       }else{
        alert.header = 'Failed'
        alert.message=res.error
        alert.buttons = ['OK']
        alert.present()
       }
    })
  }

  modals(param, use){
    let name = use.target.value
    this.items=[]
     if(param=='acc_off'){
      for (let i = 0; i < this.temp_items.length; i++) {
        const e = this.temp_items[i];
        if (e.officer==name) {
          this.items.push(e)
        }
      }
      this.temp_items=this.items
     }else if(param=='th_off'){
      for (let i = 0; i < this.temp_items.length; i++) {
        const e = this.temp_items[i];
        if (e.userid==name) {
          this.items.push(e)
        }
        
      }
      this.temp_items=this.items
     }else if(param=='messaging'){
      if (name=='sms') {
        this.items=this.temp_items
      }else if(name=='email'){
        for (let i = 0; i < this.temp_items.length; i++) {
          const e = this.temp_items[i];
          if (e.email!='') {
            this.items.push(e)
          }
        }
        this.temp_items=this.items
      }
     }
     else if(param=='reset'){
      this.items=this.hold_items
      this.temp_items=this.items
     }
  }

  async filter(event){
    let e = event
    this.items=[]
    if (e.to && e.from) {
      for (let i = 0; i < this.temp_items.length; i++) {
        const a = this.temp_items[i];
       let cat = a.created_at.split(' ')[0];
        if (e.from <= cat && (e.to >= cat)) {
           this.items.push(a)
        }
      }
      this.temp_items = this.items
    }
   
    }

  getCustomers() {

    this.users = JSON.parse(localStorage.getItem('userid')).user;
    this.Httpnetwork.getCustomers().subscribe((res: any) => {
      if (res == "error") {
        console.log("")
      } else {
        this.items = res;
        this.temp_items = this.items
        this.hold_items = this.items
      
      }
    }, (error: any) => {
      console.log("Please Check Your Internet Connect")
    })
  }

  getpassport(e){
    if (e.target.files) {
      var reader = new FileReader();
      reader.readAsDataURL(e.target.files[0]);
      reader.onload=(event:any)=>{
        this.urlpass=event.target.result;
    
      }
    }
    this.passport = e.target.files[0]
  }
 

  getsignature(e){
    if (e.target.files) {
      var reader = new FileReader();
      reader.readAsDataURL(e.target.files[0]);
      reader.onload=(event:any)=>{
        this.sig=event.target.result;
      }
    }
    this.signature = e.target.files[0]
  }

  edit(e) {
    this.dis = 'd-block';
    for (let index = 0; index < this.items.length; index++) {
      const element = this.items[index];
      if (element.acc_mood == 'virtual') {
        this.specific = 'd-none';
      }
      if (element.id == e.target.value) {
          this.id = element.id
          this.passport = element.passport
          this.name = element.name
          this.email = element.email
          this.phone = element.phone
          this.gender = element.gender
          this.signature = element.signature
          this.acc_type = element.acc_type
           this.wallet = element.wallet
          this.acc_num = element.acc_num
          this.avn = element.avn
          this.balance = element.balance
          this.sub_acc_type = element.sub_acc_type
          this.dob = element.dob
          this.address = element.address
         this.status = element.status
          this.created_at = element.created_at
         this.acc_mood = element.acc_mood
         this.ass_id = element.userid
         this.officer = element.officer
         this.sms = element.sms

         
         
         this.sig = this.url+this.signature
         this.urlpass = this.url+this.passport
         for (let a = 0; a < this.thrift.length; a++) {
             const tri = this.thrift[a];
            if(tri.id==this.ass_id){
              this.Thrift=tri.name
          }
        }

        
      }

      // this.cv=e.target.value
    }
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
      this.Httpnetwork.Search(data).subscribe((res: any) => {
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
          this.getCustomers()
        }
      }, (error: any) => {

      })
    }
  }
async updateCust(){
  var alert = await this.alertController.create({
    message:"Please Wait <img src='assets/img/ajax_clock_small.gif'>"

  })
  alert.present()
  var formData = new FormData()
  formData.set('id',this.id)
  formData.set('avn',this.avn)
  formData.set('name',this.name)
  formData.set('gender',this.gender)
  formData.set('phone',this.phone)
  formData.set('email',this.email)
  formData.set('address',this.address)
  formData.set('passport', this.passport)
  formData.set('signature', this.signature)
  formData.set('ass_id', this.ass_id)
  formData.set('officer', this.officer)
  formData.set('sms', this.sms?'on':'')

  


  this.Httpnetwork.updateCusts(formData).subscribe((res:any)=>{
    if (res.error) {
      alert.header='Invalid';
      alert.message=res.error;
     alert.buttons=['OK']
      alert.present();
    }else if (res.success){
      alert.header="Success";
      alert.message='Account Has Being Updated Successfully';
      alert.buttons=['OK']
      alert.present();
      this.close()
      this.getCustomers()
    }
  },(error: any)=>{
    if(error.status==422){
        
      var le =[ error.error.message]
      var resErr= error.error.errors;
      for (let index = 0; index < le.length; index++) {
        alert.header='Invalid'
        alert.subHeader=error.error.message
        alert.message=`${!resErr.name?'':resErr.name[index]+'</br>'}
        ${!resErr.email?'':resErr.email[index]+'</br>'}
        ${!resErr.phone?'':resErr.phone[index]+'</br>'}
        ${!resErr.gender?'':resErr.gender[index]+'</br>'}
        ${!resErr.address?'':resErr.address[index]+'</br>'}
        ${!resErr.passport?'':resErr.passport[index]+'</br>'}
        ${!resErr.signature?'':resErr.signature[index]}`;
        alert.buttons=['OK']
        alert.present();
      }
     
    } 
  })
}

  
  bunb(e, val) {
    var id = e+"bn"+val;
   
    this.Httpnetwork.bunb(id).subscribe((res: any) => {
      this.getCustomers()

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
    this.display = 'd-none';
    this.dis = 'd-none';

  }

}
