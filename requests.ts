import {app, client, Express, Cors} from './server';
app.use(Express.json()); //add body parser to each following route handler
app.use(Cors()) //add CORS support to each following route handler

client.connect();