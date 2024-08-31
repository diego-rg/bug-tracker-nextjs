# WHY STACK (pending: mongo vs relational, next vs other...)
# Database design
Three entities:
user (authenticated person who creates or helps in a project): unique username and email.
project (groups all bugs related to itself): name unique. Must contain the admin (delete the project or add devs) and the devs who work on it (CRUD bugs).
bug (contains the data of each issue). Status and assignedTo must update each other.