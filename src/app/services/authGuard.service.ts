import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { CanActivate, Router, RouterStateSnapshot, ActivatedRouteSnapshot } from "@angular/router";
import { API } from "./api.service";

@Injectable()

export class AuthGuard implements CanActivate {
    auth_state: boolean;

    constructor(private router: Router, private api: API) {
        this.auth_state = this.api.isLoggedIn;
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        return this.api.authState().then((auth) => {
            if (!auth) {
                this.router.navigateByUrl('/login');
                return false;
            }
            return true;
        });
    }
}