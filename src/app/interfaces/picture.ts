export interface Picture {
    id: number,
    _id: string,
    __v: number
    path: string,
    titles: [{
        title: string,
        vote: number
    }]
}
