import { Application, Context } from "https://deno.land/x/abc@v1.0.0-rc10/mod.ts";
import { get_allSets, post_set } from './controllers/allSets.ts';
import { get_set, post_card, delete_card } from './controllers/set.ts'

const app = new Application();

app
    // 全學習集
    .get('/sets', get_allSets)
    // 單一學習集
    .get('/sets/:id', get_set)
    .post('/sets', post_set)
    .delete('/sets/:id', delete_card)
    // 單一單字卡
    .get('/card/:id', (ctx: Context) => { ctx.string('card: get') })
    .post('/sets/:id', post_card)
    .post('/card/:id', (ctx: Context) => { ctx.string('card: post') })
    .put('/card/:id', (ctx: Context) => { ctx.string('card: put') })
    .delete('/card/:id', (ctx: Context) => { ctx.string('card: delete') })


app.start({ port: 5000 });
