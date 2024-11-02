import { SignJWT, jwtVerify } from "jose";

const key = new TextEncoder().encode("this is the secret key");

export const encryptJWT = async (payload) => {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })//the most commom algorithm is HS256
    .setIssuedAt()
    .setExpirationTime("1day")
    .sign(key);
};
/*
Let me explain this JWT (JSON Web Token) encryption function in simple terms:

This function `encryptJWT`:
1. Takes some data (payload) as input
2. Creates a secure, signed token that:
   - Uses HS256 algorithm for encryption
   - Includes a timestamp of when it was created
   - Will expire after 1 day
   - Is signed with a secret key

Think of it like creating a secure digital envelope:
- You put your data (payload) inside
- Stamp it with the current time
- Mark it to expire in 24 hours
- Seal it with a special signature (the secret key) that only your application knows

This is commonly used for:
- User authentication tokens
- Secure data transfer between services
- Temporary access credentials

The resulting token will look something like this:
`eyJhbGciOiJIUzI1NiJ9.eyJkYXRhIjoiZXhhbXBsZSJ9.1234567...`

Note: In a production environment, you would want to store the secret key (`key`) in environment variables rather than hardcoding it in the file for security reasons.
*/

export const decryptJWT = async (session)=>{
    try{
        const{payload} = await jwtVerify(session,key,{
            algorithms:["HS256"],
        });

        return payload;
    } catch (error){
        return null;
    }
}
/*
Let me explain this JWT decryption function in simple terms:

This function `decryptJWT`:
1. Takes a JWT token (session) as input
2. Tries to verify and decode it by:
   - Using the same secret key used for encryption
   - Checking if it was signed with the HS256 algorithm
3. If successful, returns the original data (payload)
4. If anything goes wrong (like expired token or invalid signature), returns `null`

Think of it like opening that secure digital envelope we created earlier:
- You receive the sealed envelope (JWT token)
- Try to open it using the secret key
- If the seal is valid and not expired, you get the contents (payload)
- If something's wrong (tampered seal, expired, wrong key), you get nothing (null)

Common reasons for verification failure:
- Token has expired
- Token was signed with a different key
- Token has been tampered with
- Token is malformed

This function is typically used:
- When verifying user authentication
- When receiving secure data from other services
- To validate the authenticity of incoming requests
*/
