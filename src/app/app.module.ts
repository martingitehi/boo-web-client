import { NgModule } from '@angular/core';
import { HttpModule, Http, Response, RequestOptions } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
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

const appRoutes: Routes = [
  { path: 'profiles', component: ProfilesComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'dashboard/:id', component: DashboardComponent },
  { path: 'profiles/:id/settings', component: SettingsComponent },
  { path: '', component: HomeComponent },
  { path: '', redirectTo: '', pathMatch: 'full' },
  { path: '**', component: HomeComponent }
];

@NgModule({
  imports: [
    HttpModule,
    BrowserModule,
    FormsModule,
    RouterModule.forRoot(appRoutes)
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
    DashnavbarComponent
  ],
  bootstrap: [AppComponent], 
  providers: [API]
})
export class AppModule { }
