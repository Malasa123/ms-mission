import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { ToasterService } from '../common/services/toaster.service';
import { AppRoutingModule } from '../app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatNativeDateModule } from '@angular/material/core';
import { AuthService } from '../common/services/auth.service';


@NgModule({
    declarations: [],
    imports: [
        CommonModule,
        AppRoutingModule,
        HttpClientModule,
        MatSnackBarModule,
        MatNativeDateModule,
        BrowserAnimationsModule,
        ReactiveFormsModule
    ],
    exports: [],
    providers: [ToasterService , AuthService],
})
export class SharedModule { }