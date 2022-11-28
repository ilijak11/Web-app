import { Address } from "./address"
import { Table } from "./table";

export class CashRegister{
    registerType: number
    address: Address
    storeName: string;
    id: number;

    sections: Section[]

    constructor(id: number, type: number, storeName: string,  address: Address){
        this.id = id
        this.registerType = type
        this.storeName = storeName
        this.address = address
        this.sections = new Array<Section>()
        this.sections.push(new Section(400, 400, "Glavna sekcija"))
    }
}

export class Section{
    height: number;
    width: number;

    name: string
    tables: Table[]

    constructor(height: number, width: number, name: string){
        this.height = height
        this.width = width
        this.name = name
        this.tables = new Array<Table>()
    }
}