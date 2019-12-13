import { Component } from '@angular/core';
import { ICampaign } from './common/interfaces/campaign.model';
import { ComponentEditor } from './common/interfaces/editor.model';
import { CampaignService } from './common/components/campaign-wizard/campaign.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent extends ComponentEditor<ICampaign> {
  loading:boolean = false;

  fromBackend :ICampaign = {
    dateRange: {
      end:'',
      start:'',
    },
    name:'slim shady'
  };

  ngOnInit(): void {
    this.cs.read('').subscribe(campaign => {
      this.fromBackend = campaign;
      this.loading = false;
   })
  }



  constructor(private cs:CampaignService){
    super();
     
  }

  onCreate(item:ICampaign){
    this.loading = true;
    this.cs.post(item);
   }

  onUpdate(item:ICampaign){
    console.log('onUpdate' , item);
    this.fromBackend = item;

    //api call
  }
}
