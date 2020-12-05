import { User } from 'src/app/model/User';
import { PhotoVehicle } from './PhotoVehicle';

export class Vehicle {
    id:number;
    vin:String;
    numberPlate:String;
    brand:String;
    model:String;    
    sellDate:Date;
    engine:String;
    price:number;
    fuel:String;
    kms:number;
    chasis:string;
    color:String;
    extra:String;
    carrousel:boolean;
    codeStatus:boolean;
    photoId:PhotoVehicle;
    userId:User;
  
}