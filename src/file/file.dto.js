export class FileDto {
    id
    name
    extension
    mimeType
    size

    constructor(model) {
        this.id = model.id
        this.name = model.name
        this.extension = model.extension
        this.mimeType = model.mimeType
        this.size = model.size
    }
}
