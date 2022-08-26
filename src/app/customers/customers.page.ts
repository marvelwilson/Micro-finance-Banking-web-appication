import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NetworkService } from '../network.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.page.html',
  styleUrls: ['./customers.page.scss'],
})
export class CustomersPage implements OnInit {
  urlpass = "assets/img/passport.jpeg";
  url = "assets/img/signature.png";
  pass = '';
  sign = '';
  response: any;
  savings = 'd-none';
  contribute = 'd-none';
  acc_type: any;
  validating = 'd-none';
  forpersonal = 'd-none';
  forsavings = 'd-none';
  rfd = 'd-none';


  d = '';
  name: any;
  gender: any;
  phone: any;
  dob: any;
  address: any;
  acc_typem: any;
  passport: any;
  signature: any;

  thrift: any;
  marketer: any[];
  constructor(
    private router: Router,
    public Httpnetwork: NetworkService,
    public alertController: AlertController,


  ) { }

  ngOnInit() {
    this.getThrifts()
  }


  backtohome() {
    this.router.navigate(['/home'])
  }

  async avncheck(e) {

    var alert = await this.alertController.create({
      message: "Please Wait <img src='assets/img/ajax_clock_small.gif'>"

    })
    alert.present()
    if (e.target.value != "") {
      this.validating = 'd-block';
      var formData = new FormData()
      formData.set('avn', e.target.value)
      this.Httpnetwork.checkAvn(formData).subscribe((res: any) => {
        if (res == 'success') {
          alert.header = 'success'
          alert.message = 'Avn Validation Successful';
          alert.buttons = ['OK']
          alert.present()
          this.validating = 'd-none';
          this.d = 'd-none';
        } else if (res == 'error') {
          alert.header = 'Invalid'
          alert.message = "Avn not Found";
          alert.buttons = ['OK']
          alert.present()
          this.validating = 'd-none';
          this.d = 'd-block';

        }
      }), (error: any) => {
        alert.message = error.message + '<br> try again in few munite';
        alert.buttons = ['OK']
        alert.present()
        this.validating = 'd-none';
      }
    } else {
      alert.remove();
    }
  }
  accType(e) {

    var data = e.target.value
    if (data == 'savings') {
      this.savings = 'd-block';
      this.contribute = 'd-none';
      this.saving()
    } else if (data = 'contribution') {
      this.savings = 'd-none';
      this.contribute = 'd-block';
    }

  }











  saving() {
    this.forpersonal = 'd-none';
    this.rfd = 'd-none'
    this.forsavings = 'd-block';
  }
  personal(e) {
    var val = e.target.value
    if (val == 'personal') { 
      this.forpersonal = 'd-block';
      this.rfd = 'd-none';
      this.forsavings = 'd-none';

    } else if (val == 'group') {
      this.forpersonal = 'd-none';
      this.forsavings = 'd-none';

    }
    else if (val == 'Regular Fixed') {
      this.rfd = 'd-block';
      this.forpersonal = 'd-block';
      this.forsavings = 'd-none';


    }
  }

  // image preivew events
  getpassport(e) {
    if (e.target.files) {
      var reader = new FileReader();
      reader.readAsDataURL(e.target.files[0]);
      reader.onload = (event: any) => {
        this.urlpass = event.target.result;

      }
    }
    this.pass = e.target.files[0]

  }


  getsignature(e) {
    if (e.target.files) {
      var reader = new FileReader();
      reader.readAsDataURL(e.target.files[0]);
      reader.onload = (event: any) => {
        this.url = event.target.result;
      }
    }
    this.sign = e.target.files[0]
  }

  async onSubmit(data) {
    var alert = await this.alertController.create({
      message: "Please Wait <img src='assets/img/ajax_clock_small.gif'>"

    })
    alert.present()

    var formData = new FormData()
    formData.set('name', data.name)
    formData.set('avn', data.avn)
    formData.set('gender', data.gender)
    formData.set('phone', data.phone)
    formData.set('email', data.email)
    formData.set('dob', data.dob)
    formData.set('address', data.address)
    formData.set('acc_type', data.acc_type)
    formData.set('sub_acc_type', data.sub_acc_type)
    formData.set('passport', this.pass)
    formData.set('signature', this.sign)
    formData.set('ass_id', data.ass_id)
    formData.set('acc_off', data.acc_off)
    if (data.sub_acc_type == 'personal') {
      formData.set('reg_fee', data.reg_fee)
      formData.set('rate', data.rate)
      formData.set('durations', '0')

    } else if (data.acc_type == 'savings') {
      formData.set('reg_fee', data.reg_fee)
      formData.set('rate', '0')
      formData.set('durations', '0')

    } else if (data.sub_acc_type == 'Regular Fixed') {
      formData.set('reg_fee', data.reg_fee)
      formData.set('rate', data.rate)
      let d = new Date()
      let value = (data.durations*31)+d.getDate()
      d.setDate(value)
      let date = d.getDate() + '-' + (d.getMonth()+1) + '-' + d.getFullYear()
      formData.set('durations', data.durations)
      formData.set('ending',date)
    }

    this.Httpnetwork.RegCusts(formData).subscribe((res: any) => {
      console.log("SUCCESS===", res);
      if (res.error) {
        alert.header = 'Invalid';
        alert.message = res.error;
        alert.buttons = ['OK']
        alert.present();
      } else if (res.success) {
        alert.header = "Success";
        alert.message = 'Account Has Being Created Successfully<br>Account number is<h4 style="color:orange">' + res.success + '</h4>Account type is <h4>' + data.sub_acc_type + ' ' + res.acc_type + '</h4 style="color:orange"><br>Customer"s AVN is <h4>' + res.avn + '</h4>';
        alert.buttons = [{
          text: 'OK',
          handler: () => {
            this.router.navigate(['/custlist'])
          }
        }]
        alert.present();
      }
    }, (error: any) => {
      if (error.status == 422) {

        var le = [error.error.message]
        var resErr = error.error.errors;
        for (let index = 0; index < le.length; index++) {
          alert.header = 'Invalid'
          alert.subHeader = error.error.message
          alert.message = `${!resErr.name ? '' : resErr.name[index] + '</br>'}
          ${!resErr.gender ? '' : resErr.gender[index] + '</br>'}
          ${!resErr.phone ? '' : resErr.phone[index] + '</br>'}
          ${!resErr.email ? '' : resErr.email[index] + '</br>'}
          ${!resErr.dob ? '' : resErr.dob[index] + '</br>'}
          ${!resErr.address ? '' : resErr.address[index] + '</br>'}
          ${!resErr.acc_type ? '' : resErr.acc_type[index] + '</br>'}
          ${!resErr.sub_acc_type ? '' : resErr.sub_acc_type[index] + '</br>'}
          ${!resErr.rate ? '' : resErr.rate[index] + '</br>'}
          ${!resErr.reg_fee ? '' : 'The deposit amount field is required</br>'}
          ${!resErr.passport ? '' : resErr.passport[index] + '</br>'}
          ${!resErr.signature ? '' : resErr.signature[index]}`;
          alert.buttons = ['OK']
          alert.present();
        }

      }
    })


  }
  async getThrifts() {
    var alert = await this.alertController.create({
      message: "Please Wait <img src='assets/img/ajax_clock_small.gif'>"

    })
    alert.present()
    this.Httpnetwork.getThrift().subscribe((res: any) => {
      alert.remove()
      if (!res.error) {
        this.thrift=[]
        this.marketer = []
        for (let i = 0; i < res.length; i++) {
          if (res[i].acc_type=='Credit&Marketing') {
            this.marketer.push(res[i])
          }else if (res[i].acc_type=='Thrift') {
            this.thrift.push(res[i])
          }
        }
      } else {
        alert.header = 'Failed'
        alert.message = res.error
        alert.buttons = ['OK']
        alert.present()
      }
    })
  }

}
