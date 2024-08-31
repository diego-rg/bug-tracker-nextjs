# WHY STACK (pending: mongo vs relational, next vs other...)
# Database design
Three entities:
user (authenticated person who creates or helps in a project): unique username and email.
project (groups all bugs related to itself): name unique. Must contain the admin (delete the project or add devs) and the devs who work on it (CRUD bugs).
bug (contains the data of each issue). Status and assignedTo must update each other.
Embed? We have to access projects and bugs on their own, so we should not embed them into the user schema, we should reference them. Every user should have only some projects (1toMany), but a project could have a huge ammount of bugs (1toSqillions) who could hit the 16mB limit per document in Mongo.
TODO: So we should use reference between the 3 entities despite the performance could be worse (check hot to improve: indexes https://stackoverflow.com/questions/43742635/poor-lookup-aggregation-performance)