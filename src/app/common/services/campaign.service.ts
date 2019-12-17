import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Injectable } from '@angular/core';
import { from } from 'rxjs';
import { delay, map } from 'rxjs/operators';
import { FbCollections } from 'src/app/common/enums/fb-collections.enum';
import { ICampaign } from '../interfaces/campaign.model';
import { MsDelay } from '../enums/delay.enum';


@Injectable()
export class CampaignService {

    private _collection$: AngularFirestoreCollection<ICampaign>;

    constructor(private afs: AngularFirestore) {
        this._collection$ = this.afs.collection<ICampaign>(FbCollections.Campaigns)
    }

    create(campaign: ICampaign) {
        let campainToCreate: ICampaign = this.mapDatesToString(campaign);
        return from(this._collection$.add(campainToCreate))
            .pipe(delay(MsDelay.Default));
    }

    read(id: string) {
        return this._collection$
            .doc(id).get()
            .pipe(map(doc => doc.data()));
    }

    update(campaign: ICampaign) {
        let campainToUpdate: ICampaign = this.mapDatesToString(campaign);
        return from(this._collection$.doc(campainToUpdate.id).set(campainToUpdate))
            .pipe(delay(MsDelay.Default));
    }


    readAll() {
        return from(this._collection$.get());
    }

    readAllAsync(searchTerm: string = '') {
        const end = searchTerm.replace(/.$/, c => String.fromCharCode(c.charCodeAt(0) + 1));
        let query = searchTerm ? (ref) => {
            return ref.orderBy('name')
                .where('name', '>=', searchTerm)
                .where('name', '<', end)
        } : null
        return (query ? this.afs.collection<ICampaign>(FbCollections.Campaigns, query) : this._collection$)
            .snapshotChanges()
            .pipe(this.retriveWithId);
    }

    private readonly retriveWithId = map((actions: Array<any>) => {
        return actions.map(a => {
            const data = a.payload.doc.data() as ICampaign;
            const id = a.payload.doc.id;
            return { id, ...data };
        });
    });

    private readonly mapDatesToString = (campaign: ICampaign):ICampaign => {
        return {
            ...campaign, dateRange: {
                end: campaign.dateRange.end.toString(),
                start: campaign.dateRange.start.toString()
            }
        }
    }


}