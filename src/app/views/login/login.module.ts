import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login.component';
import { ReactiveFormsModule } from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';



@NgModule({
    imports: [ CommonModule ,ReactiveFormsModule, MatFormFieldModule,MatInputModule ,MatProgressSpinnerModule, MatCardModule ,MatButtonModule , MatIconModule],
    declarations: [LoginComponent],
    exports: [LoginComponent],
    providers: [],
})
export class LoginModule {}