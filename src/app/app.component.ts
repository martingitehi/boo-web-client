import { Component } from '@angular/core';
import { Http } from "@angular/http";


@Component({
  selector: 'boo',
  templateUrl: './app.component.html',
  providers: [Http]
})
export class AppComponent  {  }