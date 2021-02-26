# Implement SAT Delcara Mensuales

> This recipe uses [Syncfy Widget][syncfy-widget-docs]


## REQUIREMENTS 
1. [Syncfy Widget][syncfy-widget-docs]
2. [Webhooks][syncfy-webhook-docs] implemented
3. Syncfy API Key

## STEPS
> The next steps assume that you have at least one [syncfy API user created][syncfy-post-user] and know how to create a [session token][syncfy-post-sesions]. 

1. **Create SAT Declaraciones Mensuales credential with Syncfy Widget**
    
    Use Syncfy Widget to create a new credential, then get `id_credential` from webhook's [credential_create][syncfy-webhook-events] notification.

2. **Get transactions**
    
    In your webhook you will recibe a [refresh][syncfy-webhook-events] notification with transactions endpoints, use them to get the newest data.

    Example:

    `curl --location --request GET 'https://api.syncfy.com/v1/transactions?id_credential={{id_credential}}'` - [*Refer to API docs*][syncfy-transactions-docs]

    Output example (Just one transaction):
    ```json
    {
        "id_transaction": "603883ef52326653575c203c",
        "id_account": "601075a53406275d3f9640e5",
        "id_account_type": "520d3aa93b8e778e0d000000",
        "id_credential": "603882b53ddbad4d4f7ef301",
        "id_currency": "523a25953b8e77910e8b456c",
        "id_disable_type": null,
        "id_external": "",
        "id_site": "58543125784806c3298b4572",
        "id_site_organization": "56cf4ff5784806152c8b4568",
        "id_site_organization_type": "56cf4f5b784806cf028b4569",
        "id_user": "60370606a9796801c8201808",
        "is_account_disable": 0,
        "is_deleted": 0,
        "is_disable": 0,
        "is_pending": 0,
        "description": "Declaracionesción Enero 2021",
        "amount": 0,
        "currency": "MXN",
        "attachments": [
            {
                "id_attachment": "603883ef52326653575c20ad",
                "id_attachment_type": "5887c839056f29058d17d201",
                "is_valid": 1,
                "file": "cus9r3gO-8j98AA2abqbTB9nDP7z98bvt3IPHcw09AT8Ok-bHmO4b_n4Fp1j-UQB1d6Rf8T8d9QpAoIXLucZaig2.pdf",
                "mime": "application/pdf",
                "url": "/attachments/603883ef52326653575c20ad"
            },
            {
                "id_attachment": "603883ef52326653575c20ae",
                "id_attachment_type": "5ee97469e69a753fa63d3ac1",
                "is_valid": 1,
                "file": "cus9r3gO-8j98AA2abqbTB9nDP7z98bvt3IPHcw09AT8Ok-bHmO4b_n4Fp1j-UQB1d6Rf8T8d9QpAoIXLucZaig2.json",
                "mime": null,
                "url": "/attachments/603883ef52326653575c20ae"
            }
        ],
        "extra": null,
        "reference": null,
        "keywords": {},
        "dt_transaction": 1613714400,
        "dt_refresh": 1614316526,
        "dt_disable": null,
        "dt_deleted": null
    }
    ```
3. **Get attachments**

    In your webhook you will recibe a refresh notification with attachments endpoints, use them to download the attachment files(PDF and JSON) as ZIP.
    
    Example:

    `curl --location --request GET 'https://api.syncfy.com/v1/attachments/export?id_credential=<id_credential>&limit=5000&skip=0&wbhk=1'` - [*Refer to API docs*][syncfy-attachments-docs]


   **3.1 Get attachment PFD**

   With attachment from previous transaction:
   
   ```json
   {
        "id_attachment": "603883ef52326653575c20ad",
        "id_attachment_type": "5887c839056f29058d17d201",
        "is_valid": 1,
        "file": "cus9r3gO-8j98AA2abqbTB9nDP7z98bvt3IPHcw09AT8Ok-bHmO4b_n4Fp1j-UQB1d6Rf8T8d9QpAoIXLucZaig2.pdf",
        "mime": "application/pdf",
        "url": "/attachments/603883ef52326653575c20ad"
    }
   ```

    Example:
    `curl --location --request GET 'https://sync.paybook.com/v1/attachments/:id_attachment?' \`

    Output:
    It would download PDF file attachment

    **3.2 Get attachment JSON**

    With attachment from previous transaction:
   
    ```json
    {
        "id_attachment": "603883ef52326653575c20ae",
        "id_attachment_type": "5ee97469e69a753fa63d3ac1",
        "is_valid": 1,
        "file": "cus9r3gO-8j98AA2abqbTB9nDP7z98bvt3IPHcw09AT8Ok-bHmO4b_n4Fp1j-UQB1d6Rf8T8d9QpAoIXLucZaig2.json",
        "mime": null,
        "url": "/attachments/603883ef52326653575c20ae"
    }
    ```

    Example:
    `curl --location --request GET 'https://sync.paybook.com/v1/attachments/:id_attachment?' \`

    Output:
    It would download JSON file attachment

    

4. **GET atachments parsed to JSON**

Same as before but just add `/json` at the end of the endpoint.

Example:
`curl --location --request GET 'https://api.syncfy.com/v1/attachments/{{id_attachment}}/json'` - [*Refer to API docs*][syncfy-attachments-json-docs]


Output example: 
```json

```
### ENVS

Enviroment | id_site | name 
------ | ------ | ------
Prod   | 58543125784806c3298b4572 | SAT Declaraciones Mensuales

 [//]: # 
[syncfy-widget-docs]: <https://syncfy.com/w/en/sync/public/app/(section:docs/mx/sync-tax/widget/overview)>
[syncfy-webhook-docs]: <https://syncfy.com/w/en/sync/public/app/(section:docs/mx/sync-tax/webhooks/overview)>
[syncfy-webhook-events]: <https://syncfy.com/w/en/sync/public/app/(section:docs/mx/sync-tax/webhooks/events)>
[syncfy-post-user]: <https://syncfy.com/w/en/sync/public/app/(section:docs/mx/sync-tax/api/users)?method=POST&path=%2Fv1%2Fusers>
[syncfy-post-sesions]: <https://syncfy.com/w/en/sync/public/app/(section:docs/mx/sync-tax/api/sessions)?method=POST&path=%2Fv1%2Fsessions>
[syncfy-transactions-docs]: <https://syncfy.com/w/en/sync/public/app/(section:docs/mx/sync-tax/api/transactions)?method=GET&path=%2Fv1%2Ftransactions>
[syncfy-attachments-docs]: <https://syncfy.com/w/en/sync/public/app/(section:docs/mx/sync-tax/api/attachments)?method=GET&path=%2Fv1%2Fattachments%2F:sync_id_attachment>
[syncfy-attachments-json-docs]: <https://syncfy.com/w/en/sync/public/app/(section:docs/mx/sync-tax/api/attachments)?method=GET&path=%2Fv1%2Fattachments%2F:sync_id_attachment%2Fjson>