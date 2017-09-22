import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { FirebaseApp } from 'angularfire2';
import * as firebase from 'firebase';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { environment } from "../../environments/environment.prod";
import { GalleryImage } from '../interfaces/gallery-image';
import { UserAccount } from "../interfaces/account";
import { Chat } from "../interfaces/chat.interface";

@Injectable()

export class API {
    private http: any;
    baseUrl: string;
    authUrl: string;
    authToken: any;
    public isLoggedIn: boolean = localStorage.getItem('auth_token') != null;
    constructor(http: Http, private db: AngularFireDatabase) {
        this.http = http;
        this.authUrl = environment.apiConfig.authUrl;
        this.baseUrl = environment.apiConfig.baseUrl;
    }

    public CalculateAge(birthdate: string): any {
        return Math.floor(((Date.now() - Date.parse(birthdate)) / (1000 * 3600 * 24)) / 365);
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

    getProfiles(): any {
        return this.http.get(this.baseUrl + 'profiles')
            .map(this.extractData)
            .catch(this.handleError);
    }

    getProfile(id: any): Observable<UserAccount> {
        return this.http.get(this.baseUrl + 'profiles/' + id)
            .map(this.extractData)
            .catch(this.handleError);
    }

    uploadAvatar(id: string, image: string) {
        let body = JSON.stringify({ image: image });
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        return new Promise(resolve => {
            return this.http.put(this.baseUrl + `profile/${id}/upload`, body, options)
                .subscribe((res) => {
                    if (res.success) {
                        resolve(res.json().url);
                    }
                    else {
                        resolve(false);
                    }
                });
        });
    }

    getImages(userId: any): FirebaseListObservable<GalleryImage[]> {
        return this.db.list(`uploads/${userId}`);
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

    updateProfile(profile: any, id: any) {
        let body = JSON.stringify(profile);
        let headers = new Headers({ 'Content-Type': 'application/json', 'Authorization': localStorage.getItem('auth_token') });
        let options = new RequestOptions({ headers: headers });
        return this.http.put(this.baseUrl + 'profiles/' + id, body, options)
            .map(this.extractData)
            .catch(this.handleError);
    }

    postChat(chat: Chat, id: any) {
        let body = JSON.stringify(chat);
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        return this.http.post(this.baseUrl + 'chats/' + id, body, options)
            .map(this.extractData)
            .catch(this.handleError);
    }

    getChats(id: any) {
        return this.http.get(this.baseUrl + 'chats')
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
        window.localStorage.removeItem('auth_token');
        this.authToken = null;
        this.isLoggedIn = false;
    }

    authState() {
        return new Promise(resolve => {
            if (this.isLoggedIn) {
                resolve(true);
            }
            resolve(false);
        });
    }

    login(user: any): any {
        let credentials = JSON.stringify(user);
        let headers = new Headers({
            'Content-Type': 'application/json'
        });
        return new Promise(resolve => {
           return this.http.post(this.authUrl + 'login', credentials, { headers: headers })
                .subscribe((data: any) => {
                    if (data.json().success) {
                        this.storeUserCredentials(data.json().token);
                        resolve({ success: true });
                    }
                    else {
                        resolve({ success: false, msg: data.json().message });
                    }
                });
        });
    }

    getUserInfo(): any {
        return new Promise(resolve => {
            this.getUserCredentials();
            var headers = new Headers();
            headers.append('Authorization', 'Bearer ' + this.authToken);
           return this.http.get(this.authUrl + 'getinfo', { headers: headers })
                .subscribe((data: any) => {
                    if (data.json().success) {
                        localStorage.setItem('user', JSON.stringify({ id: data.json().info._id, name: data.json().info.fullname }));
                        resolve(data.json());
                    }
                    else {
                        resolve({ success: false, msg: data.json().message });
                    }
                });
        });
    }

    extractData(res: Response) {
        return res.json();
    }

    private handleError(error: Response | any) {
        return Observable.throw(error || 'Server error');
    }

}