import { Address } from "./address"

export class CompanyRegisterRequest{
    firstname: string
    lastname: string
    username: string
    password: string
    phone: string
    email: string
    companyName: string
    companyID: string
    pib: string
    address: Address
    imageSrc: string
}