import { NgModule } from '@angular/core';
import { HttpModule, Http, Response, RequestOptions } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { environment } from '../environments/environment';
import { RouterModule, Routes } from '@angular/router';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AppComponent } from './app.component';
import { API } from "./services/api.service";
import { FilterArrayPipe } from "./services/filterby.pipe";
import 'hammerjs';
import { ProfilesComponent } from "./components/profiles/profiles.component";
import { LoginComponent } from "./components/login/login.component";
import { RegisterComponent } from "./components/register/register.component";
import { SettingsComponent } from "./components/settings/settings.component";
import { DashboardComponent } from "./components/dashboard/dashboard.component";
import { HomeComponent } from "./components/home/home.component";
import { NavbarComponent } from "./components/navbar/navbar.component";
import { DashnavbarComponent } from "./components/dashnavbar/dashnavbar.component";
import { OrderByPipe } from "./services/orderby.pipe";
import { AuthGuard } from "./services/authGuard.service";
import { UploadService } from "./services/upload.service";
import { ChatsComponent } from './components/chats/chats.component';
import { ChatComponent } from './components/chat/chat.component';
import * as firebase from 'firebase';

const appRoutes: Routes = [
  { path: 'profiles', component: ProfilesComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'chats', component: ChatsComponent, canActivate: [AuthGuard] },
  { path: 'chats/:id', component: ChatComponent, canActivate: [AuthGuard] },
  { path: 'register', component: RegisterComponent },
  { path: 'dashboard/:id', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: 'profiles/:id/settings', component: SettingsComponent, canActivate: [AuthGuard] },
  { path: '', component: HomeComponent },
  { path: '', redirectTo: '', pathMatch: 'full' },
  { path: '**', component: HomeComponent }
];

firebase.initializeApp(environment.firebase);

@NgModule({
  imports: [
    HttpModule,
    BrowserModule,
    FormsModule,
    RouterModule.forRoot(appRoutes),
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFireAuthModule
  ],
  declarations: [
    AppComponent,
    FilterArrayPipe,
    OrderByPipe,
    LoginComponent,
    RegisterComponent,
    ProfilesComponent,
    SettingsComponent,
    DashboardComponent,
    HomeComponent,
    NavbarComponent,
    DashnavbarComponent,
    ChatsComponent,
    ChatComponent
  ],
  bootstrap: [AppComponent],
  providers: [AuthGuard, API, UploadService]
})
export class AppModule { }
