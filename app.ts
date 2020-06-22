import { Application } from "https://deno.land/x/abc@v1.0.0-rc10/mod.ts";
import { client } from './mongodb/index.ts';
import { get_all_sets, get_set, post_set, delete_set } from './controllers/sets.ts';
import { get_card, post_card } from './controllers/cards.ts';

client.connectWithUri('mongodb://localhost:27017');

const app = new Application();

app
    // 學習集
    .get('/sets', get_all_sets)
    .get('/sets/:id', get_set)
    .post('/sets', post_set)
    .delete('/sets/:id', delete_set)
    // 單字卡
    .get('/cards/:id', get_card)
    .post('/cards/', post_card)
    .put('/cards/:id', () => {})
    .delete('/cards/:id', () => {})


app.start({ port: 5000 });
