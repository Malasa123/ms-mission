import { AuthService } from './../../common/services/auth.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Route, Router } from '@angular/router';


@Component({
  selector: 'ms-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit,OnDestroy {
  loginForm: FormGroup;
  hide = true;

  subscriptions: Subscription = new Subscription();
  error: any = null;
  loading:boolean = false;

  wrongCredentialErrors = [
    'EMAIL_NOT_FOUND',
    'INVALID_PASSWORD'
  ]


  constructor(private _formBuilder: FormBuilder ,private auth:AuthService , private router:Router) { }

  ngOnInit() {
    this.loginForm = this._formBuilder.group({
      email: ['', Validators.email],
      password: ['', Validators.required]
     });
  }

  signIn(){
    this.loading = true;
    this.error = null;
    let sub = this.auth.login(this.loginForm.value).subscribe((response) =>{
      alert(response.user.email);
      this.loading = false;
      this.router.navigate(['/home/campaigns']);

    },
    error=>{
     this.error = error;
     this.loading = false;
    });

    this.subscriptions.add(sub);
  }

  ngOnDestroy(): void {
    if(this.subscriptions.unsubscribe)
    this.subscriptions.unsubscribe();
  }




}
