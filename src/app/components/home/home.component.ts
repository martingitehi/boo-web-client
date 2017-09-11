import { Component, OnInit } from '@angular/core';
import { API } from "../../services/api.service";
import { Router } from "@angular/router";

@Component({
    selector: 'home',
    templateUrl: './home.component.html',
    styleUrls:['./home.component.css']
})
export class HomeComponent implements OnInit {
    num: Number;
    constructor(private api: API, private router: Router) {

    }

    ngOnInit() {
        this.num =0;
        this.getProfiles();
    }

    getProfiles() {
        setTimeout(this.api.getProfiles().subscribe((res: any[]) => {
            this.num = res.length;
        }, (error: Error) => console.error(error)), 1000);
    }
}