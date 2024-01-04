# jwt-auth-examples
Code snippets repository to facilitate integration with Hive Services using JWT

> [!NOTE] 
> The snippets shown are a collection of necessary steps that need to be done to get authenticated by Hive.

> [!WARNING]  
> Node version >= 18

> [!IMPORTANT]  
> The following snippets only use with data that Hive share with their partners as the **partnerId** and the **partnerToken**

### Step 1
Create a private key that will be used to encode the Json Web Token(JWT).

> node ./examples/create-private-key.js

### Step 2
Publish a public key that will be used by Hive to decode the JWT.

> node ./examples/publish-public-key.js

### Step 3
List and confirm public key stored in Hive Services.

> node ./examples/fetch-public-key.js

### Step 4 | 5
Create a JWT with manifest.

> node ./examples/create-jwt-manifest.js

Create a JWT with regex.

> node ./examples/create-jwt-regex.js