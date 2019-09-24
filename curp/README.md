



## Requisitos

- API KEY
- WEBHOOK

## Herramientas de testing

- Postman (https://www.getpostman.com/)
- ngrok ([https://ngrok.com/](https://ngrok.com/))
- Rutina para manejo de peticiones en Webhook  ([Ejemplo Python 2.7](https://github.com/Paybook/code-samples/tree/master/curp/webhook/python2.7))

## Integración

### Paso 0 (Postman)

##### Paso 0.1 Importar colección

[Colección de peticiones para CURP](https://github.com/Paybook/code-samples/tree/master/curp/postman)

##### Paso 0.2 Definición de variables en Postman

| **Variable**            | **Descripción**                                              |
| ----------------------- | ------------------------------------------------------------ |
| sync_api_key            | API KEY entregada por Paybook Sync                           |
| app_webhook_url         | Webhook URL del cliente                                      |
| sync_id_curp_site       | ID Sitio de CURP: *5d4b57e7f9de2a0ad215fba2*                 |
| sync_username           | Nombre del usuario asignado por el cliente                   |
| sync_id_user            | ID del usuario generado al crear al usuario                  |
| sync_token              | Token de sesión de usuario                                   |
| sync_documents_endpoint | Endpoint para descargar los documentos obtenidos por el servicio |



### Paso 1 (Configuración)

Se requiere un endpoint público del lado del usuario donde Paybook Sync pueda enviar mensajes que representen el estado de la solicitud de la CURP. El endpoint deberá manejar el mensaje que Paybook Sync le envía con la información para la descarga del documento

##### Paso 1.1 Validar funcionamiento de Webhook

Petición:

```bash
curl "{{app_webhook_url}}" \
-X POST \ 
-H "Content-type:application/json" \
-d '{"event":"documents_completed"}'
```

Respuesta:

HTTP Response Code 200.

##### Paso 1.2 Dar de alta el Webhook en Sync

Petición:

```bash
curl "https://sync.paybook.com/v1/webhooks" \
-H "Authorization: api_key api_key={{sync_api_key}}" \
-X POST \
-H "Content-Type: application/json" \
-d '{"url":"{{app_webhook_url}}","events":["documents_completed"]}'
```

Respuesta:

```json
{
    "rid": "REQUEST_ID",
    "code": 200,
    "errors": null,
    "status": true,
    "message": null,
    "response": {
        "id_webhook": "WEBHOOK_ID",
        "id_user": null,
        "events": [
            "documents_completed"
        ],
        "url": "app_webhook_url",
        "delay": 0,
        "dt_created": "DT_CREATE_UNIXTIME",
        "dt_modified": null
    }
}
```



| **Campo**   | **Descripción**                                              |
| ----------- | ------------------------------------------------------------ |
| id_webhook  | ID del Webhook                                               |
| id_user     | ID del usuario para el que se recibirán notificaciones, cuando el valor es null se enviarán notificaciones de todos los usuarios al mismo webhook. |
| events      | Eventos que generarán mensajes                               |
| url         | URL del Webhook                                              |
| delay       | Retraso de un mensaje                                        |
| dt_created  | Fecha de creación del webhook                                |
| dt_modified | Fecha de modificación del webhook                            |



### Paso 2 (Flujo). Registrar un usuario

Por cada usuario del cliente que interactúa con los servicios de Sync se deberá registrar un Usuario de Sync. 

Petición:

```bash
curl "https://sync.paybook.com/v1/users" \
-H "Authorization: api_key api_key={{sync_api_key}}" \
-X POST \
-H "Content-Type: application/json" \
-d '{
  "name":"{{sync_username}}"
}'
```

Respuesta:

```json
{
    "rid": "REQUEST_ID",
    "code": 200,
    "errors": null,
    "status": true,
    "message": null,
    "response": {
        "id_user": "USER_ID",
        "id_external": null,
        "name": "sync_username",
        "dt_create": "DT_CREATE_UNIXTIME",
        "dt_modify": null
    }
}
```

| **Campo**   | **Descripción**                                              |
| ----------- | ------------------------------------------------------------ |
| id_user     | Id del usuario                                               |
| id_external | El desarrollador podrá enviar un identificador del usuario, cuando eso sucede se almacena en id_external |
| name        | Nombre del usuario                                           |
| dt_create   | Fecha de creación del usuario en formato Unixtime            |
| dt_modify   | Fecha de modificación del usuario en formato unixtime        |



### Paso 3 (Flujo). Crear Sesión

Por seguridad se recomienda generar un token de sesión para realizar las operaciones de usuario.

Petición:

```bash
curl "https://sync.paybook.com/v1/sessions" \
-H "Authorization: api_key api_key={{sync_api_key}}, id_user={{sync_id_user}}" \
-X POST \
-H "Content-Type: application/json" 
```

Respuesta:

```bash
{
    "rid": "REQUEST_ID",
    "code": 200,
    "errors": null,
    "status": true,
    "message": null,
    "response": {
        "token": "TOKEN",
        "key": "KEY",
        "iv": "IV"
    }
}
```

| **Campo** | **Descripción**                                              |
| --------- | ------------------------------------------------------------ |
| token     | Token de Sesión, éste valor deberá ser usado en cada una de las peticiones. El token caduca una vez que han pasado cinco minutos sin utilizarse en alguna petición. |



### Paso 4 (Flujo). Generar la solicitud de descarga/validación de CURP

Pueden enviarse dos tipos de solicitudes

#### Tipo: ”datos”, solicitar la CURP a partir de los datos personales. 

Petición:

```bash
curl -X POST \
  https://sync.paybook.com/v1/jobs \
  -H 'Authorization: Bearer {{sync_token}}' \
  -H 'Content-Type: application/json' \
  -d '{"id_site" : "5d4b57e7f9de2a0ad215fba2","input" : {"type" : "datos","names" : "[nombre]","firstLastname" : "[primer apellido]","secondLastname" : "[segundo apellido]","bornDay" : "[día de nacimiento]","bornMonth" : "[mes de nacimiento]","bornYear" : "[año de nacimiento]","gender" : "[género]","entityCode" : "[código de entidad]"}}'
```

#### Tipo: “curp”, solicitar la validación de la CURP así como la obtención de los datos personales

Petición:

```
curl -X POST \
  https://sync.paybook.com/v1/jobs \
  -H 'Authorization: Bearer {{sync_token}}' \
  -H 'Content-Type: application/json' \
  -d '{
	"id_site" : "5d4b57e7f9de2a0ad215fba2",
	"input" : {
		"type" : "curp",
		"curp" : "[CURP]"
	}
}'
```

Respuesta:

Es posible monitorear el estado de la solicitud mediante un cliente WebSocket o bien mediante peticiones HTTPS GET 

```json
{
    "rid": "5e28d722-c601-4f3f-bc67-8577728c73e5",
    "code": 200,
    "errors": null,
    "status": true,
    "message": null,
    "response": {
        "id_job_uuid": "5d83bf9c8c91e7656c305a56",
        "id_job": "5d83bf9c8c91e7656c305a57",
        "ws": "wss://sync.paybook.com/v1/status/5d83bf9c8c91e7656c305a57",
        "status": "https://sync.paybook.com/v1/jobs/5d83bf9c8c91e7656c305a57/status",
        "twofa": "https://sync.paybook.com/v1/jobs/5d83bf9c8c91e7656c305a57/twofa"
    }
}
```

| **Campo**   | **Descripción**                                        |
| ----------- | ------------------------------------------------------ |
| id_job_uuid | Identificador de la solicitud                          |
| id_job      | Identificador de la solicitud                          |
| ws          | URI para monitorear la solicitud con cliente WebSocket |
| status      | URI para monitorear la solicitud con HTTPS GET Request |

##### Códigos de entidad

| Código | Descripción |
| ------ | ----------- |
| M      | Mujer       |
| H      | Hombre      |

##### Códigos de entidad

| **Código** | **Entidad**             | **Código** | **Entidad**     |
| ---------- | ----------------------- | ---------- | --------------- |
| AS         | Aguascalientes          | BC         | Baja California |
| BS         | Baja California Sur     | CC         | Campeche        |
| CL         | Coahuila                | CM         | Colima          |
| CS         | Chiapas                 | CH         | Chihuahua       |
| DF         | Ciudad de México        | DG         | Durango         |
| GT         | Guanajuato              | GR         | Guerrero        |
| HG         | Hidalgo                 | JC         | Jalisco         |
| MC         | Estado de México        | MN         | Michoacán       |
| MS         | Morelos                 | NT         | Nayarit         |
| NL         | Nuevo León              | OC         | Oaxaca          |
| PL         | Puebla                  | QT         | Querétaro       |
| QR         | Quintana Roo            | SP         | San Luis Potosí |
| SL         | Sinaloa                 | SR         | Sonora          |
| TC         | Tabasco                 | TS         | Tamaulipas      |
| TL         | Tlaxcala                | VZ         | Veracruz        |
| YN         | Yucatán                 | ZS         | Zacatecas       |
| NE         | Nacido en el extranjero |            |                 |



### Paso 5 (Flujo). Procesar mensajes

Cuando el proceso creado ha descargado documentos, se enviará un mensaje al webhook del desarrollador con la siguiente estructura:

```json
{
    "endpoints": {
        "documents": [
            "/v1/webhooks/events/WEBHOOK_UUID/documents?limit=1000&skip=0"
        ], 
        "documents_json": [
            "/v1/webhooks/events/WEBHOOK_UUID/documents/json?limit=1000&skip=0"
        ], 
        "documents_zip": [
            "/v1/webhooks/events/WEBHOOK_UUID/documents/zip?limit=1000&skip=0"
        ]
    }, 
    "event": "documents_completed", 
    "id_external": null, 
    "id_user": "USER_ID", 
    "uuid": "WEBHOOK_UUID"
}
```

| **Campos**          | **Descripción**                                              |
| ------------------- | ------------------------------------------------------------ |
| endpoints.documents | Endpoint que se podrá utilizar para obtener un arreglo de objetos Documento con cada uno de los obtenidos en el proceso |
| event               | Evento que generó el mensaje, en éste caso siempre se recibirá “documents_completed” |
| id_external         | ID externo del usuario, cuando el desarrollador especifica un identificador de su plataforma para el usuario. |
| id_user             | ID del usuario al que pertenece el mensaje                   |
| uuid                | UUID del Webhook                                             |



### Paso 6. (Descarga de Documentos)

Petición:

```bash
curl "https://sync.paybook.com/v1/webhooks/events/WEBHOOK_UUID/documents?limit=1000&skip=0" \
-H "Authorization: Bearer {{sync_token}}" \
-X GET
```

Respuesta:

```bash
{
	"rid": "REQUEST_ID",
	"code": 200,
	"errors": null,
	"status": true,
	"message": null,
	"response": [
		{
			"id_document": "DOCUMENT_ID",
			"id_document_status": "5b23219d056f2905985444c2",
			"id_document_type": "5d5586fef9de2a0c684e4e01",
			"id_external": "",
			"id_site": "5d4b57e7f9de2a0ad215fba2",
			"id_site_organization": "5d4b57e7f9de2a0ad215fba1",
			"id_site_organization_type": "56cf4f5b784806cf028b4569",
			"file": "[CURP].pdf",
			"identifiers": null,
			"keywords": null,
			"content": "CONTENT_BASE_64",
			"dt_refreshed": "DT_REFRESHED_ISO_FORMAT",
			"dt_created": "DT_CREATED_ISO_FORMAT"
		}
	]
}
```

| **Campo**                 | **Descripción**                                              |
| ------------------------- | ------------------------------------------------------------ |
| id_document               | Id del documento                                             |
| id_document_status        | Id del estado del documento:'Downloaded' : '5b23219d056f2905985444c2' 'Failed' : '5b23219d056f2905985444c3' 'NotFound' : '5b23219d056f2905985444c4' |
| id_document_type          | Id del Tipo de Documento:   'CURP JSON' : '5d5586fef9de2a0c684e4e01' 'CURP PDF' : '5d78cd2ff9de2a0855225fb1' |
| id_external               | Id externo del usuario                                       |
| id_site                   | Id del sitio,5d4b57e7f9de2a0ad215fba2 para CURP              |
| id_site_organization      | Id de la organización del sitio                              |
| id_site_organization_type | Id del tipo de organización del sitio                        |
| file                      | Nombre sugerido de archivo                                   |
| identifiers               | Identificadores del archivo cuando son definidos             |
| keywords                  | Palabras clave del archivo cuando son definidos              |
| content                   | Contenido en String Base64 del archivo                       |
| dt_refreshed              | Fecha de actualización del document                          |
| dt_created                | Fecha de creación del documento                              |