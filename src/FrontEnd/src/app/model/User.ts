import { Municipality } from './Municipality';

export class User {
    id:number;
    dni:string;
    firstName:string;
    lastName:string;
    label:string;
    address:string;
    municipality:Municipality;
    phone:number;
    email:string;
    username:string;
    password:string;
    codeStatus:boolean;
    authorities: String[];
	
}