import { CampaignService } from '../../../common/services/campaign.service';
import { Component, OnInit } from '@angular/core';
import { ICampaign } from 'src/app/common/interfaces/campaign.model';
import { Observable, Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { FormControl } from '@angular/forms';
import { debounceTime } from 'rxjs/operators';


@Component({
  selector: 'ms-campaigns',
  templateUrl: './campaigns.component.html',
  styleUrls: ['./campaigns.component.scss']
})
export class CampaignsComponent implements OnInit {
  subscriptions: Subscription = new Subscription();
  displayedColumns: Array<string> = ['name', 'bid', 'dailyBudget', 'start', 'end', 'actions']
  campgains: Array<ICampaign> = []
  campaigns$: Observable<ICampaign | unknown>;
  searchControl = new FormControl();
  loading: boolean = false;


  constructor(private afs: CampaignService, private router: Router) { }

  ngOnInit() {
    this.searchByTerm('');
    let sub = this.searchControl.valueChanges.pipe(
      debounceTime(300)
    )
      .subscribe(this.searchByTerm);
    this.subscriptions.add(sub);
  }

  searchByTerm = (term: string) => {
    this.loading = true;
    let sub = this.afs.readAllAsync(term).subscribe(campaigns => {
      this.campgains = campaigns;
      this.loading = false;
    },
      error => {
        this.loading = false;
      });
    this.subscriptions.add(sub);
  }
  

  getDevices(campaign: ICampaign){
     return campaign.devices && campaign.devices.length ? `Devices: ${campaign.devices.join(', ')}` : 'N/A'
  }
  editCampaign(campaign: ICampaign) {
    this.router.navigate(['home/campaign', campaign.id])
  }
  goToCreatePage() {
    this.router.navigateByUrl('home/campaign')
  }

  ngOnDestroy(): void {
    if (this.subscriptions.unsubscribe)
      this.subscriptions.unsubscribe();
  }

}
