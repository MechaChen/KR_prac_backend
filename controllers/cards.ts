import { Context } from "https://deno.land/x/abc@v1.0.0-rc10/mod.ts";
import { moment } from "https://deno.land/x/moment/moment.ts";
import { db } from '../mongodb/index.ts';

const sets = db.collection('sets');
const cards = db.collection('cards');

export interface Card {
    type: string;
    name: string;
    practice: string[];
    set_oid: string;
}

export const get_card = async (ctx: Context) => {
    const { id } = ctx.params;

    const card = await cards.findOne({ _id: { $oid: id } });

    return ctx.json(card);
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
    
    await sets.updateOne(
        { _id: { "$oid": set_oid } },
        { $inc: type === 'word' ?
            { wordNum: 1 }
            :
            { phraseNum: 1 }
        }
    )

    return ctx.json({ _id: cardID, ...newCard });
}
