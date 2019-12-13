import { IRange } from './range.model';

export interface ICampaign {
    name?:string;
    status?:string;
    dateRange?:IRange;
    bid?:number;
    dailyBudget?:string;
    devices?:Array<string>;
}