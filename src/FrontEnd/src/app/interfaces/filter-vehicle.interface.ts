import { User } from '../model/User';
import { Vehicle } from '../model/Vehicle';

export interface FilterVehicle {
    vehicle?:Vehicle;
    brand?:string;
    model?:string;
    user?:User;
    codeStatus?:boolean;
}
