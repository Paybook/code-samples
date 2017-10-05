Filtro de transacciones CFDI
===================


Obtener el total de las facturas
=====
https://sync.paybook.com/v1/attachments/count?api_key={API_KEY}&id_user={ID_USER}&id_credential={ID_CREDENTIAL}&dt_refresh_from={DT_REFRESH_FROM}

Obtener el arreglo en formato JSON
=====
https://sync.paybook.com/v1/attachments/json?api_key={API_KEY}&id_user={ID_USER}&id_credential={ID_CREDENTIAL}&dt_refresh_from={DT_REFRESH_FROM}

Parámetros
=====
 - API_KEY : API KEY del desarrollador 
 - ID_USER : ID de la empresa con la que se desea trabajar 
 - ID_CREDENTIAL : ID de la credencial del SAT 
 - DT_REFRESH_FROM : Fecha de la última descarga 
 - SKIP : Número donde comenzará el paginado, debe de empezar en 0.
 - LIMIT : Tamaño de la página

Resultado
=====
```json


{
	"rid": "cb036508-0f44-43dd-9d69-fbd4baf27d89",
	"code": 200,
	"errors": null,
	"status": true,
	"message": null,
	"response": [
		{
			"id_attachment": "5716ed5123428393108b4587",
			"id_user": "585051220b212a90058b78a3",
			"id_external": null,
			"file": "EE198AA41DDF4BF99949DBC35F29083A.xml",
			"json": {
				"CFDI:COMPROBANTE": {
					"LUGAREXPEDICION": "Celaya, Gto",
					"MONEDA": "MXN",
					"TIPOCAMBIO": "1.00",
					"CERTIFICADO": "MIIEwjCCA6qgAwIBAgIUMDAwMDEwMDAwMDAzMDUwMjk3MzgwDQYJKoZIhvcNAQEFBQAwggGKMTgwNgYDVQQDDC9BLkMuIGRlbCBTZXJ2aWNpbyBkZSBBZG1pbmlzdHJhY2nDs24gVHJpYnV0YXJpYTEvMC0GA1UECgwmU2VydmljaW8gZGUgQWRtaW5pc3RyYWNpw7NuIFRyaWJ1dGFyaWExODA2BgNVBAsML0FkbWluaXN0cmFjacOzbiBkZSBTZWd1cmlkYWQgZGUgbGEgSW5mb3JtYWNpw7NuMR8wHQYJKoZIhvcNAQkBFhBhY29kc0BzYXQuZ29iLm14MSYwJAYDVQQJDB1Bdi4gSGlkYWxnbyA3NywgQ29sLiBHdWVycmVybzEOMAwGA1UEEQwFMDYzMDAxCzAJBgNVBAYTAk1YMRkwFwYDVQQIDBBEaXN0cml0byBGZWRlcmFsMRQwEgYDVQQHDAtDdWF1aHTDqW1vYzEVMBMGA1UELRMMU0FUOTcwNzAxTk4zMTUwMwYJKoZIhvcNAQkCDCZSZXNwb25zYWJsZTogQ2xhdWRpYSBDb3ZhcnJ1YmlhcyBPY2hvYTAeFw0xNDA5MDIyMDAxNTRaFw0xODA5MDIyMDAyMzRaMIG1MRYwFAYDVQQDEw1KVUFOIEJBVVRJU1RBMRYwFAYDVQQpEw1KVUFOIEJBVVRJU1RBMRYwFAYDVQQKEw1KVUFOIEJBVVRJU1RBMQswCQYDVQQGEwJNWDEpMCcGCSqGSIb3DQEJARYaZnJ1dGVyaWFiYXV0aXN0YUBnbWFpbC5jb20xFjAUBgNVBC0TDUJBSlU1NjA3MTdKNTYxGzAZBgNVBAUTEkJBWEo1NjA3MTdIR1RUWE4wMjCBnzANBgkqhkiG9w0BAQEFAAOBjQAwgYkCgYEAh+3biwqgyPStvTGH2KW+KYCcA+ssEUVLbEIHCPxIgcrsPbFloEZFesSqVZW+AW2e1wTHFZ9j8PxovZM8GW4f+2Y8qwXoFCePk/dElarEdRGI6jtUoDxXGAolhWYNA4g1NNVt6YbLOh12uLDC1ySwo5e9F+17+eMO2rRWVShIqukCAwEAAaN2MHQwDAYDVR0TAQH/BAIwADALBgNVHQ8EBAMCA9gwEQYJYIZIAYb4QgEBBAQDAgWgMB0GA1UdJQQWMBQGCCsGAQUFBwMEBggrBgEFBQcDAjAlBgNVHREEHjAcgRpmcnV0ZXJpYWJhdXRpc3RhQGdtYWlsLmNvbTANBgkqhkiG9w0BAQUFAAOCAQEAg5TqqFa6htzCOrFffmYDrlXU/nwFCtMfkrSZfRG2MCv1KYAcZSSGxY3Wkc6kprHrnEY58ZhCqwz5eCjb8g18i+BwQaONwhVQty98c7pgUai8bmA0dp41+XrOrJoUwEWlzzB63GiVgQEWanCoD7k0VVgMBwmGi70JwTv3XCo6uC1tcb9N/jS/SFHDpPtIsJAlOFVBq9vjO8yD5hf3PYxcZP0PspaooXx9KjH45jowCQUz9a489CnJkrhn/nZgiwqs3AhJIfSgIhBS/MOHYVfqi3G2W4FThmnjQw+AM7UH2v09gD2bgX3tnok6/zTTaSQA8gXhxjC6+7UZXC90+IT2UA==",
					"DESCUENTO": "0",
					"FECHA": "2014-09-23T13:19:00",
					"FOLIO": "cfdi1411496374309",
					"FORMADEPAGO": "Pago en una sola exhibici?n",
					"METODODEPAGO": "efectivo",
					"NOCERTIFICADO": "00001000000305029738",
					"SELLO": "NXHNB/7qhd2AUHElGQ/H/DI/wc0dOIzbOoTkDrUmrFVXP1Kx5fR6+xFrvVobn7ceI6w614jOwuScxxX62fVOFJbkXQxTcO4MM7XXL7/FrnPvqCoVs0Dn4vuSZ3mLtXebeu7mGuwaPqBr1VE6ZraGRUlSPWEqrdR125lpXFXrY8Q=",
					"SUBTOTAL": "1.000000",
					"TIPODECOMPROBANTE": "ingreso",
					"TOTAL": "1.000000",
					"VERSION": "3.2",
					"XMLNS:CFDI": "http://www.sat.gob.mx/cfd/3",
					"XMLNS:XSI": "http://www.w3.org/2001/XMLSchema-instance",
					"XSI:SCHEMALOCATION": "http://www.sat.gob.mx/cfd/3 http://www.sat.gob.mx/sitio_internet/cfd/3/cfdv32.xsd",
					"CFDI:EMISOR": {
						"NOMBRE": "JUAN BAUTISTA",
						"RFC": "BAJU560717J56",
						"CFDI:DOMICILIOFISCAL": {
							"CALLE": "Villa Verde",
							"CODIGOPOSTAL": "38020",
							"COLONIA": "Villas de la Hacienda",
							"ESTADO": "Guanajuato",
							"LOCALIDAD": "Celaya",
							"MUNICIPIO": "Celaya",
							"NOEXTERIOR": "208",
							"PAIS": "M?xico"
						},
						"CFDI:EXPEDIDOEN": {
							"CALLE": "Villa Verde",
							"CODIGOPOSTAL": "38020",
							"COLONIA": "Villas de la Hacienda",
							"ESTADO": "Guanajuato",
							"LOCALIDAD": "Celaya",
							"MUNICIPIO": "Celaya",
							"NOEXTERIOR": "208",
							"PAIS": "M?xico"
						},
						"CFDI:REGIMENFISCAL": {
							"REGIMEN": "Personas F?sicas: R?gimen de Incorporaci?n Fiscal"
						}
					},
					"CFDI:RECEPTOR": {
						"NOMBRE": "ACCEM SERVICIOS EMPRESARIALES SC",
						"RFC": "AAA010101AAA",
						"CFDI:DOMICILIO": {
							"CALLE": "Villa Verde 208",
							"CODIGOPOSTAL": "38020",
							"COLONIA": "Villas de la Hacienda",
							"ESTADO": "Guanajuato",
							"MUNICIPIO": "Celaya",
							"NOEXTERIOR": "200",
							"PAIS": "M?xico"
						}
					},
					"CFDI:CONCEPTOS": {
						"CFDI:CONCEPTO": {
							"CANTIDAD": "1",
							"DESCRIPCION": "Prueba",
							"IMPORTE": "1.000000",
							"UNIDAD": "0",
							"VALORUNITARIO": "1.000000"
						}
					},
					"CFDI:IMPUESTOS": {
						"TOTALIMPUESTOSRETENIDOS": "0.000000",
						"TOTALIMPUESTOSTRASLADADOS": "0.000000"
					},
					"CFDI:COMPLEMENTO": {
						"TFD:TIMBREFISCALDIGITAL": {
							"FECHATIMBRADO": "2014-09-23T13:19:50",
							"UUID": "EE198AA4-1DDF-4BF9-9949-DBC35F29083A",
							"NOCERTIFICADOSAT": "00001000000203220518",
							"SELLOCFD": "NXHNB/7qhd2AUHElGQ/H/DI/wc0dOIzbOoTkDrUmrFVXP1Kx5fR6+xFrvVobn7ceI6w614jOwuScxxX62fVOFJbkXQxTcO4MM7XXL7/FrnPvqCoVs0Dn4vuSZ3mLtXebeu7mGuwaPqBr1VE6ZraGRUlSPWEqrdR125lpXFXrY8Q=",
							"SELLOSAT": "cC/8NZPkyg9OVW0aA3VblJSe2AzN1wJae5yv2mXR320yrz7p1TrK6Wn2SOidu+lSV5pmaI6IXUPOf2S8xvG7E9/1FX2mSQnxEN9fJ9X/s3zoaF4EWdimj1dU/Hkgjq4bTSVC5nrCJ7bxuYPdipHPeBLopwon4LQhM0iiOzSpARk=",
							"VERSION": "1.0",
							"XMLNS:TFD": "http://www.sat.gob.mx/TimbreFiscalDigital",
							"XSI:SCHEMALOCATION": "http://www.sat.gob.mx/TimbreFiscalDigital http://www.sat.gob.mx/TimbreFiscalDigital/TimbreFiscalDigital.xsd"
						}
					}
				}
			}
		}
	]
}
```

