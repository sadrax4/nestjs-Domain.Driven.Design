export class UpdateCamperEvent {
    constructor(
        public readonly camperId: string,
        public readonly camperName: string
    ) { }
}