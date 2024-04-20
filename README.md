# Frontend and Backend for Home Test Project

## Frontend

### signUp
- Description: This feature allows users to sign up using their email address. It includes email validation and necessary logic to ensure the validity of the input.

### logIn
- Description: This feature enables users to log in to their accounts.

### home
- Description: In this section, the application displays all users. As the user scrolls down and reaches the last user on the page, the next 10 users' data will be fetched and displayed.

### profile
- Description: Users can view and update their user profiles. The feature also includes a log out functionality.

## Backend

### Unfortunately, the URL you provided seems to be non-functional. As a result, I took the initiative to create my own URL and attempted to incorporate the desired functionality of your API. I kindly request that you review the URL specified in the .env file 

### register
- Description: This feature allows users to register with a unique username and email. It includes logic to ensure that only unique usernames and email addresses are allowed. The password is hashed for security purposes.

### login
- Description: Upon successful login, this feature generates a token and sets it to a cookie. The token is set as HTTP-only to enhance security.

### getUser
- Description: This feature retrieves the user's profile based on the provided token. It is only accessible for authenticated users.

### profile
- Description: Authenticated users can update their user profiles using this feature.

### fetch/dummy/user-v2
- Description: This feature allows authenticated users to fetch all user data.