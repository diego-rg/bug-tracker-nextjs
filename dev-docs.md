# MONGODB/MONGOOSE
### Populate vs lookup
https://stackoverflow.com/questions/62557902/mongodb-lookup-vs-mongoose-populate
Mongoose's populate() method does not use MongoDB's $lookup (similar to a JOIN) behind the scenes. It simply makes another query to the database.
NOTE: every usage of populate means more queries, impacting performance.
### Avoid duplicates in a schema that has an array field
https://stackoverflow.com/questions/13404363/avoid-duplicate-entries-on-mongoose-array
Use the $addToSet update operator like so: Team.update({_id: team._id}, {$addToSet: {players: player}})
Assuming player is the ObjectId of a player, it will only be added to the team's players array if it's not already present.
### Schema design
https://www.mongodb.com/developer/products/mongodb/mongodb-schema-design-best-practices/
The most important consideration you make for your schema is how your data is going to be used by your system: Provide good query performance!
Embedding: You can retrieve all relevant information in a single query. (Limitations)There is a 16-MB document size limit in MongoDB, if you are embedding too much data inside a single document, you could potentially hit this limit.
Referencing: By splitting up data, you will have smaller documents. Infrequently accessed information not needed on every query. (Limitations)In order to retrieve all the data in the referenced documents, a minimum of two queries or $lookup are required to retrieve all the information.
Rule 1: Favor embedding unless there is a compelling reason not to. Generally speaking, my default action is to embed data within a document. I pull it out and reference it only if I need to access it on its own, it's too big, I rarely need it, or any other reason.
Rule 2: Needing to access an object on its own is a compelling reason not to embed it.
Rule 3: Avoid joins/lookups if possible, but don't be afraid if they can provide a better schema design.
Rule 4: Arrays should not grow without bound. If there are more than a couple of hundred documents on the "many" side, don't embed them; if there are more than a few thousand documents on the "many" side, don't use an array of ObjectID references. High-cardinality arrays are a compelling reason not to embed.
Rule 5: With MongoDB, how you model your data depends – entirely – on your particular application's data access patterns. You want to structure your data to match the ways that your application queries and updates it.
https://www.mongodb.com/developer/products/mongodb/schema-design-anti-pattern-massive-arrays/
One of the rules of thumb when modeling data in MongoDB is data that is accessed together should be stored together. If you'll be retrieving or updating data together frequently, you should probably store it together. Data is commonly stored together by embedding related information in subdocuments or arrays.