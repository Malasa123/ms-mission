import { NgModule } from '@angular/core';
import { SidenavComponent } from './sidenav/sidenav.component';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatListModule} from '@angular/material/list';
import {MatIconModule} from '@angular/material/icon';
import { RouterModule } from '@angular/router';

@NgModule({
    imports: [MatSidenavModule , MatListModule ,RouterModule , MatIconModule],
    declarations: [SidenavComponent],
    exports: [ SidenavComponent],
    providers: [],
})
export class LayoutModule {}