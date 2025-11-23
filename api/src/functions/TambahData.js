const { CosmosClient } = require('@azure/cosmos');
const client = new CosmosClient(process.env.COSMOSDB_CONNECTION_STRING);
const database = client.database('HelloDB');
const container = database.container('items');

const { app } = require('@azure/functions');
app.http('TambahData', {
    methods: ['POST'],
    authLevel: 'anonymous',
    handler: async (req, context) => 
    {
        try {
            // Get data from request body
            const itemData = await req.json();
            // const itemData = req.body;        
            // Create item with required fields
            context.log('itemData:', itemData);
            const newItem = {
                id: itemData.id || Math.random().toString(36).substring(2),
                nama: itemData.nama,
            };
            
            // Insert into Cosmos DB
            const { resource } = await container.items.create(newItem);
            
            context.log('Item:', newItem);
            context.res = {
                status: 201, // 201 = Created
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ 
                    message: 'Item created successfully!',
                    item: resource 
                })
            };
            return context.res;
        
        } catch (error) {
            context.log('Cosmos DB Error:', error);
            context.res = {
                status: 500,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ error: error.message })
            };
        }

    }
});



