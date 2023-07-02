import { MongoClient } from "mongodb";

async function connectDatabase() {
  const client = await MongoClient.connect('mongodb+srv://dmtrmsklnk:URiWUC0NOGWgoKXA@cluster0.mebjjwq.mongodb.net/events?retryWrites=true&w=majority');
  return client;
}

async function insertDocument(client, document) {
  const db = client.db();

  await db.collection('newsletter').insertOne(document)
}

const helper = async (req, res) => {
  if (req.method === 'POST') {
    const userEmail = req.body.email;

    if (!userEmail || !userEmail.includes('@')) {
      res.status(422).json({message: 'Invalid email address.'});
      return;
    }

    let client;

    try {
      client = await connectDatabase();
    } catch (error) {
      res.status(500).json({message: 'Connecting to the database failed!'});
      return;
    }

    try {
      await insertDocument(client, {email: userEmail})
      client.close();
    } catch (error) {
      res.status(500).json({message: 'Inserting data failed!'});
      return;
    }

   res.status(201).json({message: 'Signed up!'});
  }
}

export default helper;