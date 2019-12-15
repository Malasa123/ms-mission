import { Component, OnInit, OnDestroy } from '@angular/core';
import { ICampaign } from 'src/app/common/interfaces/campaign.model';
import { CampaignService } from 'src/app/common/components/campaign-wizard/campaign.service';
import { ComponentEditor } from 'src/app/common/interfaces/editor.model';
import { Subscription } from 'rxjs';
import { ToasterService } from 'src/app/common/services/toaster.service';

@Component({
  selector: 'ms-campaign-details',
  templateUrl: './campaign-details.component.html',
  styleUrls: ['./campaign-details.component.scss']
})
export class CampaignDetailsComponent extends ComponentEditor<ICampaign> implements OnInit, OnDestroy {

  loading: boolean = false;
  fromBackend: ICampaign = {};
  subscriptions: Subscription = new Subscription();

  constructor(private cs: CampaignService ,private toasterService: ToasterService) {
    super();
  }
  ngOnInit(): void {
    let sub = this.cs.read('').subscribe(campaign => {
      this.fromBackend = campaign;
      this.loading = false;
      this.toasterService.success('Campaign was created successfully');
    });
    this.subscriptions.add(sub);
  }





  onCreate(item: ICampaign) {
    this.loading = true;
    this.cs.post(item);
  }

  onUpdate(item: ICampaign) {
    this.fromBackend = item;
  }


  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
