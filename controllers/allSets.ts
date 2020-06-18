import { Context } from "https://deno.land/x/abc@v1.0.0-rc10/mod.ts";
import { moment } from "https://deno.land/x/moment/moment.ts";
import { v4 } from 'https://deno.land/std/uuid/mod.ts';

import { simpleSet } from '../models/allsets.ts';

let allSets: simpleSet[] = [
    {
        id: '1',
        title: '首爾大學第 12 課',
        date: moment().format('YYYY-MM-DD'),
        totalWords: 5,
        totalPhrases: 1,
    },
    {
        id: '2',
        title: '首爾大學第 13 課',
        date: moment().add(1, 'month').format('YYYY-MM-DD'),
        totalWords: 3,
        totalPhrases: 2,
    },
    {
        id: '3',
        title: '首爾大學第 15 課',
        date: moment().add(2, 'month').format('YYYY-MM-DD'),
        totalWords: 10,
        totalPhrases: 8,
    },
]

export const get_allSets = (ctx: Context) => {
    return ctx.json(allSets);
}

export const post_set = async (ctx: Context) => {
    const { title } : { title: string} = await ctx.body();

    const id: string = v4.generate();
    const date: string = moment().format('YYYY-MM-DD');
    const totalWords: number = 0;
    const totalPhrases: number = 0;

    const newSet: simpleSet = { id, title, date, totalWords, totalPhrases };

    allSets.push(newSet) ;

    return ctx.json(newSet);
};

export const delete_set = async (ctx: Context) => {
    const { id } = await ctx.body();
    
    const set = allSets.find((set) => set.id === id);

    if (set) {
        allSets.filter((set) => set.id !== id);
        return ctx.json(allSets);
    }
    return ctx.string('no set with that id');
}

