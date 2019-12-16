import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Injectable } from '@angular/core';
import { from , Observable } from 'rxjs';
import { delay } from 'rxjs/operators';
import { FbCollections } from 'src/app/common/enums/fb-collections.enum';


@Injectable()
export class DeviceService {
    _collection$: AngularFirestoreCollection<string>;

    constructor(private afs: AngularFirestore) {
        this._collection$ = this.afs.collection<string>(FbCollections.Devices)
    }

    create(newDevice: string){
      return from(this._collection$.add(newDevice)).pipe(delay(2500) );
    }

    readAllAsync(){
        return this._collection$.valueChanges();
    }


}