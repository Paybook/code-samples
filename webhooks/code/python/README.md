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
```

EVENTS
-------------

```python
from flask import Flask
from flask import request
from flask import jsonify

import requests

URL_BASE = 'https://sync.paybook.com'
API_KEY = 'YOUR_API_KEY'

app = Flask(__name__)

@app.route("/my_webhook", methods=['POST'])
def my_webhook():

	body = request.get_json()

	event = body['event']

	if event == 'credential_create':
		handle_credential_create(notification=body)
	elif event == 'credential_update':
		handle_credential_update(notification=body)
	elif event == 'refresh':
		handle_refresh(notification=body)
	else:
		print "Event unidentified"

	result = {
		'handshake' : "xxx-xxx-xxx"
	}

	return jsonify(result)


def handle_credential_create(notification):
	credentials = notification['endpoints']['credential']

	for endpoint_credential in credentials:
		id_user = notification['id_user']
		HEADERS = {
			'Authorization': 'api_key api_key=' + API_KEY +",id_user=" + id_user,
			'X-Http-Method-Override' : 'GET'
		}
		r = requests.post(URL_BASE + endpoint_credential,headers=HEADERS)
		credentials_list = r.json()['response']

		for credential in credentials_list:
			print 'id_credential: ' + str(credential['id_credential'])
			print 'username: ' + credential['username']
			print 'is_authorized: ' + str(credential['is_authorized'])
			print 'is_twofa: ' + str(credential['is_twofa'])
			print 'is_locked: ' + str(credential['is_locked'])
			print 'dt_last_sync: ' + str(credential['dt_last_sync'])




	return True

def handle_credential_update(notification):
	credentials = notification['endpoints']['credential']
	for endpoint_credential in credentials:
		id_user = notification['id_user']
		HEADERS = {
			'Authorization': 'api_key api_key=' + API_KEY +",id_user=" + id_user,
			'X-Http-Method-Override' : 'GET'
		}
		r = requests.post(URL_BASE + endpoint_credential,headers=HEADERS)
		credentials_list = r.json()['response']

		for credential in credentials_list:
			print 'id_credential: ' + credential['id_credential']
			print 'username: ' + credential['username']
			print 'is_authorized: ' + str(credential['is_authorized'])
			print 'is_twofa: ' + str(credential['is_twofa'])
			print 'is_locked: ' + str(credential['is_locked'])
			print 'dt_last_sync: ' + str(credential['dt_last_sync'])

	return True

def handle_refresh(notification):

	credentials = notification['endpoints']['credential']
	for endpoint_credential in credentials:
		id_user = notification['id_user']
		HEADERS = {
			'Authorization': 'api_key api_key=' + API_KEY +",id_user=" + id_user,
			'X-Http-Method-Override' : 'GET'
		}
		r = requests.post(URL_BASE + endpoint_credential,headers=HEADERS)
		credentials_list = r.json()['response']

		for credential in credentials_list:
			print 'id_credential: ' + credential['id_credential']
			print 'username: ' + credential['username']
			print 'is_authorized: ' + str(credential['is_authorized'])
			print 'is_twofa: ' + str(credential['is_twofa'])
			print 'is_locked: ' + str(credential['is_locked'])
			print 'dt_last_sync: ' + str(credential['dt_last_sync'])

	accounts = notification['endpoints']['accounts']
	for endpoint_account in accounts:
		id_user = notification['id_user']
		HEADERS = {
			'Authorization': 'api_key api_key=' + API_KEY +",id_user=" + id_user,
			'X-Http-Method-Override' : 'GET'
		}
		r = requests.post(URL_BASE + endpoint_account,headers=HEADERS)
		accounts_list = r.json()['response']
		for account in accounts_list:
			print 'id_account: ' + str(account['id_account'])
			print 'id_user: ' + str(account['id_user'])
			print 'name: ' + str(account['name'])
			print 'number: ' + str(account['number'])
			print 'balance: ' + str(account['balance'])
			print 'account_type: ' + str(account['account_type'])
			print 'site: ' + str(account['site']['name'])
	

	transactions = notification['endpoints']['transactions']
	for endpoint_transactions in transactions:
		id_user = notification['id_user']
		HEADERS = {
			'Authorization': 'api_key api_key=' + API_KEY +",id_user=" + id_user,
			'X-Http-Method-Override' : 'GET'
		}
		r = requests.post(URL_BASE + endpoint_transactions,headers=HEADERS)
		transactions_list = r.json()['response']
		for transaction in transactions_list:
			print 'id_transaction: ' + str(transaction['id_transaction'])
			print 'id_account: ' + str(transaction['id_account'])
			print 'id_credential: ' + str(transaction['id_credential'])
			print 'id_user: ' + str(transaction['id_user'])

			print 'description: ' + transaction['description']
			print 'amount: ' + str(transaction['amount'])
			print 'reference: ' + str(transaction['reference'])
			print 'currency: ' + transaction['currency']

			print 'dt_transaction: ' + str(transaction['dt_transaction'])
			print 'dt_refresh: ' + str(transaction['dt_refresh'])
			print 'dt_disable: ' + str(transaction['dt_disable'])

	return True
```

