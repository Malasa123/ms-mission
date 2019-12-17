import { Component, OnInit, OnDestroy } from '@angular/core';
import { ICampaign } from '../../../common/interfaces/campaign.model';
import { ComponentEditor } from '../../../common/interfaces/editor.model';
import { Subscription, Observable } from 'rxjs';
import { ToasterService } from '../../../common/services/toaster.service';
import { CampaignService } from '../../../common/services/campaign.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'ms-campaign-details',
  templateUrl: './campaign-details.component.html',
  styleUrls: ['./campaign-details.component.scss']
})
export class CampaignDetailsComponent extends ComponentEditor<ICampaign> implements OnInit, OnDestroy {

  loading: boolean = false;
  campaign: ICampaign = {};
  subscriptions: Subscription = new Subscription();
  avaliableDevices$: Observable<Array<string>>;
  id: string = null;

  constructor(
    private cs: CampaignService,
    private toasterService: ToasterService,
    private route: ActivatedRoute
    , private router: Router
  ) {
    super();
  }
  ngOnInit(): void {
    let sub = this.route.params.subscribe(params => {
      this.id = params['id'] as string;
      if (this.id) this.fetchCampain();
    });
    this.subscriptions.add(sub);

  }
  fetchCampain() {
    let sub = this.cs.read(this.id).subscribe(campaignToUpdate => {
      this.campaign = campaignToUpdate;
      this.isEditing = true;
    });
    this.subscriptions.add(sub);
  }

  get title(){
    return this.isEditing ? 'Update campaign' : 'Create campaign';
  }





  onCreate(item: ICampaign) {
    this.loading = true;
    let sub = this.cs.create(item).subscribe(ok => {
      this.campaign = item;
      this.loading = false;
      this.toasterService.success('Campaign was created successfully');
      this.router.navigateByUrl('home/campaigns')
    }, (error) => {
      this.toasterService.error('Failed to create campaign');
      this.loading = false;
    });
    this.subscriptions.add(sub);
  }

  onUpdate(item: ICampaign) {
    this.loading = true;
    let sub = this.cs.update({ ...item, id: this.id }).subscribe(ok => {
      this.campaign = item;
      this.loading = false;
      this.id = null;
      this.toasterService.success('Campaign was updated successfully');
      this.router.navigateByUrl('home/campaigns')

    }, (error) => {
      this.toasterService.error('Failed to update campaign');
      this.loading = false;
      this.id = null;
    });
    this.subscriptions.add(sub);
  }


  ngOnDestroy(): void {
    if (this.subscriptions.unsubscribe)
      this.subscriptions.unsubscribe();
  }
}
