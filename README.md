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

## 3. Mimic a PayId Payment.
As mentioned by Zai, in Pre live we can Mimic the payment for PayId, but this step is not required in Live environment.
Step 6, in https://int-npp-master.platforms.prelive.assemblypayments.com/npp/receive-request


## Link to get the Transaction Details

GET: https://cake-zai-demo.vercel.app/api/transaction/{transactionId}



# Xano Scehma
## Merchant Table Schema 
```
 {
  "id":"uuid",
  "created_at":"timestamp",
  "merchant_id":"text",
  "first_name":"text",
  "last_name":"text",
  "wallet_id":"uuid",
  "virtual_account_id":"uuid",
  "pay_id":"uuid",
  "pay_id_email":"text",
  "json":"json"
 }
```
## Transaction Table Schema
```
 {
  "id":"uuid",
  "created_at":"timestamp",
  "merchant_id":"uuid",
  "amount":"integer",
  "status":"enum", // pending, completed, failed
  "webhook_json":"json"
 }
```
