import { Component, OnInit } from '@angular/core';
import { API } from "../../services/api.service";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  user: any;
  message: string = '';
  info: string = '';
  constructor(private api: API, private router: Router, private route: ActivatedRoute) {
    this.user = {
      username: '',
      password: ''
    }
  }

  ngOnInit() {
    this.info = this.route.snapshot.params['info'];
  }

  login(user: any) {
    this.api.login(user).then((data) => {
      //check for token
      if (data) {
        this.api.getUserInfo().then((res) => {
          if (res.success) {
            this.router.navigate(['dashboard', res.info._id]);
          }
          else {
            this.message = res.message;
          }
        });
      }
      else {
        this.message = data.message;
      }
    }).catch(err => this.message = err);
  }

}
