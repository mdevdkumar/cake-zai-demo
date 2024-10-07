# Cake-Zai-Demo

Author: Deepak Kumar  
Created Date: 1 October 2024

## 1. Create a Merchant

POST : https://cake-zai-demo.vercel.app/api/merchant  
 BODY:

```
{
 "first_name": "Deepak",
 "last_name": "Kumar",
 "email": "deepak_kumar9@mydomain.com", //Zai only supports @mydomain.com in pre-live env.
 "country": "AUS"
 }
```

## 2. Create a Transaction

POST: https://cake-zai-demo.vercel.app/api/transaction  
 BODY:

```
{
  "merchant_id": "merchant_1727756338506", // generated in response in Step 1.
  "amount": 3055 // = 30.55
}
```

A link will be created, open the link the Browser.
