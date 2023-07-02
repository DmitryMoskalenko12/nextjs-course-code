import { MongoClient } from "mongodb";

const handler = async (req, res) => {
  const eventId = req.query.eventId;

  const client = await MongoClient.connect('mongodb+srv://dmtrmsklnk:URiWUC0NOGWgoKXA@cluster0.mebjjwq.mongodb.net/events?retryWrites=true&w=majority');

  if (req.method === 'POST') {
  const { email, name, text } = req.body;

  if (!email.includes('@') || !name || name.trim() === "" || !text || text.trim() === '') {
    res.status(422).json({message: 'Invalid input.'});
    return;
  }

  const newComment = {
    email,
    name,
    text,
    eventId
  }

  const db = client.db();

  const result = await db.collection('comments').insertOne(newComment);

  newComment.id = result.insertedId;

  res.status(201).json({message: 'Added comment.', comment: newComment})

}

if (req.method === 'GET') {
  const db = client.db();

 const documets = await db.collection('comments').find().sort({_id: -1}).toArray();

  res.status(200).json({comments: documets});
}
client.close()
}
export default handler;