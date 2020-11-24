import { User } from 'src/app/model/User';

export class Vehicle {
    id:number;
    vin:String;
    numberPlate:String;
    brand:String;
    model:String;
    imagen:String;
    years:number;
    engine:String;
    price:number;
    fuel:String;
    kms:number;
    chasis:string;
    color:String;
    extra:String;
    userId:User;
    carrousel:boolean;
    codeStatus:boolean;
}