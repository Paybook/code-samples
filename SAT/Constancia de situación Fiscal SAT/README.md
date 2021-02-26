# Implement Constancia de situación Fiscal

> This recipe uses [Syncfy Widget][syncfy-widget-docs]


## REQUIREMENTS 
1. [Syncfy Widget][syncfy-widget-docs]
2. [Webhooks][syncfy-webhook-docs] implemented (`documents_completed` event must be subscribed to webhook)
3. Syncfy API Key

## STEPS
> The next steps assume that you have at least one [syncfy API user created][syncfy-post-user] and know how to create a [session token][syncfy-post-sesions]. 

1. **Create "Constancia de situación Fiscal" job with Syncfy Widget**
    
    Use Syncfy Widget to create a new credential, then get `id_credential` from webhook's [credential_create][syncfy-webhook-events] notification.

2. **Catch webhook documents_completed notification on your webhook server**

    You will see a notification like this:
    
    ```json
    {
        "endpoints": {
            "documents": [
                "/v1/webhooks/events/31631b46-5ce7-420c-96c2-457b22b3cce3/documents?limit=1000&skip=0"
            ],
            "documents_json": [
                "/v1/webhooks/events/31631b46-5ce7-420c-96c2-457b22b3cce3/documents/json?limit=1000&skip=0"
            ],
            "documents_zip": [
                "/v1/webhooks/events/31631b46-5ce7-420c-96c2-457b22b3cce3/documents/zip?limit=1000&skip=0"
            ]
        },
        "event": "documents_completed",
        "id_job": "6038084132c296267c44fe80",
        "id_job_uuid": "6038084132c296267c44fe81",
        "id_site": "59aefe28056f29793a58c092",
        "id_site_organization": "56cf4ff5784806152c8b4568",
        "id_site_organization_type": "56cf4f5b784806cf028b4569",
        "id_user": "60370606a9796801c8201808",
        "uuid": "31631b46-5ce7-420c-96c2-457b22b3cce3"
    }
    ```
3. **Get documents**

    You have 3 enpoints now:
    ```json
    "endpoints": {
        "documents": [
            "/v1/webhooks/events/31631b46-5ce7-420c-96c2-457b22b3cce3/documents?limit=1000&skip=0"
        ],
        "documents_json": [
            "/v1/webhooks/events/31631b46-5ce7-420c-96c2-457b22b3cce3/documents/json?limit=1000&skip=0"
        ],
        "documents_zip": [
            "/v1/webhooks/events/31631b46-5ce7-420c-96c2-457b22b3cce3/documents/zip?limit=1000&skip=0"
        ]
    },
    ```

    **3.1 Get documents (PDF and JSON) as base64 encoded strings**
    Use the enpoint on the first field `"documents"`:

    `curl --location --request GET 'https://api.syncfy.com/v1/webhooks/events/31631b46-5ce7-420c-96c2-457b22b3cce3/documents?limit=1000&skip=0' \`


    Output example:
    ```json
    "response": [
        {
            "id_document": "60380875e75a974c97484eba",
            "id_document_status": "5b23219d056f2905985444c2",
            "id_document_type": "5b2321ef056f29059a367e43",
            "id_external": "",
            "id_site": "59aefe28056f29793a58c092",
            "id_site_organization": "56cf4ff5784806152c8b4568",
            "id_site_organization_type": "56cf4f5b784806cf028b4569",
            "file": "Contancia_Situación_Fiscal_SAT_ACO0123456789.pdf",
            "identifiers": null,
            "keywords": [
                "ACO0123456789"
            ],
            "content": "JVBERi0xLjQ...", // Intentionally shortened
            "dt_refreshed": "2021-02-25T20:28:37+00:00",
            "dt_created": "2021-02-25T20:28:37+00:00"
        },
        {
            "id_document": "60380875e75a974c97484ebb",
            "id_document_status": "5b23219d056f2905985444c2",
            "id_document_type": "5f71fef9ba18355eeb4d6d81",
            "id_external": "",
            "id_site": "59aefe28056f29793a58c092",
            "id_site_organization": "56cf4ff5784806152c8b4568",
            "id_site_organization_type": "56cf4f5b784806cf028b4569",
            "file": "Contancia_Situación_Fiscal_SAT_ACO0123456789.json",
            "identifiers": null,
            "keywords": [
                "ACO0123456789"
            ],
            "content": "eyJkYXRvc19k...", // Intentionally shortened
            "dt_refreshed": "2021-02-25T20:28:37+00:00",
            "dt_created": "2021-02-25T20:28:37+00:00"
        }
    ]
    ```
    > ***Note:*** The files are encoded in base64, the value of key `content` is the base64 string.

    **3.2 Get documents parsed to Json**
    As same as before, user the enpoint on the second field `"documents_json"`:

    `curl --location --request GET 'https://api.syncfy.com/v1/webhooks/events/31631b46-5ce7-420c-96c2-457b22b3cce3/documents/json?limit=1000&skip=0' \`

    Output example:

    ```json
    "response": [
        {
            "id_document": "60380875e75a974c97484eba",
            "id_document_status": "5b23219d056f2905985444c2",
            "id_document_type": "5b2321ef056f29059a367e43",
            "id_external": "",
            "id_site": "59aefe28056f29793a58c092",
            "id_site_organization": "56cf4ff5784806152c8b4568",
            "id_site_organization_type": "56cf4f5b784806cf028b4569",
            "file": "Contancia_Situación_Fiscal_SAT_ACO0123456789.pdf",
            "identifiers": null,
            "keywords": [
                "ACO0123456789"
            ],
            "content": null, // Always null for pdf documents
            "dt_refreshed": "2021-02-25T20:28:37+00:00",
            "dt_created": "2021-02-25T20:28:37+00:00"
        },
        {
            "id_document": "60380875e75a974c97484ebb",
            "id_document_status": "5b23219d056f2905985444c2",
            "id_document_type": "5f71fef9ba18355eeb4d6d81",
            "id_external": "",
            "id_site": "59aefe28056f29793a58c092",
            "id_site_organization": "56cf4ff5784806152c8b4568",
            "id_site_organization_type": "56cf4f5b784806cf028b4569",
            "file": "Contancia_Situación_Fiscal_SAT_ACO0123456789.json",
            "identifiers": null,
            "keywords": [
                "ACO0123456789"
            ],
            "content": {
                "datos_de_identificacion_del_contribuyente": {
                    "rfc": "ACO0123456789",
                    "denominacion_razon_social": "AZAR STORE",
                    "regimen_capital": "SOCIEDAD ANONIMA DE CAPITAL VARIABLE",
                    "nombre_comercial": "AZAR STORE",
                    "fecha_inicio_de_operaciones": "10 DE JUNIO DE 2010",
                    "estatus_en_el_padron": "ACTIVO",
                    "fecha_de_ultimo_cambio_de_estado": "13 DE JUNIO DE 2010"
                },
                "datos_de_ubicacion": {
                    "codigo_postal": "38090",
                    "tipo_de_vialidad": "AVENIDA (AV.)",
                    "numero_exterior": "AVILA CAMACHO",
                    "numero_interior": "108",
                    "nombre_de_la_colonia": "",
                    "nombre_de_la_localidad": "B DE TIERRA BLANCA",
                    "nombre_del_municipio_o_demarcacion_territorial": "Queretaro",
                    "nombre_de_la_entidad_federativa": "QUERETARO",
                    "entre_calle": "QUERETARO",
                    "y_calle": "",
                    "correo_electronico": "conta@AZARcSTORE.com",
                    "tel_fijo_lada": "422",
                    "numero": "6108007"
                },
                "actividades_econominas": [
                    {
                        "orden": "1",
                        "actividad_economica": "Comercio al por mayor de otras materias primas para otras industrias",
                        "porcentaje": "70",
                        "fecha_inicio": "10/06/2013",
                        "fecha_fin": ""
                    },
                    {
                        "orden": "2",
                        "actividad_economica": "Comercio al por menor en ferreterías y tlapalerías",
                        "porcentaje": "30",
                        "fecha_inicio": "10/06/2013",
                        "fecha_fin": ""
                    }
                ],
                "regimenes": [
                    {
                        "regimen": "Régimen General de Ley Personas Morales",
                        "fecha_inicio": "10/06/2013",
                        "fecha_fin": ""
                    }
                ],
                "obligaciones": [
                    {
                        "descripcion_obligacion": "Declaración informativa de IVA con la anual de ISR",
                        "descripcion_vencimiento": "Conjuntamente con la declaración anual del ejercicio.",
                        "fecha_inicio": "10/06/2013",
                        "fecha_fin": ""
                    },
                    {
                        "descripcion_obligacion": "Pago definitivo mensual de IVA.",
                        "descripcion_vencimiento": "A más tardar el día 17 del mes inmediato posterior al periodo que corresponda.",
                        "fecha_inicio": "10/06/2013",
                        "fecha_fin": ""
                    },
                    {
                        "descripcion_obligacion": "Declaración de proveedores de IVA",
                        "descripcion_vencimiento": "A más tardar el último día del mes inmediato posterior al periodo que corresponda.",
                        "fecha_inicio": "10/06/2013",
                        "fecha_fin": ""
                    },
                    {
                        "descripcion_obligacion": "Declaración anual de ISR del ejercicio Personas morales.",
                        "descripcion_vencimiento": "Dentro de los tres meses siguientes al cierre del ejercicio.",
                        "fecha_inicio": "10/06/2013",
                        "fecha_fin": ""
                    },
                    {
                        "descripcion_obligacion": "Pago provisional mensual de ISR personas morales régimen  general",
                        "descripcion_vencimiento": "A más tardar el día 17 del mes inmediato posterior al periodo que corresponda.",
                        "fecha_inicio": "01/04/2014",
                        "fecha_fin": ""
                    },
                    {
                        "descripcion_obligacion": "Entero de retenciones mensuales de ISR por sueldos y salarios",
                        "descripcion_vencimiento": "A más tardar el día 17 del mes inmediato posterior al periodo que corresponda.",
                        "fecha_inicio": "16/03/2017",
                        "fecha_fin": ""
                    },
                    {
                        "descripcion_obligacion": "Entero de retenciones de IVA Mensual",
                        "descripcion_vencimiento": "A más tardar el día 17 del mes inmediato posterior al periodo que corresponda.",
                        "fecha_inicio": "05/04/2018",
                        "fecha_fin": ""
                    },
                    {
                        "descripcion_obligacion": "Entero de retención de ISR por servicios profesionales.  MENSUAL",
                        "descripcion_vencimiento": "A más tardar el día 17 del mes inmediato posterior al periodo que corresponda.",
                        "fecha_inicio": "05/04/2018",
                        "fecha_fin": ""
                    },
                    {
                        "descripcion_obligacion": "Entero mensual de retenciones de ISR de ingresos por  arrendamiento.",
                        "descripcion_vencimiento": "Conjuntamente con la retención por salarios o asimilados a salarios (17 de cada mes en su defecto)",
                        "fecha_inicio": "05/04/2018",
                        "fecha_fin": ""
                    }
                ],
                "nombre_denominacion_o_razon_social": "AZAR STORE",
                "lugar_y_fecha_de_emision": "QUERETARO , QUERETARO A 25 DE FEBRERO DE 2021",
                "cadena_original_sello": "||2021/02/25|ACO0123456789|CONSTANCIA DE SITUACIÓN FISCAL|200001010810800000031|| Página  [ 3 ] de [ 3 ] ",
                "sello_digital": "DjETzbOPwK7/jMjGTWuyWl457DT4ZrOxWlalZvDdVNyHiSPrrUk34kCAQwiD5uQJ55tHgb7DcC+kZzUzwwMLRJ972P0asSxVL0lWfEN0cud mddov+d0bGRHRuixnJjNl4nbHs766BeaFxYJNqb9BhGId8q8+xaxnrY=t5NR1ntSr"
            },
            "dt_refreshed": "2021-02-25T20:28:37+00:00",
            "dt_created": "2021-02-25T20:28:37+00:00"
        }
    ]
    ```

    **3.3 Get documents as downloadable ZIP file**
    
    As same as before, user the enpoint on the third field `"documents_zip"`:
    `curl --location --request GET 'https://api.syncfy.com/v1/webhooks/events/31631b46-5ce7-420c-96c2-457b22b3cce3/documents/zip?limit=1000&skip=0' \`

    This dont have an output, just a download request.
    

### ENVS

Enviroment | id_site | name 
------ | ------ | ------
Prod   | 59aefe28056f29793a58c092 | Constancia de Situación Fiscal SAT  

 [//]: # 
[syncfy-widget-docs]: <https://syncfy.com/w/en/sync/public/app/(section:docs/mx/sync-tax/widget/overview)>
[syncfy-webhook-docs]: <https://syncfy.com/w/en/sync/public/app/(section:docs/mx/sync-tax/webhooks/overview)>
[syncfy-webhook-events]: <https://syncfy.com/w/en/sync/public/app/(section:docs/mx/sync-tax/webhooks/events)>
[syncfy-post-user]: <https://syncfy.com/w/en/sync/public/app/(section:docs/mx/sync-tax/api/users)?method=POST&path=%2Fv1%2Fusers>
[syncfy-post-sesions]: <https://syncfy.com/w/en/sync/public/app/(section:docs/mx/sync-tax/api/sessions)?method=POST&path=%2Fv1%2Fsessions>
[syncfy-transactios-docs]: <https://syncfy.com/w/en/sync/public/app/(section:docs/mx/sync-tax/api/transactions)?method=GET&path=%2Fv1%2Ftransactions>
[syncfy-attachments-docs]: <https://syncfy.com/w/en/sync/public/app/(section:docs/mx/sync-tax/api/attachments)?method=GET&path=%2Fv1%2Fattachments%2F:sync_id_attachment>
[syncfy-attachments-json-docs]: <https://syncfy.com/w/en/sync/public/app/(section:docs/mx/sync-tax/api/attachments)?method=GET&path=%2Fv1%2Fattachments%2F:sync_id_attachment%2Fjson>