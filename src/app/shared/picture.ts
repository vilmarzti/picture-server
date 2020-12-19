export interface Picture {
    id: number,
    _id: string,
    __v: number
    path: string,
    url: URL,
    titles: [{
        title: string,
        votes: number,
        date: string,
    }],
    seq2seq_titles:[{
        title: string,
        votes: number
    }],
    baseline_titles: [{
        title: string,
        votes: number
    }]
}