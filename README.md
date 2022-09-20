# password-policy

To install & run the app on your local environment run the following:

	npm install
	npm run dev

Send POST request to localhost:3000/api/createUser to make sure the API is running <br>
Make sure to copy the content of .env.example to .env file & fill the database URL value

	
Installation

Clone the repository locally:

git clone https://github.com/Bask-Health/password-policy.git

Install NPM packages npm instal

Copy the content of .env.example to .env file & fill the database URL value

Start the development server

Send POST request to localhost:3000/api/createUser to make sure the API is running

## Requirements

**Validation**

at least 8 characters with at least 1 Upper case, 1 lower case, 1 special character such as "@#$%@!" and 1 numeric character

**Policy**

Expire passwords (90 days): password is only valid for 90 days, after it expires the user should change his password.

Not recently used: This policy saves the history of previous passwords. The number of old passwords stored is 3. when the user changes his password he cannot use any of the saved passwords

**Create User Endpoint**

The request method is POST

**Email:** should be a valid email & unique

should follow the validation policy

**Login Endpoint**

This endpoint should act as a login endpoint where email & password are passed

You should apply expire password policy to this endpoint: if the policy condition is true return an error message

**Change Password Endpoint**

Email: email should exist on the database

password: which is the current account password

new password: password validation & Not recently used policy should apply
