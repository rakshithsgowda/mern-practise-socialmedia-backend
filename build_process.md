- we should define schema

- Schemas will tell you what are the field that are/ can be / should be saved in the db

- with schema we can create models

- which will allow us to query the database to find that user , update or delete etc...

\*this mongoose schemas allows us to directly interact with the Database.

# by using current user to private route the currentUser

- send token in headers using postman/rest client (later will send from client)
  -verify token using expressjwt **(create a middleware)**

- if **verified** will get user id from that token (used during login to create signed token)

-based on that user id --- find that user from databse.

- if found send successfull response

# after current user response, based on true or false

- we can allow either allow or deny access to user to access certain pages in the client.

- 1st creating **Wrapper component** that will make request to '/current-user' endpoint.

- this way you dont have to make request from each pages...

- can create a wrapper component that can be reused in many pages
