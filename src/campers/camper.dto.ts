import { ObjectId } from "mongodb"

export class CamperDto {
    readonly _id: ObjectId
    readonly name: string
    readonly age: number
    readonly allergies: string[]
    readonly isAllergyToPeanuts: boolean
}