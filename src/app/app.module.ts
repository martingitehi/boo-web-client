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
import * as firebase from 'firebase';
import { FooterComponent } from './components/footer/footer.component';
import { ImageViewComponent } from './components/image-view/image-view.component';

const appRoutes: Routes = [
  { path: 'profiles', component: ProfilesComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'chats/:id', component: ChatsComponent, canActivate: [AuthGuard] },
  { path: 'image/:id', component: ImageViewComponent, canActivate: [AuthGuard] },
  { path: 'register', component: RegisterComponent },
  { path: 'dashboard/:id', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: 'profiles/:id/preferences', component: SettingsComponent, canActivate: [AuthGuard] },
  { path: '', component: LoginComponent },
  { path: '', redirectTo: '', pathMatch: 'full' },
  { path: '**', component: LoginComponent }
];

@NgModule({
  imports: [
    HttpModule,
    BrowserModule,
    FormsModule,
    RouterModule.forRoot(appRoutes),
    AngularFireModule,    
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    AngularFireModule.initializeApp(environment.firebase)
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
    FooterComponent,
    ImageViewComponent
  ],
  bootstrap: [AppComponent],
  providers: [AuthGuard, API, UploadService]
})
export class AppModule { }
