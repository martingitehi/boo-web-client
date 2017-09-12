import { Component, OnInit } from '@angular/core';
import { API } from "../../services/api.service";
import { Router } from "@angular/router";

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  user: any;
  message: string = '';
  constructor(private api: API, private router: Router) {
    this.user = {
      username: '',
      password: ''
    }
  }

  ngOnInit() {
  }

  login(user: any) {
    this.api.login(user).then(data => {
      this.api.getUserInfo().then(res => {
        if (res.success) {
          this.router.navigate(['dashboard', res.info._id]);
        }
        else {
          this.message = res.message;
        }
      })
    }).catch(err => this.message = err);
  }

}
