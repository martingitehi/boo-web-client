import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';

@Injectable()

export class API {
    private http: any;
    baseUrl: string;
    authUrl: string;
    authToken: any;
    isLoggedIn: boolean;
    constructor(http: Http) {
        this.http = http;
        this.baseUrl = 'https://boo-boo.herokuapp.com/api/';
        this.authUrl = 'https://boo-boo.herokuapp.com/auth/';
        // this.baseUrl = 'http://192.168.137.1:3000/api/';
        // this.authUrl = 'http://192.168.137.1:3000/auth/';
        this.authToken = null;
        this.isLoggedIn = localStorage.getItem('auth_token') != null;
    }

    checkout(cart: any, cashier: string, store_id: any, has_credit: boolean, paid_via: string,
        customer: any, receipt_no: string, credit_amount: number) {
        let body = JSON.stringify(
            {
                cart: cart,
                cashier: cashier,
                store_id: store_id,
                has_credit: has_credit,
                paid_via: paid_via,
                customer: customer,
                receipt_no: receipt_no,
                credit_amount: credit_amount
            }
        );
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });

        return this.http.post(this.baseUrl + 'checkout', body, options)
            .map(this.extractData)
            .catch(this.handleError);
    }

    getProfiles() {
        return this.http.get(this.baseUrl + 'profiles')
            .map(this.extractData)
            .catch(this.handleError);
    }

    getProfile(id: any) {
        return this.http.get(this.baseUrl + 'profiles/' + id)
            .map(this.extractData)
            .catch(this.handleError);
    }

    register(user: any): any {
        let body = JSON.stringify(user);
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        return new Promise(resolve => {
            return this.http.post(this.authUrl + 'signup', body, options)
                .subscribe((data: any) => {
                    if (data.success == true) {
                        resolve(true)
                    }
                    else {
                        resolve(data.json().message);
                    }
                });
        });
    }

    updateProduct(product: any) {
        let body = JSON.stringify(product);
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        return this.http.put(this.baseUrl + 'products/' + product._id, body, options)
            .map(this.extractData)
            .catch(this.handleError);
    }

    storeUserCredentials(token: any) {
        localStorage.setItem('auth_token', token);
        this.useCredentials(token);
    }

    getUserCredentials() {
        var token = localStorage.getItem('auth_token');
        this.useCredentials(token);
    }

    useCredentials(token: any) {
        this.isLoggedIn = true;
        this.authToken = token;
    }

    destroyUserCredentials() {
        this.authToken = null;
        this.isLoggedIn = false;
        localStorage.clear();
    }

    login(user: any): any {
        let credentials = JSON.stringify(user);
        let headers = new Headers({ 'Content-Type': 'application/json' });
        return new Promise(resolve => {
            this.http.post(this.authUrl + 'login', credentials, { headers: headers })
                .subscribe((data: any) => {
                    if (data.json().success) {
                        this.storeUserCredentials(data.json().token);
                        resolve(true);
                    }
                    else {
                        resolve(false);
                    }
                });
        });
    }

    getUserInfo(): any {
        return new Promise(resolve => {
            this.getUserCredentials();
            var headers = new Headers();
            headers.append('Authorization', 'Bearer ' + this.authToken);
            this.http.get(this.authUrl + 'getinfo', { headers: headers }).subscribe((data: any) => {
                if (data.json().success) {
                    localStorage.setItem('id', data.json().id);
                    localStorage.setItem('role', data.json().role);
                    resolve(data.json());
                }
                else {
                    resolve(false);
                }
            });
        });
    }

    extractData(res: Response) {
        return res.json();
    }

    private handleError(error: Response | any) {
        console.log(error);
        return Observable.throw(error || 'Server error');
    }

}