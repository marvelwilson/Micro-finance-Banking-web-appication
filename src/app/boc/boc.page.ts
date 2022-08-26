import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { NetworkService } from '../network.service';

@Component({
  selector: 'app-boc',
  templateUrl: './boc.page.html',
  styleUrls: ['./boc.page.scss'],
})
export class BocPage implements OnInit {
  noc = 'd-none';
  co = 'd-none';
  pro = 'd-none';
  prolist: any;
  url = 'https://agilfinance.net/service/storage/';
  editpro = 'd-none'
  editable: { id: any; pname: any; ptype: any; pamount: any; pbrand: any; pcat: any; pimage: any; };
  file_properties='';
  ptype="";
  image="";
  pname="";
  pbrand="";
  amount="";
  pcat="";
  id="";
  constructor(
    private router: Router,
    public xhr: NetworkService,
    public alertC: AlertController,
  ) { }

  ngOnInit() {
  }
  backtohome() {
    this.router.navigate(['/home'])
  }

  async modals(params,pro_id) {
    var alert = await this.alertC.create({
      message: "Loading <img src='assets/img/ajax_clock_small.gif'>",
      backdropDismiss: false,
      cssClass: 'text-center'


    })
    alert.present()
    if (params == 'noc') {
      this.noc = 'd-block'
    } else if (params == 'co') {
      this.co = 'd-block'

    } else if (params == 'pro') {
      this.xhr.getProducts().subscribe((res: any) => {
        this.pro = 'd-block'

        if(res.error){
          alert.header='Failed'
          alert.message=res.error
          alert.buttons=['OK']
          alert.present()
         } else {
          this.prolist = res;
          alert.remove();
          for (let i = 0; i < this.prolist.length; i++) {
            const element = this.prolist[i];
              this.editable={
                'id':element.id,
                'pname':element.pname,
                'ptype':element.ptype,
                'pamount':element.pamount,
                'pbrand':element.pbrand,
                'pcat':element.pcat,
                'pimage':element.pimage,
              }
            }
        }
      });
    } else if (params == 'addpro') {
      alert.remove();
      this.router.navigate(['/addpro'])
    } else if (params == 'editpro') {
      this.editpro = 'd-block'
      alert.remove();
      for (let i = 0; i < this.prolist.length; i++) {
        const element = this.prolist[i];
        if (pro_id.target.value==element.id) {
          this.id=element.id
          this.pname=element.pname
          this.ptype=element.ptype
          this.amount=element.pamount
          this.pbrand=element.pbrand
          this.pcat=element.pcat
          this.image=element.pimage
          this.editable={
            'id':element.id,
            'pname':element.pname,
            'ptype':element.ptype,
            'pamount':element.pamount,
            'pbrand':element.pbrand,
            'pcat':element.pcat,
            'pimage':element.pimage,
          }
        }
        
      }

    }else if(params == 'delpro'){
      this.xhr.delPro(pro_id.target.value).subscribe((res:any)=>{
        alert.remove()
        if(res.success){
          alert.header='Sucess'
          alert.message=res.success
          alert.buttons=['OK']
          alert.present()
          this.prolist=res.updated_pro;
         }
      })
    }
  }
  pimage(e){
    this.file_properties = e.target.files[0]
   }
   async onSubmit(){
     var alert = await this.alertC.create({
       message:"Loading <img src='assets/img/ajax_clock_small.gif'>",
       backdropDismiss:false,
       cssClass:'text-center'
   
   
     })
     alert.present()
     var datas = new FormData()
    datas.append('filename',this.file_properties) 
    datas.append('ptype',this.ptype)
    datas.append('pimage',this.image) 
    datas.append('pname',this.pname) 
    datas.append('pbrand',this.pbrand) 
    datas.append('amount',this.amount) 
    datas.append('pcat',this.pcat)
    datas.append('id',this.id)


     this.xhr.updatePro(datas).subscribe((res:any)=>{
       if(res.error){
         alert.header='Invalid'
         alert.message=res.error
         alert.buttons=['OK']
         alert.present()

        }else if(res.success){
           alert.header='Sucess'
           alert.message=res.success
           alert.buttons=['OK']
           alert.present()
           this.prolist=res.updated_pro;
          }
     },(error:any)=>{
       if(error.status==422){
         
         var le =[ error.error.message]
         var resErr= error.error.errors;
         for (let index = 0; index < le.length; index++) {
           alert.header='Invalid'
           alert.subHeader=error.error.message
           alert.message=`${!resErr.pcat?'':resErr.pcat[index]+'</br>'}
           ${!resErr.ptype?'':resErr.ptype[index]+'</br>'}
           ${!resErr.pbrand?'':resErr.pbrand[index]+'</br>'}
           ${!resErr.pname?'':resErr.pname[index]+'</br>'}
           ${!resErr.amount?'':resErr.amount[index]+'</br>'}`

           alert.buttons=['OK']
           alert.present();
         }
        
       } 
     })
   }
  close() {
    this.noc = 'd-none';
    this.co = 'd-none';
    this.pro = 'd-none';
  }
  closeform(){
    this.editpro = 'd-none'
  }
}
