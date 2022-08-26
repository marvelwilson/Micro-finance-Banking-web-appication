import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NetworkService } from '../network.service';
import { AlertController } from '@ionic/angular';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-apply-loan',
  templateUrl: './apply-loan.page.html',
  styleUrls: ['./apply-loan.page.scss'],
})
export class ApplyLoanPage implements OnInit {

  @Input() id: any;
  items = []
  edituser: any;
  users: any;
  category: any
  hasguarantor: any
  hasguarantorb: any
  user_id: any;
  loan_type: any;
  branch: any;
  loan_product: any;
  loan_amount: any;
  loan_period: any;
  payment_schedule: any;
  period: any;
  loan_penalty: any;
  guarantor_type: any;
  guarantor_name: any;
  guarantor_bvn: any;
  guarantor_relationship: any;
  guarantor_phone: any;
  guarantor_address: any;
  guarantor_occupation: any;
  guarantor_idcard: any;
  guarantor_photo: any;

  guarantor_typeb: any;
  guarantor_nameb: any;
  guarantor_bvnb: any;
  guarantor_relationshipb: any;
  guarantor_phoneb: any;
  guarantor_addressb: any;
  guarantor_occupationb: any;
  guarantor_idcardb: any;
  guarantor_photob: any;
  interest: any;
  total_amount: any;
  amount_per_period: any;
  show_calc = false

  loans_typt = [{ title: 'Business daily loan', percent: 10 }, { title: 'Business weekly loan', percent: 10 }, { title: 'MSS', percent: 10 }]

  constructor(
    private Httpnetwork: NetworkService,
    public modalController: ModalController,
    public alertController: AlertController
  ) {
  }

  ngOnInit() {
  }

  calculate_interest() {
    let v = this.period.split("---")
    
    if (this.loan_product == 'Business daily loan') {
      this.interest = (parseInt(v[1]) * this.loan_amount) / 100
      this.total_amount = this.loan_amount + this.interest
      this.amount_per_period = this.total_amount / parseInt(v[0])
      this.show_calc = true
      return
    }

    if (this.loan_product == 'Business weekly loan') {
      this.interest = (parseInt(v[1]) * this.loan_amount) / 100
      this.total_amount = this.loan_amount + this.interest
      this.amount_per_period = this.total_amount / parseInt(v[0])
      this.show_calc = true
      return
    }

    if (this.loan_product == 'MSS') {
      this.interest = (parseInt(v[1]) * this.loan_amount) / 100
      this.total_amount = this.loan_amount + this.interest
      this.amount_per_period = this.total_amount / parseInt(v[0])
      this.show_calc = true
      return
    }
  }

  ionViewWillEnter() {
    alert(this.id)
  }

  dismiss() {
    this.modalController.dismiss({
      id: this.id
    });
  }

  getid(event: any) {
    this.guarantor_idcard = event.target.files[0];
    console.log('file', this.guarantor_idcard);
  }

  getpass(event: any) {
    this.guarantor_photo = event.target.files[0];
    console.log('file', this.guarantor_photo);
  }

  getidb(event: any) {
    this.guarantor_idcardb = event.target.files[0];
    console.log('file', this.guarantor_idcardb);
  }

  getpassb(event: any) {
    this.guarantor_photob = event.target.files[0];
    console.log('file', this.guarantor_photob);
  }

  async new_loan() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      message: "processing... <img src='assets/img/ajax_clock_small.gif'>",
      buttons: ['OK']
    });
    await alert.present();

    let formdata = new FormData();
    formdata.set("loan_type", this.loan_type)
    formdata.set("branch", this.branch)

    formdata.set("category", this.category)
    formdata.set("loan_product", this.loan_product)
    formdata.set("loan_amount", this.loan_amount)
    formdata.set("loan_period", this.loan_period)
    formdata.set("payment_schedule", this.payment_schedule)
    formdata.set("period", this.period)
    formdata.set("loan_penalty", this.loan_penalty)
    formdata.set("guarantor_type", this.guarantor_type)
    formdata.set("guarantor_name", this.guarantor_name)
    formdata.set("guarantor_bvn", this.guarantor_bvn)
    formdata.set("guarantor_relationship", this.guarantor_relationship)
    formdata.set("guarantor_phone", this.guarantor_phone)
    formdata.set("guarantor_address", this.guarantor_address)
    formdata.set("guarantor_occupation", this.guarantor_occupation)
    formdata.set("guarantor_photo", this.guarantor_photo)
    formdata.set("guarantor_idcard", this.guarantor_idcard)

    formdata.set("guarantor_nameb", this.guarantor_nameb)
    formdata.set("guarantor_bvnb", this.guarantor_bvnb)
    formdata.set("guarantor_relationshipb", this.guarantor_relationshipb)
    formdata.set("guarantor_phoneb", this.guarantor_phoneb)
    formdata.set("guarantor_addressb", this.guarantor_addressb)
    formdata.set("guarantor_occupationb", this.guarantor_occupationb)
    formdata.set("guarantor_photob", this.guarantor_photob)
    formdata.set("guarantor_idcardb", this.guarantor_idcardb)

    formdata.set("interest", this.interest)
    formdata.set("amount_per_period", this.amount_per_period)

    formdata.set("user_id", this.id)

    this.Httpnetwork.new_loan(formdata).subscribe(
      (res: any) => {
        console.log(res)

      }, (error: any) => {
        console.log("ERROR ===", error);
      }
    );
  }

  getCustomers() {

    this.users = JSON.parse(localStorage.getItem('userid')).user;
    this.Httpnetwork.getCustomers().subscribe((res: any) => {
      if (res == "error") {
        console.log("")
      } else {
        this.items = res;
        for (let index = 0; index < this.items.length; index++) {
          const element = this.items[index];
          this.edituser = {
            'id': element.id,
            'passport': element.passport,
            'name': element.name,
            'email': element.email,
            'phone': element.phone,
            'gender': element.gender,
            'signature': element.signature,
            'acc_type': element.acc_type,
            'wallet': element.wallet,
            'acc_num': element.acc_num,
            'avn': element.avn,
            'balance': element.balance,
            'sub_acc': element.sub_acc_type,
            'dob': element.dob,
            'address': element.address,
            'status': element.status,
            'created_at': element.created_at,
            'acc_mood': element.acc_mood,

          }

          // this.cv=e.target.value
        }
      }
    }, (error: any) => {
      console.log("Please Check Your Internet Connect")
    })
  }

  async Search(data, t) {
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
          console.log(res)

          if (t == 'a') {
            this.guarantor_name = res[0].name
            this.guarantor_bvn = ''
            this.guarantor_relationship = ''
            this.guarantor_phone = res[0].phone
            this.guarantor_address = res[0].address
            this.guarantor_occupation = ''
            this.guarantor_idcard = 'user'
            this.guarantor_photo = 'user'
          }

          if (t == 'b') {
            this.guarantor_nameb = res[0].name
            this.guarantor_bvnb = ''
            this.guarantor_relationshipb = ''
            this.guarantor_phoneb = res[0].phone
            this.guarantor_addressb = res[0].address
            this.guarantor_occupationb = ''
            this.guarantor_idcardb = 'user'
            this.guarantor_photob = 'user'
          }
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

}
