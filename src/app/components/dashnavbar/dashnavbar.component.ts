import { Component, OnInit } from '@angular/core';
import { API } from "../../services/api.service";
import { Location } from '@angular/common';
import { Router, ActivatedRoute } from "@angular/router";
import { Observable } from "rxjs/Observable";
import { Chat } from "../../interfaces/chat.interface";
import { AuthGuard } from "../../services/authGuard.service";
import { UserAccount } from "../../interfaces/account";

@Component({
  selector: 'dashnavbar',
  templateUrl: './dashnavbar.component.html',
  styleUrls: ['./dashnavbar.component.css']
})
export class DashnavbarComponent implements OnInit {
  filter: any = '';
  showSearch: boolean = true;
  id: any;
  messages: Chat[] = [];
  user: UserAccount;

  constructor(private api: API, private authGuard:AuthGuard, 
    private router: Router,
    private route: ActivatedRoute,
    private location: Location) {
    this.id = this.route.snapshot.params['id'];    
  }

  ngOnInit(){
    this.api.getProfile(this.id).subscribe(res => this.user = res);
    this.getChats();
  }

  logout() {
    this.api.destroyUserCredentials();
    this.router.navigate(['/login']);
  }

  getChats() {
    this.api.getChats(this.id)
      .subscribe((chats) => {
        this.messages = chats;
      });
  }

}
