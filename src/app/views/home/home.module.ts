import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { CampaignWizardModule } from './../../common/components/campaign-wizard/campaign-wizard.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutModule } from './../../common/components/layout/layout.module';
import { HomeComponent } from './home.component';
import { CampaignsComponent } from './campaigns/campaigns.component';
import { CampaignDetailsComponent } from './campaign-details/campaign-details.component';
import { RouterModule } from '@angular/router';

@NgModule({
    imports: [CommonModule,RouterModule, LayoutModule, CampaignWizardModule , MatToolbarModule ,MatIconModule],
    declarations: [
        HomeComponent,
        CampaignsComponent,
        CampaignDetailsComponent
    ],
    exports: [HomeComponent],
    providers: [],
})
export class HomeModule { }