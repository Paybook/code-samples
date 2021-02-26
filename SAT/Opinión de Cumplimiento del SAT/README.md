# Implement Opinión de Cumplimiento del SAT

> This recipe uses [Syncfy Widget][syncfy-widget-docs]


## REQUIREMENTS 
1. [Syncfy Widget][syncfy-widget-docs]
2. [Webhooks][syncfy-webhook-docs] implemented (`documents_completed` event must be subscribed to webhook)
3. Syncfy API Key

## STEPS
> The next steps assume that you have at least one [syncfy API user created][syncfy-post-user] and know how to create a [session token][syncfy-post-sesions]. 

1. **Create "Opinión de Cumplimiento del SAT" job with Syncfy Widget**
    
    Use Syncfy Widget to create a new credential, then get `id_credential` from webhook's [credential_create][syncfy-webhook-events] notification.

2. **Catch webhook documents_completed notification on your webhook server**

    You will see a notification like this:

    ```json
    {
        "endpoints": {
            "documents": [
                "/v1/webhooks/events/c2c3b50e-2a62-108a-a0a7-3214495ee788/documents?limit=1000&skip=0"
            ],
            "documents_json": [
                "/v1/webhooks/events/c2c3b50e-2a62-108a-a0a7-3214495ee788/documents/json?limit=1000&skip=0"
            ],
            "documents_zip": [
                "/v1/webhooks/events/c2c3b50e-2a62-108a-a0a7-3214495ee788/documents/zip?limit=1000&skip=0"
            ]
        },
        "event": "documents_completed",
        "id_job": "6038282c6e197415263299e9",
        "id_job_uuid": "6038282c6e197415263299ea",
        "id_site": "5f6bbaa541273336c87d96c1",
        "id_site_organization": "56cf4ff5784806152c8b4568",
        "id_site_organization_type": "56cf4f5b784806cf028b4569",
        "id_user": "60370606a9796801c8201808",
        "uuid": "c2c3b50e-2a62-108a-a0a7-3214495ee788"
    }
    ```
3. **Get documents**

    You have 3 enpoints now:
    ```json
    "endpoints": {
        "documents": [
            "/v1/webhooks/events/c2c3b50e-2a62-108a-a0a7-3214495ee788/documents?limit=1000&skip=0"
        ],
        "documents_json": [
            "/v1/webhooks/events/c2c3b50e-2a62-108a-a0a7-3214495ee788/documents/json?limit=1000&skip=0"
        ],
        "documents_zip": [
            "/v1/webhooks/events/c2c3b50e-2a62-108a-a0a7-3214495ee788/documents/zip?limit=1000&skip=0"
        ]
    }
    ```

    **3.1 Get documents (PDF and JSON) as base64 encoded strings**
    Use the enpoint on the first field `"documents"`:

    `curl --location --request GET 'https://api.syncfy.com/v1/webhooks/events/c2c3b50e-2a62-108a-a0a7-3214495ee788/documents?limit=1000&skip=0' \`


    Output example:
    ```json
    "response": [
        {
            "id_document": "6038286752326653575bdf2e",
            "id_document_status": "5b23219d056f2905985444c2",
            "id_document_type": "5b2321ef056f29059a367e43",
            "id_external": "",
            "id_site": "5f6bbaa541273336c87d96c1",
            "id_site_organization": "56cf4ff5784806152c8b4568",
            "id_site_organization_type": "56cf4f5b784806cf028b4569",
            "file": "Opinion_Del_Cumplimiento_SAT_ACO0123456789.pdf",
            "identifiers": null,
            "keywords": [
                "ACO0123456789"
            ],
            "content": "JVBERi0xL...", // Intentionally shortened
            "dt_refreshed": "2021-02-25T22:44:55+00:00",
            "dt_created": "2021-02-25T22:44:55+00:00"
        },
        {
            "id_document": "6038286752326653575bdf2f",
            "id_document_status": "5b23219d056f2905985444c2",
            "id_document_type": "5f71fef9ba18355eeb4d6d81",
            "id_external": "",
            "id_site": "5f6bbaa541273336c87d96c1",
            "id_site_organization": "56cf4ff5784806152c8b4568",
            "id_site_organization_type": "56cf4f5b784806cf028b4569",
            "file": "Opinion_Del_Cumplimiento_SAT_ACO0123456789.json",
            "identifiers": null,
            "keywords": [
                "ACO0123456789"
            ],
            "content": "eyJkZW5vbWl...", // Intentionally shortened
            "dt_refreshed": "2021-02-25T22:44:55+00:00",
            "dt_created": "2021-02-25T22:44:55+00:00"
        }
    ]
    ```
    > ***Note:*** The files are encoded in base64, the value of key `content` is the base64 string.

    **3.2 Get documents parsed to Json**
    As same as before, user the enpoint on the second field `"documents_json"`:

    `curl --location --request GET 'https://api.syncfy.com/v1/webhooks/events/c2c3b50e-2a62-108a-a0a7-3214495ee788/documents/json?limit=1000&skip=0' \`

    Output example:

    ```json    
    "response": [
        {
            "id_document": "6038286752326653575bdf2e",
            "id_document_status": "5b23219d056f2905985444c2",
            "id_document_type": "5b2321ef056f29059a367e43",
            "id_external": "",
            "id_site": "5f6bbaa541273336c87d96c1",
            "id_site_organization": "56cf4ff5784806152c8b4568",
            "id_site_organization_type": "56cf4f5b784806cf028b4569",
            "file": "Opinion_Del_Cumplimiento_SAT_ACO0123456789.pdf",
            "identifiers": null,
            "keywords": [
                "ACO0123456789"
            ],
            "content": null,
            "dt_refreshed": "2021-02-25T22:44:55+00:00",
            "dt_created": "2021-02-25T22:44:55+00:00"
        },
        {
            "id_document": "6038286752326653575bdf2f",
            "id_document_status": "5b23219d056f2905985444c2",
            "id_document_type": "5f71fef9ba18355eeb4d6d81",
            "id_external": "",
            "id_site": "5f6bbaa541273336c87d96c1",
            "id_site_organization": "56cf4ff5784806152c8b4568",
            "id_site_organization_type": "56cf4f5b784806cf028b4569",
            "file": "Opinion_Del_Cumplimiento_SAT_ACO0123456789.json",
            "identifiers": null,
            "keywords": [
                "ACO0123456789"
            ],
            "content": {
                "denominacion_razon_social": "ASARE COMERCIAL SA DE CV",
                "rfc": "ACO0123456789",
                "folio": "21NB0468939",
                "estatus": "Positivo",
                "fecha_de_revision": "2021-02-25 22:45:00",
                "obligaciones": [],
                "cadena_original_sello": "||ACO0123456789|21NB0468939|25-02-2021|P||00001081088108000031||",
                "sello_digital": "DjETzbOPwK7/jMjGTWuyWl457DT4ZrOxWlalZvDdVNyHiSPrrUk34kCAQwiD5uQJ55tHgb7DcC+kZzUzwwMLRJ972P0asSxVL0lWfEN0cud mddov+d0bGRHRuixnJjNl4nbHs766BeaFxYJNqb9BhGId8q8+xaxnrY=t5NR1ntSr"
            },
            "dt_refreshed": "2021-02-25T22:44:55+00:00",
            "dt_created": "2021-02-25T22:44:55+00:00"
        }
    ]
    ```

    **3.3 Get documents as downloadable ZIP file**
    
    As same as before, user the enpoint on the third field `"documents_zip"`:
    `curl --location --request GET 'https://api.syncfy.com/v1/webhooks/events/c2c3b50e-2a62-108a-a0a7-3214495ee788/documents/zip?limit=1000&skip=0' \`

    This dont have an output, just a download request.
### ENVS

Enviroment | id_site | name 
------ | ------ | ------
Prod   | 5f6bbaa541273336c87d96c1 | Opinión de Cumplimiento del SAT SAT  

 [//]: # 
[syncfy-widget-docs]: <https://syncfy.com/w/en/sync/public/app/(section:docs/mx/sync-tax/widget/overview)>
[syncfy-webhook-docs]: <https://syncfy.com/w/en/sync/public/app/(section:docs/mx/sync-tax/webhooks/overview)>
[syncfy-webhook-events]: <https://syncfy.com/w/en/sync/public/app/(section:docs/mx/sync-tax/webhooks/events)>
[syncfy-post-user]: <https://syncfy.com/w/en/sync/public/app/(section:docs/mx/sync-tax/api/users)?method=POST&path=%2Fv1%2Fusers>
[syncfy-post-sesions]: <https://syncfy.com/w/en/sync/public/app/(section:docs/mx/sync-tax/api/sessions)?method=POST&path=%2Fv1%2Fsessions>
[syncfy-transactios-docs]: <https://syncfy.com/w/en/sync/public/app/(section:docs/mx/sync-tax/api/transactions)?method=GET&path=%2Fv1%2Ftransactions>
[syncfy-attachments-docs]: <https://syncfy.com/w/en/sync/public/app/(section:docs/mx/sync-tax/api/attachments)?method=GET&path=%2Fv1%2Fattachments%2F:sync_id_attachment>
[syncfy-attachments-json-docs]: <https://syncfy.com/w/en/sync/public/app/(section:docs/mx/sync-tax/api/attachments)?method=GET&path=%2Fv1%2Fattachments%2F:sync_id_attachment%2Fjson>