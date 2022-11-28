export class Table{
    id: string
    shape: number
    height: number
    width: number
    radius: number
    taken: boolean
    x: number
    y: number

    constructor(id, x, y, shape, height, width, radius){
        this.id = id
        this.x = x
        this.y = y
        this.taken = false
        this.shape = shape
        this.height = height
        this.width = width
        this.radius = radius
    }
}