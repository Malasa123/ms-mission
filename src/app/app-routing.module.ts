import { HomeComponent } from './views/home/home.component';
import { CampaignDetailsComponent } from './views/home/campaign-details/campaign-details.component';
import { CampaignsComponent } from './views/home/campaigns/campaigns.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './views/login/login.component';


const routes: Routes = [
  {path: '',component: LoginComponent, pathMatch : 'full'},
  {path: 'login',component: LoginComponent},
  {
    path: 'home',
    component : HomeComponent,
    children: [
      { path: '', component: CampaignsComponent , pathMatch : 'full'},
      { path: 'campaigns', component: CampaignsComponent },
      { path: 'campaign/:id', component: CampaignDetailsComponent },
      { path: 'campaign', component: CampaignDetailsComponent },
    ]
  }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

