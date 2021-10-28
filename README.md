# NestJS jokerator

## Installation

```bash
# install dependencies
$ npm install

# generate keys
$ ssh-keygen -t rsa -b 4096 -m PEM -f ./src/auth/jwt/private.key
$ openssl rsa -in ./src/auth/jwt/private.key -pubout -outform PEM -out ./src/auth/jwt/public.key
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## GgraphQL query examples

```gql
# Registration
mutation signUp {
  signUp(input: { email: "mr.green@mail.com", password: "strong" }) {
    id
    email
  }
}

# Authorization
query signIn {
  signIn(input: { email: "mr.green@mail.com", password: "strong" }) {
    access_token
  }
}

# Get a joke (access token required)
query parse {
  parse(input: { categories: [Programming, Dark] }) {
    category
    type
    joke
    setup
    delivery
  }
}
```

## HTTP headers example

```json
{
  "Authorization": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im1yLmdyZWVuQG1haWwuY29tIiwic3ViIjoxLCJpYXQiOjE2MzU0NTg1MDYsImV4cCI6MTYzNTQ1ODU2Nn0.fEoxCPUn5b3aHQ0_WYcYArPMOtjRC1wLvtnf-XkUy0s"
}
```

