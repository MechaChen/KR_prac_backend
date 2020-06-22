import { Context } from "https://deno.land/x/abc@v1.0.0-rc10/mod.ts";
import { moment } from "https://deno.land/x/moment/moment.ts";
import { db } from '../mongodb/index.ts';

export interface Set {
    title: string;
    date: string;
    wordNum: number;
    phraseNum: number;
}

const sets = db.collection('sets');
const cards = db.collection('cards');

export const get_all_sets = async (ctx: Context) => {
    const all_sets = await sets.find({});

    return ctx.json(all_sets);
}

export const get_set = async (ctx: Context) => {
    const { id } = ctx.params;

    const set = await sets.findOne({ _id: { $oid: id } });
    const set_cards = await cards.find({ set_oid: id });

    return ctx.json({
        title: set.title,
        cards: set_cards,
    });
}

export const post_set = async (ctx: Context) => {
    const { title } = await ctx.body();

    const newSet: Set = {
        title,
        date: moment().format('YYYY-MM-DD'),
        wordNum: 0,
        phraseNum: 0,
    }

    const setID = await sets.insertOne(newSet);
    
    return ctx.json({ _id: setID, ...newSet });
}

export const delete_set = async (ctx: Context) => {
    const { id } = ctx.params;

    const deleteCount = await sets.deleteOne({ _id: { "$oid": id } });

    return ctx.json({ deleteCount });
}
