# jwt-auth-examples
Code snippets repository to facilitate integration with Hive Services using JWT

> [!NOTE] 
> The snippets shown are a collection of necessary steps that need to be done to get authenticated by Hive

> [!WARNING]  
> Requires Node version >= 18

> [!IMPORTANT]  
> Prerequisite for using the code snippets - having received a partner ID and partner API token from Hive


## Pre-requisites
Install dependencies:
```
npm install
```


## Integration steps

### Step 1
Create a private RSA key that will be used to encode the Json Web Token:
```
npm run generate-rsa-key
```

Alternatively you can also generate a key via `openssl` - see command:
```
npm run generate-rsa-key:openssl
```

### Step 2
Publish the public RSA key that will be used by Hive to decode the JWT:
```
npm run public-key-post
```

### Step 3
Create a JWT with manifest:
```
npm run create-jwt:manifest
```

Or create a JWT with regex:
```
npm run create-jwt:regex
```


## Public RSA key management:

Scripts available for public RSA key management.


Publish key:
```
npm run public-key-post
```

Fetch key:
```
npm run public-key-get
```

List all stored keys:
```
npm run public-key-get-all
```

Delete (invalidate) key:
```
npm run public-key-delete
```
