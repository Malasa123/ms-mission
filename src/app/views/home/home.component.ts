import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/common/services/auth.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'ms-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  subscriptions: Subscription = new Subscription();

  constructor(public auth: AuthService, private router: Router) { }

  ngOnInit() {
  }


  signOut() {
    let sub = this.auth.signOut()
      .pipe(this.signOutAnyway)
      .subscribe(() => { });
    this.subscriptions.add(sub);
  }


  get signOutAnyway(){
    return finalize(() => {
      this.router.navigate(['/login']);
    })
  }


  ngOnDestroy(): void {
    if (this.subscriptions.unsubscribe)
      this.subscriptions.unsubscribe();
  }


}
