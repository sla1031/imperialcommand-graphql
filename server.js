import Express from 'express';
import GraphHTTP from 'express-graphql';
import Schema from './schema';

//Config
const APP_PORT = 3000;

const app = Express();

//route
app.use('/graphql', GraphHTTP({
	schema: Schema,
	pretty: true, //pretty print return values
	graphiql: true //in browser graphql ide
}));

app.listen(APP_PORT, ()=>{
	console.log(`Vist: http://localhost:${APP_PORT}/graphql`);
});
