import { ObjectId } from "bson";
import clientPromise from "../../../lib/mongo";

export default async (req, res) => {
  const client = await clientPromise;
  const db = client.db("Cluster0");
  if (req.method === "POST") {
    const data = await db
      .collection("customers")
      .insertOne(JSON.parse(req.body));

    res.status(200).json(data.insertedId);
  } else if (req.method === "GET") {
    const result = [];
    const data = db.collection("customers").find({});
    for await (const doc of data) {
      result.push(doc);
    }

    res.status(200).json(result);
  } else if (req.method === "PATCH") {
    const { _id, ...updated } = JSON.parse(req.body);

    db.collection("customers").updateOne(
      { _id: new ObjectId(_id) },
      {
        $set: {
          firstName: updated.firstName,
          lastName: updated.lastName,
          company: updated.company,
          status: updated.status,
          email: updated.email,
        },
      }
    );

    res.status(200).json(req.body);
  } else if (req.method === "DELETE") {
    const id = req.query.id;

    db.collection("customers").deleteOne({ _id: new ObjectId(id) });

    res.status(200).json("Deleted");
  }
};
