import { AngularFireAuth } from '@angular/fire/auth';
import { Injectable } from '@angular/core';
import { IUser } from '../interfaces/user.model';
import { from , Observable } from 'rxjs';
import { delay } from 'rxjs/operators';
import { User } from 'firebase';


@Injectable()
export class AuthService {

    constructor(private fireAuth: AngularFireAuth) {
    }

    login(user: IUser):Observable<firebase.auth.UserCredential> {
        return from(this.fireAuth.auth.signInWithEmailAndPassword(user.email, user.password))
              .pipe(delay(2500));
    }

    signOut():Observable<void> {
        return from(this.fireAuth.auth.signOut());
    }

    get currentUser():Observable<User | null>{
        return this.fireAuth.user;
    }
}