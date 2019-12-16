import { CampaignService } from '../../../common/services/campaign.service';
import { Component, OnInit } from '@angular/core';
import { ICampaign } from 'src/app/common/interfaces/campaign.model';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { FbCollections } from 'src/app/common/enums/fb-collections.enum';

import { Observable, Subscription } from 'rxjs';
import { Router } from '@angular/router';


@Component({
  selector: 'ms-campaigns',
  templateUrl: './campaigns.component.html',
  styleUrls: ['./campaigns.component.scss']
})
export class CampaignsComponent implements OnInit {
  subscriptions: Subscription = new Subscription();
  displayedColumns: Array<string> = ['ID' , 'name', 'bid', 'dailyBudget',  'start' , 'end' , 'actions' ]
  campgains: Array<ICampaign> = [{
    name: 'Campaign name',
    bid: 100,
    dailyBudget: 13,
    status: 'sda',
  }]
  campaigns$: Observable<ICampaign | unknown>;
  collection$: AngularFirestoreCollection<ICampaign>;
  constructor(private afs: CampaignService ,private router:Router) { }

  ngOnInit() {
    this.campaigns$ = this.afs.readAllAsync();
  }


  editCampaign(campaign:ICampaign){
    this.router.navigate(['home/campaign' , campaign.id])
  }

  ngOnDestroy(): void {
    if (this.subscriptions.unsubscribe)
      this.subscriptions.unsubscribe();
  }

}
