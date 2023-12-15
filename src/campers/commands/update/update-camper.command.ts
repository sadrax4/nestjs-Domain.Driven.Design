export class UpdateCamperAllergies {
    constructor(
        public camperId: string,
        public camperAllergies: string[]
    ) { }
}