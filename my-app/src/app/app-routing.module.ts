import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';


const routes: Routes = [
  { path: "home", title: 'Home page', component: HomeComponent },
  { path: "", component: HomeComponent }, // goes by default to HomeComponent
  { path: "contact", title: 'Contact us page', component: ContactComponent },
  { path: "about", title: 'About us page', component: AboutComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
