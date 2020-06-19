import { Context } from "https://deno.land/x/abc@v1.0.0-rc10/mod.ts";
import { moment } from "https://deno.land/x/moment/moment.ts";
import { db } from '../mongodb/index.ts';

const cards = db.collection('cards');

export interface Card {
    type: string;
    name: string;
    practice: string[];
    set_oid: string;
}

export const get_cards = async (ctx: Context) => {
    const { set_oid } = ctx.params;

    const set_cards = await cards.find({ set_oid });

    return ctx.json(set_cards);
}

export const get_card = async (ctx: Context) => {

}

export const post_card = async (ctx: Context) => {
    const { type, name, set_oid } = await ctx.body();

    const newCard: Card = {
        type,
        name,
        practice: [],
        set_oid,
    };

    const cardID = await cards.insertOne(newCard);

    return ctx.json({ _id: cardID, ...newCard });
}
