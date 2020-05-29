### Dependencias

- Python 3.5
- Flask
- [Pipenv](https://pipenv.pypa.io/en/latest/) (Optional)

### Ejecutar
***Sin pipenv:***
```bash
pip install flask
FLASK_APP=main_webhook.py FLASK_DEBUG=1 FLASK_ENV=development flask run --host=0.0.0.0 --port=5001
```

***Con pipenv:***
```bash
pipenv install
pipenv shell 
export FLASK_APP=main_webhook.py FLASK_DEBUG=1 FLASK_ENV=development 
flask run --host=0.0.0.0 --port=5001
```

***Ejecutar ngrok*** (independiente si usas pipenv o no)
En otra ventana de terminal:
```bash
ngrok http 5001
```

> Dependiendo de tu instalación de ngrok, es posible que debas ejecutar ngrok desde su path. `<path-to-ngrok>/ngrok http 5001`