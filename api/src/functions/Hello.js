const { CosmosClient } = require('@azure/cosmos');


const client = new CosmosClient(process.env.COSMOSDB_CONNECTION_STRING);
const database = client.database('HelloDB');
const container = database.container('items');
const { app } = require('@azure/functions');
app.http('Hello', {
    methods: ['GET', 'POST'],
    authLevel: 'anonymous',
    handler: async (request, context) => {
        context.log(`Http function processed request for url "${request.url}"`);
        try {
            //ambil dari database
            const { resources } = await container.items.readAll().fetchAll(); 
            context.res = {
                status: 200,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(resources) 
            };
        } catch (error) {
            context.log('Cosmos DB Error:', error);
            context.res = { status: 500, body: { error: 'Database error' } };
        }
        return context.res;
    }
});
