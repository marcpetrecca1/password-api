# password-policy

To install & run the app on your local environment run the following:

    npm install
    npm run dev

Installation

Clone the repository locally:

git clone https://github.com/marcpetrecca1/password-api.git

Install NPM packages npm install

Start the development server

## Requirements

**Schema**

![Screenshot](models.png)

**Validation**

at least 8 characters with at least 1 Upper case, 1 lower case, 1 special character such as "@#$%@!" and 1 numeric character

**Policy**

Expire passwords (90 days): password is only valid for 90 days, after it expires the user should change his password.

Not recently used: This policy saves the history of previous passwords. The number of old passwords stored is 3. when the user changes his password he cannot use any of the saved passwords

**Create User Endpoint**

The request method is POST

![Screenshot](createUser.png)

![Screenshot](helper1.png)

**Email:** should be a valid email & unique

should follow the validation policy

![Screenshot](helper1.png)

![Screenshot](helper2.png)

**Login Endpoint**

This endpoint should act as a login endpoint where email & password are passed

![Screenshot](login1.png)

You should apply expire password policy to this endpoint: if the policy condition is true return an error message

![Screenshot](login2.png)

**Change Password Endpoint**

Email: email should exist on the database

password: which is the current account password

new password: password validation & Not recently used policy should apply

![Screenshot](changePass1.png)

![Screenshot](changePass2.png)

![Screenshot](changePass3.png)

![Screenshot](changePass4.png)

![Screenshot](changePass5.png)
