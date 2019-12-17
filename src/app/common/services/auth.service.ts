import { AngularFireAuth } from '@angular/fire/auth';
import { Injectable } from '@angular/core';
import { IUser } from '../interfaces/user.model';
import { from , Observable } from 'rxjs';
import { delay, map } from 'rxjs/operators';
import { User } from 'firebase';
import { MsDelay } from '../enums/delay.enum';


@Injectable()
export class AuthService {

    constructor(private fireAuth: AngularFireAuth) {
    }

    login(user: IUser):Observable<firebase.auth.UserCredential> {
        return from(this.fireAuth.auth.signInWithEmailAndPassword(user.email, user.password))
              .pipe(delay(MsDelay.Default));
    }

    signOut():Observable<void> {
        return from(this.fireAuth.auth.signOut());
    }

    get currentUser():Observable<User | null>{
        return this.fireAuth.user;
    }
    get isLoggedIn():Observable<boolean>{
        return this.currentUser.pipe(map(user => {
            if(user) return true;
            return false;
        }));
    }
}