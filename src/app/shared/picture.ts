export interface Picture {
    id: number,
    _id: string,
    __v: number
    path: string,
    url: URL,
    titles: [{
        title: string,
        vote: number
    }]
}