import { PhotoVehicle } from './PhotoVehicle';

export class SearchVehicleDto {

    id:number;   
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
    carrousel:boolean;
    codeStatus:boolean;
    photoId:PhotoVehicle;

}
