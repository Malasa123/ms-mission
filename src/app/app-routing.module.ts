import { HomeComponent } from './views/home/home.component';
import { CampaignDetailsComponent } from './views/home/campaign-details/campaign-details.component';
import { CampaignsComponent } from './views/home/campaigns/campaigns.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './views/login/login.component';
import { AuthGuard, UnauthenticatedGuard } from './common/guards/auth.guard';


const routes: Routes = [
  {path: '',component: LoginComponent, pathMatch : 'full' , canActivate : [UnauthenticatedGuard]},
  {path: 'login',component: LoginComponent , canActivate : [UnauthenticatedGuard]},
  {
    path: 'home',
    component : HomeComponent,
    canActivate : [AuthGuard],
    children: [
      { path: '', component: CampaignsComponent , pathMatch : 'full'},
      { path: 'campaigns', component: CampaignsComponent },
      { path: 'campaign/:id', component: CampaignDetailsComponent },
      { path: 'campaign', component: CampaignDetailsComponent },
    ]
  }];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash : true})],
  exports: [RouterModule],
  providers : [AuthGuard , UnauthenticatedGuard]
})
export class AppRoutingModule { }

