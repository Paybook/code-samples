
Webhooks
===================
Mediante los Webhooks puedes recibir las notificaciones siguientes:
>1. Una credencial ha sido creada.
>2. Una credencial ha sido actualizada.
>3. Se han descargado nuevos movimientos de una credencial

###/webhooks vía GET regresa webhooks para ese API KEY

#### Autenticación

| Campo     | Tipo | Descripción   |
| :------- | :---- | :--- |
| api_key | String | Key del desarrollador.    |

#### Respuesta
	 
| Campo     | Tipo | Descripción   |
| :------- | :---- | :--- |
| id_webhook | String |  ID del Webhook    |
| id_user    | String   |  ID del usuario   |
| events     | Colección    |  Indica los eventos que se notificarán en el Webhook. Puede ser: _credential_create_, _credential_update_, _refresh_  |
| url     | String    |  URL del Webhook registrado  |
| delay     | Número    |  Cantidad de segundos que tienen que pasar para recibir la notificación una vez generado el evento. Default 0.  |
| dt_create     | Timestamp    |  Tiempo en el que se creó esté registro  |
| dt_modify     | Timestamp    |  Tiempo en el que se modificó esté registro  |

###/webhooks vía POST crea un nuevo webhook

#### Autenticación

| Campo     | Tipo | Descripción   |
| :------- | :---- | :--- |
| api_key | String | Key del desarrollador.    |

#### Parámetros

| Campo     | Tipo | Descripción   |
| :------- | :---- | :--- |
| id_environment | String |  ID del Entorno. _Sandbox(574894bf7848066d138b4570), Production(574894bf7848066d138b4571)_    |
| url     | String    |  URL del Webhook a registrar  |
| events     | Array    |  Arreglo para indicar los eventos que se desean recibir en el Webhook, posibles valores: _["credential_create","credential_update","refresh"]_|
| delay  (opcional)   | Número    |  Cantidad de segundos que tienen que pasar para recibir la notificación una vez generado el evento. Default 0.  |
| id_user (opcional)    | String   |  ID del usuario   |


### Respuesta
	 
| Campo     | Tipo | Descripción   |
| :------- | :---- | :--- |
| id_webhook | String |  ID del Webhook    |
| id_user    | String   |  ID del usuario   |
| events     | Colección    |  Indica los eventos que se notificarán en el Webhook. Puede ser: _credential_create_, _credential_update_, _refresh_  |
| url     | String    |  URL del Webhook registrado  |
| delay     | Número    |  Cantidad de segundos que tienen que pasar para recibir la notificación una vez generado el evento. Default 0.  |
| dt_create     | Timestamp    |  Tiempo en el que se creó esté registro  |
| dt_modify     | Timestamp    |  Tiempo en el que se modificó esté registro  |


###/webhooks/:id_webhook vía PUT actualiza un webhook

#### Autenticación

| Campo     | Tipo | Descripción   |
| :------- | :---- | :--- |
| api_key | String | Key del desarrollador.    |

#### Parámetros

| Campo     | Tipo | Descripción   |
| :------- | :---- | :--- |
| id_environment | String |  ID del Entorno. _Sandbox(574894bf7848066d138b4570), Production(574894bf7848066d138b4571)_    |
| url     | String    |  URL del Webhook a registrar  |
| events     | Array    |  Arreglo para indicar los eventos que se desean recibir en el Webhook, posibles valores: _["credential_create","credential_update","refresh"]_|
| delay  (opcional)   | Número    |  Cantidad de segundos que tienen que pasar para recibir la notificación una vez generado el evento. Default 0.  |
| id_user (opcional)    | String   |  ID del usuario   |


### Respuesta
	 
| Campo     | Tipo | Descripción   |
| :------- | :---- | :--- |
| id_webhook | String |  ID del Webhook    |
| id_user    | String   |  ID del usuario   |
| events     | Colección    |  Indica los eventos que se notificarán en el Webhook. Puede ser: _credential_create_, _credential_update_, _refresh_  |
| url     | String    |  URL del Webhook registrado  |
| delay     | Número    |  Cantidad de segundos que tienen que pasar para recibir la notificación una vez generado el evento. Default 0.  |
| dt_create     | Timestamp    |  Tiempo en el que se creó esté registro  |
| dt_modify     | Timestamp    |  Tiempo en el que se modificó esté registro  |

###/webhooks/:id_webhook vía DELETE actualiza un webhook

#### Autenticación

| Campo     | Tipo | Descripción   |
| :------- | :---- | :--- |
| api_key | String | Key del desarrollador.    |