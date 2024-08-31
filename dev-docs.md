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