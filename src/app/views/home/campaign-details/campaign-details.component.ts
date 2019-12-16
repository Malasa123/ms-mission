import { Component, OnInit, OnDestroy } from '@angular/core';
import { ICampaign } from '../../../common/interfaces/campaign.model';
import { ComponentEditor } from '../../../common/interfaces/editor.model';
import { Subscription, Observable } from 'rxjs';
import { ToasterService } from '../../../common/services/toaster.service';
import { CampaignService } from '../../../common/services/campaign.service';
import { Router, Route, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'ms-campaign-details',
  templateUrl: './campaign-details.component.html',
  styleUrls: ['./campaign-details.component.scss']
})
export class CampaignDetailsComponent extends ComponentEditor<ICampaign> implements OnInit, OnDestroy {

  loading: boolean = false;
  fromBackend: ICampaign = {};
  subscriptions: Subscription = new Subscription();
  avaliableDevices$: Observable<Array<string>>;
  campaignToUpdate: ICampaign;

  constructor(private cs: CampaignService, private toasterService: ToasterService, private route: ActivatedRoute

  ) {
    super();
  }
  ngOnInit(): void {
    // this.avaliableDevices$ = this.ds.readAllAsync();
    // let sub = this.ds.create('Mobile').subscribe(campaign => {
    // });
    // let sub = this.cs.readAll('').subscribe(campaign => {
    //   this.fromBackend = campaign;
    //   this.loading = false;
    //   this.toasterService.success('Campaign was created successfully');
    // });
    //  this.subscriptions.add(sub);
    let sub = this.route.params.subscribe(params => {
      const id = params['id'] as string;
      if (id) this.fetchCampain(id);
    });
    this.subscriptions.add(sub);

  }
  fetchCampain(id: string) {
    debugger
    let sub = this.cs.read(id).subscribe(campaignToUpdate => {
      this.fromBackend = { ...campaignToUpdate };
      this.campaignToUpdate = { ...campaignToUpdate };
      this.isEditing = true;
    });
    this.subscriptions.add(sub);
  }





  onCreate(item: ICampaign) {
    this.loading = true;
    let sub = this.cs.create(item).subscribe(ok => {
      this.fromBackend = item;
      this.loading = false;
      this.toasterService.success('Campaign was created successfully');
    }, (error) => {
      this.toasterService.success('Failed to create campaign');
      this.loading = false;
    });
    this.subscriptions.add(sub);
  }

  onUpdate(item: ICampaign) {
    this.loading = true;
    let sub = this.cs.update({ ...this.campaignToUpdate, ...item }).subscribe(ok => {
      this.fromBackend = item;
      this.loading = false;
      this.toasterService.success('Campaign was updated successfully');
    }, (error) => {
      this.toasterService.success('Failed to update campaign');
      this.loading = false;
    });
    this.subscriptions.add(sub);
  }


  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
