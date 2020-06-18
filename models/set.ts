export enum CardType {
    WORD = "word",
    PHRASE = "phrase",
}

export interface Card {
    id: string;
    type: CardType,
    name: string;
    practice: string[];
}

export interface Set {
    id: string;
    title: string;
    date: string;
    cards: Card[];
}
