PYTHON
===================

GET
-------------
```python
import requests

URL_BASE = 'https://sync.paybook.com/v1'
API_KEY = 'YOUR_API_KEY'

HEADERS = {
	'Authorization': 'api_key api_key=' + API_KEY,
	'X-Http-Method-Override' : 'GET'
}

r = requests.post(URL_BASE + '/webhooks',headers=HEADERS)
webhooks = r.json()['response']
print "Webhooks: " + str(len(webhooks)) + "\n"

for webhook in webhooks:
	print 'id_webhook: ' + str(webhook['id_webhook'])
	print 'id_user: ' + str(webhook['id_user'])
	print 'events: ' + str(webhook['events'])
	print 'url: ' + str(webhook['url'])
	print 'delay: ' + str(webhook['delay'])
	print 'dt_create: ' + str(webhook['dt_create'])
	print 'dt_modify: ' + str(webhook['dt_modify'])
	print "\n"
```

POST
-------------
```python
import requests
import json

URL_BASE = 'https://sync.paybook.com/v1'
API_KEY = 'YOUR_API_KEY'

HEADERS = {
	'Authorization': 'api_key api_key=' + API_KEY
}
data = {
	"id_environment" : "574894bf7848066d138b4570", 
	"events" : ["credential_create","credential_update","refresh"],
	"url" : 	"https://WEBHOOK_DOMAIN/my_webhook"
}
r = requests.post(URL_BASE + '/webhooks',headers=HEADERS,data=json.dumps(data))
webhook = r.json()['response']

print 'id_webhook: ' + str(webhook['id_webhook'])
print 'id_user: ' + str(webhook['id_user'])
print 'events: ' + str(webhook['events'])
print 'url: ' + str(webhook['url'])
print 'delay: ' + str(webhook['delay'])
print 'dt_create: ' + str(webhook['dt_create'])
print 'dt_modify: ' + str(webhook['dt_modify'])
```

DELETE
-------------
```python
import requests

URL_BASE = 'https://sync.paybook.com/v1'
API_KEY = 'YOUR_API_KEY'
ID_WEBHOOK = 'WEBHOOK_ID_TO_DELETE'

HEADERS = {
	'Authorization': 'api_key api_key=' + API_KEY,
	'X-Http-Method-Override' : 'DELETE'
}

r = requests.post(URL_BASE + '/webhooks/' + ID_WEBHOOK,headers=HEADERS)
print  "Deleted: " + str(r.json()['response'])
-X POST
```