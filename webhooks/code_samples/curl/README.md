CURL
===================

GET
-------------
```bash
curl "https://sync.paybook.com/v1/webhooks" \
-H "Authorization: api_key api_key=YOUR_API_KEY" \
-H "Content-Type: application/json" \
-H "X-Http-Method-Override: GET" \
-X POST
```

POST
-------------
```bash
curl "https://sync.paybook.com/v1/webhooks" \
-H "Authorization: api_key api_key=YOUR_API_KEY" \
-H "Content-Type: application/json" \
-d '{"id_environment":"ID_ENVIRONMENT","url":"https://WEBHOOK_DOMAIN/my_webhook","events":["credential_create","credential_update","refresh"]}' \
-X POST
```

DELETE
-------------
```bash
curl "https://sync.paybook.com/v1/webhooks/ID_WEBHOOK" \
-H "Authorization: api_key api_key=YOUR_API_KEY" \
-H "Content-Type: application/json" \
-H "X-Http-Method-Override: DELETE" \
-X POST
```