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
import { AngularFireModule } from '@angular/fire';
import { environment } from 'src/environments/environment';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { HomeModule } from '../views/home/home.module';
import { LoginModule } from '../views/login/login.module';


@NgModule({
    declarations: [],
    imports: [
        CommonModule,
        AppRoutingModule,
        HttpClientModule,
        MatSnackBarModule,
        MatNativeDateModule,
        BrowserAnimationsModule,
        ReactiveFormsModule,
        AngularFireModule.initializeApp(environment.firebase),
        AngularFireAuthModule,
        AngularFirestoreModule,
        HomeModule,
        LoginModule
    ],
    exports: [],
    providers: [ToasterService , AuthService],
})
export class SharedModule { }