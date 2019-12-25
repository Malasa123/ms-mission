import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthService } from 'src/app/common/services/auth.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { finalize, map } from 'rxjs/operators';
import { BreakpointObserver } from '@angular/cdk/layout';


@Component({
  selector: 'ms-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  @ViewChild('sidenav', { static: false }) sidenav;

  subscriptions: Subscription = new Subscription();
  isSmallScreen: boolean = false;

  constructor(
    public auth: AuthService,
    private router: Router,
    public breakpointObserver: BreakpointObserver) { }

  ngOnInit() {
    let sub = this.breakpointObserver
      .observe(['(min-width: 623px)'])
      .pipe(map(bs => !bs.matches))
      .subscribe(isSmallScreen => {
        this.isSmallScreen = isSmallScreen;
        this.setDrawer();
      });
    this.subscriptions.add(sub);
  }

  ngAfterViewInit(): void {
    this.setDrawer();
  }

  setDrawer() {
    if (this.sidenav)
        this.isSmallScreen ? this.sidenav.close() : this.sidenav.open();
  }


  signOut() {
    let sub = this.auth.signOut()
      .pipe(this.signOutAnyway)
      .subscribe();
    this.subscriptions.add(sub);
  }


  get signOutAnyway() {
    return finalize(() => {
      this.router.navigate(['/login']);
    })
  }


  ngOnDestroy(): void {
    if (this.subscriptions.unsubscribe)
      this.subscriptions.unsubscribe();
  }


}
