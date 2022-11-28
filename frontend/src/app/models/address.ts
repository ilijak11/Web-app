export class Address{
    country: string
    city: string
    postCode: number
    street: string
    streetNumber: number

    constructor(country?: string, city?: string, postCode?: number, street?: string, streetNumber?: number){
        this.country = country
        this.city = city
        this.postCode = postCode
        this.street = street
        this.streetNumber = streetNumber
    }
}