import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Injectable } from '@angular/core';
import { from, Observable } from 'rxjs';
import { delay, map } from 'rxjs/operators';
import { FbCollections } from 'src/app/common/enums/fb-collections.enum';
import { ICampaign } from '../interfaces/campaign.model';


@Injectable()
export class CampaignService {


    private _collection$: AngularFirestoreCollection<ICampaign>;

    constructor(private afs: AngularFirestore) {
        this._collection$ = this.afs.collection<ICampaign>(FbCollections.Campaigns)
    }

    create(campaign: ICampaign) {
        return from(this._collection$.add(campaign))
            .pipe(delay(2500));
    }

    read(id: string) {
        return this._collection$
            .doc(id).get()
            .pipe(map(doc => doc.data()));
    }

    update(item: ICampaign) {
        return from(this._collection$.doc(item.id).set(item))
            .pipe(delay(2500));
    }


    readAll() {
        return from(this._collection$.get());
    }

    readAllAsync() {
        return this._collection$
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


}