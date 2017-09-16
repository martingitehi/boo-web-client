import { Component } from '@angular/core';
import { Http } from "@angular/http";
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs/Observable';
import * as firebase from 'firebase/app';


@Component({
  selector: 'boo',
  templateUrl: './app.component.html',
  providers: [Http]
})
export class AppComponent  {  }