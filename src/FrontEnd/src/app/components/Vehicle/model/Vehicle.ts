import { User } from 'src/app/model/User';

export class Vehicle {
    id:number;
    vin:String;
    number_plate:String;
    brand:String;
    model:String;
    engine:String;
    price:number;
    fuel:String;
    color:String;
    extra:String;
    user_id:User;
}