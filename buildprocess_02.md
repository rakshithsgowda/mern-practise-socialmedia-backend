# by using current user to private route the currentUser

- send token in headers using postman/rest client (later will send from client)
  -verify token using expressjwt **(create a middleware)**

- if **verified** will get user id from that token (used during login to create signed token)

-based on that user id --- find that user from databse.

- if found send successfull response
