import { Component, Input, OnInit } from '@angular/core';
import { NetworkService } from '../network.service';
import { AlertController } from '@ionic/angular';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-approve-loan',
  templateUrl: './approve-loan.page.html',
  styleUrls: ['./approve-loan.page.scss'],
})
export class ApproveLoanPage implements OnInit {

  @Input() loan: any;
  items = []
  id: any
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

  constructor(
    private Httpnetwork: NetworkService,
    public modalController: ModalController,
    public alertController: AlertController
  ) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    console.log(this.loan)
    this.id = this.loan.id
    this.category = this.loan.category
    this.user_id = this.loan.user_id
    this.loan_type = this.loan.loan_type
    this.branch = this.loan.branch
    this.loan_product = this.loan.loan_product
    this.loan_amount = this.loan.loan_amount
    this.loan_period = this.loan.loan_period
    this.payment_schedule = this.loan.payment_schedule
    this.period = this.loan.period
    this.loan_penalty = this.loan.loan_penalty

    this.guarantor_name = this.loan.guarantor_name
    this.guarantor_bvn = this.loan.guarantor_bvn
    this.guarantor_relationship = this.loan.guarantor_relationship
    this.guarantor_phone = this.loan.guarantor_phone
    this.guarantor_address = this.loan.guarantor_address
    this.guarantor_occupation = this.loan.guarantor_occupation
    this.guarantor_idcard = ''
    this.guarantor_photo = ''

    this.guarantor_nameb = this.loan.guarantor_nameb
    this.guarantor_bvnb = this.loan.guarantor_bvnb
    this.guarantor_relationshipb = this.loan.guarantor_relationshipb
    this.guarantor_phoneb = this.loan.guarantor_phoneb
    this.guarantor_addressb = this.loan.guarantor_addressb
    this.guarantor_occupationb = this.loan.guarantor_occupationb
    this.guarantor_idcardb = ''
    this.guarantor_photob = ''

    this.interest = this.loan.interest
    this.amount_per_period = this.loan.amount_per_period
  }

  dismiss() {
    this.modalController.dismiss({
      loan: this.loan
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

  check(v) {
    if (v == 'a') {
      if (this.hasguarantor == 'external') {
        this.guarantor_name = this.loan.guarantor_name
        this.guarantor_bvn = this.loan.guarantor_bvn
        this.guarantor_relationship = this.loan.guarantor_relationship
        this.guarantor_phone = this.loan.guarantor_phone
        this.guarantor_address = this.loan.guarantor_address
        this.guarantor_occupation = this.loan.guarantor_occupation
        // this.guarantor_idcard = this.loan.guarantor_idcard
        // this.guarantor_photo = this.loan.guarantor_photo
      }
    } else {
      if (this.hasguarantorb == 'external') {
        this.guarantor_nameb = this.loan.guarantor_nameb
        this.guarantor_bvnb = this.loan.guarantor_bvnb
        this.guarantor_relationshipb = this.loan.guarantor_relationshipb
        this.guarantor_phoneb = this.loan.guarantor_phoneb
        this.guarantor_addressb = this.loan.guarantor_addressb
        this.guarantor_occupationb = this.loan.guarantor_occupationb
        // this.guarantor_idcardb = this.loan.guarantor_idcardb
        // this.guarantor_photob = this.loan.guarantor_photob
      }
    }
  }

  getCustomers() {
    this.Httpnetwork.getCustomers().subscribe((res: any) => {
      if (res == "error") {
        console.log("")
      } else {
        this.items = res;
        for (let index = 0; index < this.items.length; index++) {
          const element = this.items[index];
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
            // this.guarantor_idcard = 'user'
            // this.guarantor_photo = 'user'
          }

          if (t == 'b') {
            this.guarantor_nameb = res[0].name
            this.guarantor_bvnb = ''
            this.guarantor_relationshipb = ''
            this.guarantor_phoneb = res[0].phone
            this.guarantor_addressb = res[0].address
            this.guarantor_occupationb = ''
            // this.guarantor_idcardb = 'user'
            // this.guarantor_photob = 'user'
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

  async approve_loan() {
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
    
    formdata.set("guarantor_nameb", this.guarantor_nameb)
    formdata.set("guarantor_bvnb", this.guarantor_bvnb)
    formdata.set("guarantor_relationshipb", this.guarantor_relationshipb)
    formdata.set("guarantor_phoneb", this.guarantor_phoneb)
    formdata.set("guarantor_addressb", this.guarantor_addressb)
    formdata.set("guarantor_occupationb", this.guarantor_occupationb)

    formdata.set("interest", this.interest)
    formdata.set("amount_per_period", this.amount_per_period)
    
    formdata.set("loan_id", this.id)

    if(this.guarantor_photo != ''){
      formdata.set("guarantor_photo", this.guarantor_photo)
    }

    if(this.guarantor_idcard != ''){
      formdata.set("guarantor_idcard", this.guarantor_idcard)
    }

    if(this.guarantor_photob != ''){
      formdata.set("guarantor_photob", this.guarantor_photob)
    }

    if(this.guarantor_idcardb != ''){
      formdata.set("guarantor_idcardb", this.guarantor_idcardb)
    }
    console.log(this.guarantor_photo+' '+this.guarantor_idcard+' '+this.guarantor_photob+' '+this.guarantor_idcardb)

    this.Httpnetwork.approve_loan(formdata).subscribe(
      (res: any) => {
        console.log(res)
        
      }, (error: any) => {
        console.log("ERROR ===", error);
      }
    );
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

}
