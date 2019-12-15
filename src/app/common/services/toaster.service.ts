import { Injectable } from '@angular/core';
import {MatSnackBar, MatSnackBarRef, SimpleSnackBar} from '@angular/material/snack-bar';


@Injectable()
export class ToasterService {
    private _snackRef: MatSnackBarRef<SimpleSnackBar>;
    constructor(private _snackBar: MatSnackBar) {}

    error(message:string ,config : { duration:number,action:string} = {duration : 5000 ,action : 'close'}){
        this._snackRef = this._snackBar.open(message, config.action, {
            duration: config.duration,
        });
    }

    success(message:string ,config : { duration:number,action:string} = {duration : 3000 ,action : 'close'}){
        this._snackBar.open(message, config.action, {
            duration: config.duration,
        });
    }

    dissmiss(){
        if(this._snackRef.dismiss){
            this._snackRef.dismiss();
        }
    }

}