import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatTableModule} from '@angular/material/table';
import { CampaignsComponent } from './campaigns.component';


@NgModule({
    imports: [ CommonModule,MatTableModule , MatIconModule , MatToolbarModule ],
    declarations: [CampaignsComponent],
    exports: [CampaignsComponent],
    providers: [],
})
export class CampaignsModule {}