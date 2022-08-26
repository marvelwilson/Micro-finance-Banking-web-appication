import { Component, OnInit } from '@angular/core';
import { NetworkService } from '../network.service';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  response: any;
  username: any;
  password: any;

  constructor(
    public Httpnetwork: NetworkService,
    private router: Router,
    public alertController: AlertController
  ) { }

  ngOnInit() {
  }

  async login(user, pass) {
    const alert = await this.alertController.create({


    })
    alert.message = "Loading <img src='assets/img/ajax_clock_small.gif'>"
    alert.present();
    this.response = ""
    if (!user || !pass) {
      alert.header = 'Invalid'
      alert.buttons = ['OK']
      alert.message = "This Fields are Required"

      alert.present()
    } else {
      let data = {
        username: user,
        password: pass,
      }

      this.Httpnetwork.login(data).subscribe((res: any) => {

        if (res == "error") {
          alert.header = 'Invalid'
          alert.buttons = ['OK']
          alert.message = "username or password is incorrect"
          alert.present()
        } else {
          localStorage.setItem('userid', JSON.stringify(res))
          alert.header = "Success";
          alert.message = "Successfully Logged In as " + data.username
          alert.buttons = ['OK']
          alert.present()

          this.router.navigate(['/home'])
          console.log(res)
        }
      }, (error: any) => {
        alert.header = "Request Error";
        alert.message = error.error.message
        alert.buttons = ['OK']
        alert.present()
      })
    }
  }
}
