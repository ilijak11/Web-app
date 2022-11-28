export class ItemCategory{
    category: string
    subCategories: SubCategory[]

    constructor(category: string){
        this.category = category
        this.subCategories = new Array<SubCategory>()
    }
}

export class SubCategory{
    subCategory: string

    constructor(subCategory: string){
        this.subCategory = subCategory
    }
}