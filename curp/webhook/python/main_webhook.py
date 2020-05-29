from flask import Flask, request, jsonify
import json
app = Flask(__name__)

@app.route('/my_webhook', methods=['POST'])
def webhook():
	body = request.get_json()

	print(json.dumps(body, indent=4, sort_keys=True))

	result = {
		'handshake': "xxx-xxx-xxx"
	}

	return jsonify(result)
