import { CampaignService } from '../../common/services/campaign.service';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { CampaignWizardModule } from './../../common/components/campaign-wizard/campaign-wizard.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { CampaignDetailsComponent } from './campaign-details/campaign-details.component';
import { RouterModule } from '@angular/router';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { CampaignsModule } from './campaigns/campaigns.module';
import { DeviceService } from '../../common/services/devices.service';


@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        CampaignsModule,
        MatSidenavModule,
        CampaignWizardModule,
        MatListModule,
        MatToolbarModule,
        MatIconModule
    ],
    declarations: [
        HomeComponent,
        CampaignDetailsComponent
    ],
    exports: [HomeComponent],
    providers: [CampaignService , DeviceService],
})
export class HomeModule { }