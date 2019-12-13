import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { delay } from 'rxjs/operators';
import { ICampaign } from '../../interfaces/campaign.model';

@Injectable({
    providedIn: 'root'
})
export class CampaignService {

    campaign = new Subject<ICampaign>();



    read(id: string):Observable<ICampaign> {
        return this.campaign.asObservable().pipe(
            delay(2500)
        )
    }


    post(item:ICampaign){
       this.campaign.next(item);
    }
}