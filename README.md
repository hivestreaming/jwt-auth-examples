# jwt-auth-examples
Code snippets repository to facilitate integration with Hive Services using JWT

> [!NOTE] 
> The snippets shown are a collection of necessary steps that need to be done to get authenticated by Hive.

> [!WARNING]  
> Node version >= 18

> [!IMPORTANT]  
> The following snippets only use with data that Hive share with their partners as the **partnerId** and the **partnerToken**

### Step 1
Create a private RSA key that will be used to encode the Json Web Token (JWT).

```
npm run generate-key
```

Alternatively you can also generate a key via `openssl` - see command:

```
npm run generate-key:openssl
```

### Step 2
Publish the public RSA key that will be used by Hive to decode the JWT.

```
npm run publish-key
```


### Step 3 (optional)
Fetch the public RSA to confirm it is stored in Hive public key storage.

```
npm run fetch-key
```


### Step 4 | 5
Create a JWT with manifest.

```
npm run create-jwt:manifest
```


Create a JWT with regex.

```
npm run create-jwt:regex
```
