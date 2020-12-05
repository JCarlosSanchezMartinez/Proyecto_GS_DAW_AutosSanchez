import { User } from '../model/User';

export interface FilterVehicle {
    numberPlate?:string;
    vin?:string;
    brand?:string;
    model?:string;
    user?:User;
    codeStatus?:boolean;
}
