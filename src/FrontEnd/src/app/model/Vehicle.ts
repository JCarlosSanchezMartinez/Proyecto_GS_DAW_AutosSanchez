import { User } from 'src/app/model/User';

export class Vehicle {
    id:number;
    vin:String;
    number_plate:String;
    brand:String;
    model:String;
    years:number;
    engine:String;
    price:number;
    fuel:String;
    kms:number;
    color:String;
    extra:String;
    user_id:User;
}