import { Component, OnInit } from '@angular/core';
import { Observable } from "rxjs/Observable";
import { Chat } from "../../interfaces/chat.interface";
import { API } from "../../services/api.service";
import { ActivatedRoute } from "@angular/router";
import { AuthGuard } from "../../services/authGuard.service";

@Component({
  selector: 'app-chats',
  templateUrl: './chats.component.html',
  styleUrls: ['./chats.component.css']
})

export class ChatsComponent implements OnInit {
  response: string;
  id: any;
  messages: Chat[] = [];
  thread: any[] = [];
  content: string;
  user: any;
  constructor(private api: API, private authGuard:AuthGuard,
     private route: ActivatedRoute) {
    this.id = this.route.snapshot.params['id'];
    this.api.getProfile(this.id).subscribe(res => this.user = res);
  }

  ngOnInit() {
    this.getChats();
  }

  sendMessage() {
    let chat: Chat = {
      sender: this.user.info._id,
      receipient: this.id,
      message: this.content,
      sent: new Date
    }

    this.api.postChat(chat, this.id).subscribe((res) => {
      this.response = res;
    });

    this.getChats();
  }

  handleSend(event) {
    if (event.keyCode === 13) {
      this.sendMessage();
    }
  }

  getThread(chat: any) {
    console.log(chat);
    this.thread = chat;
  }

  getChats() {
    this.api.getChats(this.id)
      .subscribe((chats) => {
        this.messages = chats;
      });
  }
}

