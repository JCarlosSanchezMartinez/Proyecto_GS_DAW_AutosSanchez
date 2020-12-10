import { User } from 'src/app/model/User';
import { Fuel } from '../interfaces/fuel';
import { PhotoVehicle } from './PhotoVehicle';

export class Vehicle {
    id:number;
    vin:string;
    numberPlate:string;
    brand:string;
    model:string;  
    sellDate:Date;
    engine:string;
    price:number;
    fuel:string;
    kms:number;
    chasis:string;
    color:string;
    extra:string;
    photoHead:string;
    carrousel:boolean;
    codeStatus:boolean;
    userId:User;
  
}