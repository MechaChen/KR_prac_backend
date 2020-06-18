import { Context } from "https://deno.land/x/abc@v1.0.0-rc10/mod.ts";
import { moment } from "https://deno.land/x/moment/moment.ts";
import { v4 } from 'https://deno.land/std/uuid/mod.ts';
import { Set, Card, CardType } from '../models/set.ts';

let set: Set = {
    id: '1',
    title: '首爾大學第 12 課',
    date: moment().locale('ko').format('MMMM Do'),
    cards: [
        {
            id: '1',
            type: CardType.WORD,
            name: '기숙사',
            practice: [
                '기숙사11111111111111',
                '기숙사22222222222222',
                '기숙사33333333333333',
            ],
        },
        {
            id: '2',
            type: CardType.WORD,
            name: '빌라',
            practice: [
                '빌라11111111111111',
                '빌라22222222222222',
                '빌라33333333333333',
            ],
        },
        {
            id: '3',
            type: CardType.WORD,
            name: '원룸',
            practice: [
                '원룸11111111111111',
                '원룸22222222222222',
                '원룸33333333333333',
            ],
        },
        {
            id: '4',
            type: CardType.WORD,
            name: '주택',
            practice: [
                '주택11111111111111',
                '주택22222222222222',
                '주택33333333333333',
            ],
        },
        {
            id: '5',
            type: CardType.WORD,
            name: '오피스탤',
            practice: [
                '오피스탤11111111111111',
                '오피스탤22222222222222',
                '오피스탤33333333333333',
            ],
        },
        {
            id: '6',
            type: CardType.PHRASE,
            name: 'A/V(으)ㄹ 모르겠어요',
            practice: [
                'A/V(으)ㄹ 모르겠어요 111111',
                'A/V(으)ㄹ 모르겠어요 222222',
                'A/V(으)ㄹ 모르겠어요 333333',
            ],
        },
    ],
}

export const get_set = (ctx: Context) => {
    return ctx.json(set);
}

export const post_card = async (ctx: Context) => {
    const { type, name } = await ctx.body() as { type: CardType, name: string };

    const newCard = { id: v4.generate(), type, name, practice: [] };

    set = { ... set, cards: [...set.cards, newCard] };

    return ctx.json(newCard);
}

export const delete_card = async (ctx: Context) => {
    const { id } = await ctx.body();

    const deletedCard = set.cards.find((card: Card) => card.id === id)
    const remainingCards = set.cards.filter((card: Card) => card.id !== id);

    set = { ...set, cards: remainingCards };

    return deletedCard;
};



