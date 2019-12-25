import { CampaignService } from '../../../common/services/campaign.service';
import { Component, OnInit } from '@angular/core';
import { ICampaign } from 'src/app/common/interfaces/campaign.model';
import { Observable, Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { FormControl } from '@angular/forms';
import { debounceTime } from 'rxjs/operators';
import { ToasterService } from 'src/app/common/services/toaster.service';
import { IDictionary } from 'src/app/common/interfaces/dictionary.model';


@Component({
  selector: 'ms-campaigns',
  templateUrl: './campaigns.component.html',
  styleUrls: ['./campaigns.component.scss']
})
export class CampaignsComponent implements OnInit {
  subscriptions: Subscription = new Subscription();
  displayedColumns: Array<string> = ['name', 'bid', 'dailyBudget', 'start', 'end', 'actions'];
  campgains: Array<ICampaign> = []
  cachedDevices: IDictionary<string>  = {};
  campaigns$: Observable<ICampaign | unknown>;
  searchControl = new FormControl();
  loading: boolean = false;


  constructor(private afs: CampaignService, private router: Router, private toasterService: ToasterService) { 
    this.cachedDevices;
  }

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
      this.campgains.forEach(c => {
       this.cachedDevices[c.id] =  this.getDevices(c);
      })
      this.loading = false;
    },
      error => {
        this.loading = false;
        this.toasterService.error('Failed to fetch campaigns');

      });
    this.subscriptions.add(sub);
  }

  get anyCampaigns(){
    return this.campgains && this.campgains.length > 0;
  }


  private getDevices(campaign: ICampaign) {
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
