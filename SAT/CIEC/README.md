# Implement SAT CIEC

> This recipe uses [Syncfy Widget][syncfy-widget-docs]


## REQUIREMENTS 
1. [Syncfy Widget][syncfy-widget-docs]
2. [Webhooks][syncfy-webhook-docs] implemented
3. Syncfy API Key

## STEPS
> The next steps assume that you have at least one [syncfy API user created][syncfy-post-user] and know how to create a [session token][syncfy-post-sesions]. 

1. **Create CIEC credential with Syncfy Widget**
    
    Use Syncfy Widget to create a new credential, then get `id_credential` from webhook's [credential_create][syncfy-webhook-events] notification.

2. **Get transactions**
    
    In your webhook you will recibe a [refresh][syncfy-webhook-events] notification with transactions endpoints, use them to get the newest data.

    Example:

    `curl --location --request GET 'https://api.syncfy.com/v1/transactions?id_credential={{id_credential}}'` - [*Refer to API docs*][syncfy-transactios-docs]

    Output example (Just one transaction):
    ```json
    {
        "id_transaction": "603747875c21564651572f85",
        "id_account": "5f089184da29fd7a8e169ab5",
        "id_account_type": "546d4904df527d1844a2e18d",
        "id_credential": "6037475da9796801c820181d",
        "id_currency": "523a25953b8e77910e8b456c",
        "id_disable_type": null,
        "id_external": "SB-SATTESTER",
        "id_site": "5da784f1f9de2a06483abec1",
        "id_site_organization": "5ee938d1ba013f42ec1e5a81",
        "id_site_organization_type": "56cf4f5b784806cf028b4569",
        "id_user": "603746cee35e9609d350f9d0",
        "is_account_disable": 0,
        "is_deleted": 0,
        "is_disable": 0,
        "is_pending": 0,
        "description": "FERNANDA",
        "amount": 98.579999999999998,
        "currency": "MXN",
        "attachments": [
            {
                "id_attachment": "603747875c21564651572f88",
                "id_attachment_type": "56bcdfca784806d1378b4567",
                "is_valid": 1,
                "file": "85654C68-5A3C-4199-8E6E-9E8D9E8DE20B.xml",
                "mime": "text/xml",
                "url": "/attachments/603747875c21564651572f88"
            }
        ],
        "extra": {
            "tax_id": "NEMF8801027F7"
        },
        "reference": "85654C68-5A3C-4199-8E6E-9E8D9E8DE20B",
        "keywords": [
            "3.3",
            "emitidas",
            "i",
            "ingreso",
            "timbrefiscaldigital",
            "vigente"
        ],
        "dt_transaction": 1614319200,
        "dt_refresh": 1614235527,
        "dt_disable": null,
        "dt_deleted": null
    }
    ```
3. **Get attachment**

    In your webhook you will recibe a refresh notification with attachments endpoints, use them to get the newest data.
    
    Example:

    `curl --location --request GET 'https://api.syncfy.com/v1/attachments/{{id_attachment}}'` - [*Refer to API docs*][syncfy-attachments-docs]

    Output example: 
    ```XML
    <?xml version="1.0" encoding="utf-8"?>
<cfdi:Comprobante xmlns:cfdi="http://www.sat.gob.mx/cfd/3" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://www.sat.gob.mx/cfd/3 http://www.sat.gob.mx/sitio_internet/cfd/3/cfdv33.xsd" Version="3.3" Serie="E" Folio="122" Fecha="2021-02-26T08:51:38" FormaPago="99" NoCertificado="30001000000400002451" Certificado="MIIFjDCCA3SgAwIBAgIUMzAwMDEwMDAwMDA0MDAwMDI0NTEwDQYJKoZIhvcNAQELBQAwggErMQ8wDQYDVQQDDAZBQyBVQVQxLjAsBgNVBAoMJVNFUlZJQ0lPIERFIEFETUlOSVNUUkFDSU9OIFRSSUJVVEFSSUExGjAYBgNVBAsMEVNBVC1JRVMgQXV0aG9yaXR5MSgwJgYJKoZIhvcNAQkBFhlvc2Nhci5tYXJ0aW5lekBzYXQuZ29iLm14MR0wGwYDVQQJDBQzcmEgY2VycmFkYSBkZSBjYWRpejEOMAwGA1UEEQwFMDYzNzAxCzAJBgNVBAYTAk1YMRkwFwYDVQQIDBBDSVVEQUQgREUgTUVYSUNPMREwDwYDVQQHDAhDT1lPQUNBTjERMA8GA1UELRMIMi41LjQuNDUxJTAjBgkqhkiG9w0BCQITFnJlc3BvbnNhYmxlOiBBQ0RNQS1TQVQwHhcNMTkwNjE3MjMyNTQ5WhcNMjMwNjE3MjMyNTQ5WjCBszEdMBsGA1UEAxMUWE9DSElMVCBDQVNBUyBDSEFWRVoxHTAbBgNVBCkTFFhPQ0hJTFQgQ0FTQVMgQ0hBVkVaMR0wGwYDVQQKExRYT0NISUxUIENBU0FTIENIQVZFWjEWMBQGA1UELRMNQ0FDWDc2MDUxMDFQODEbMBkGA1UEBRMSQ0FDWDc2MDUxME1HVFNIQzA0MR8wHQYDVQQLExZYT0NISUxUIENBU0FTIENIQVZFWiAyMIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAwoZeqXTNnGSt/9LMYKncHwSgab2QzgTw+/oQy8RlD9h57dJdZKYUnY6FX+2qJ5kfAEKR8WXpDdvX9wRCGolt9Mx/t/wWk+9kECMY4s6pikSF1LcvMfrikHoOyKnT6zrUWo/Zcu7IfHfbuf3UTu4Dof2kZG8cMxP2cgh2dltT0YVfxr9ndGIGlbFKM9P2RGmCyz+HXn+gCucdZuuLjo5///ev+GcoECDGU/c1+Dz+2DwRIln2p6Lu3dKS6f2kQbVO+f+vVzdyEMna08Sb92+SBJthR6LfGGP+eNgF4BPUFTXy/f2n8l/RMJ2MCgbrTBgsfCCNGTDkPtth7nieG5YOzwIDAQABox0wGzAMBgNVHRMBAf8EAjAAMAsGA1UdDwQEAwIGwDANBgkqhkiG9w0BAQsFAAOCAgEAEn3sU34HDYbDKFuL2zxdecl360N2wHvL1l/2hAq7TG7TlDE0L5+x+Q8xr9WuyDdhjZhwf89ly7GIVgW74MPvzUyCHE49opIerLaRNbwjiMjWQIn4IJij3smQUzAT9/Gz1pGoMwJpeVCS7ZP/VxiwmRCqemq2DIG+fkbU1HhzUzu3BeeEqvQjGDMKxz/H34Id4O6z/BoB/9Xw9kTIqIhUDxGYQCazTwBnuLoZl9WRCm1PqEhMmlwR/aKV1bPxsoDptlyR9kG9Vg7BOeXlqnC5cmZqge8iiIPSEwH9KCPUm7OrRXa4QomWHVNtXO2cU9KsMCb2aPujjBPdqUgxR2cLpDlMMlYpZkLDt2L18uHKz66PdAHkT3cPhvgUc/hKQCRuTxidug9CdtHWLLSq54hS0e64o5PJ/Xbp6wyXuWR9tWgURZ0+Exy4MJFsua7EDgfKsCxszR1eCFRh29wWvbMRBju0wPushu+asNMamxyvntG7PMBJngOeHBX3VPVbukEAYehNPFF1KPj4VJqPSxaI/Mpyrlxokl9vHttoRArV07zIDm8jIdQRnG/RU8KV3vlGKE2Tru6h6pQZCTCll9Qsnf52U3e2TDq8AQInNgYoraI9vOyuiOGaiouCvf2y2VMJZ06XcwsAomrT2Q3itzESDhyuyuNJyC0Sfh8rv2wWggo=" SubTotal="98.58" Descuento="0.00" Moneda="MXN" Total="98.58" TipoDeComprobante="I" MetodoPago="PUE" LugarExpedicion="11000" Sello="CjGJ6Uz6jWQ6wFyn8SEvRVCOCZq2sRtTAsUkLJjrs8vPSHfeEs+bMBhNnZ+7gLE5gSO+FU+IA64d+I9w98DEop24GRNDoWPxRGvX7SON4p47Ygna/rCWynyjCw8kYqRtBHxypwh0HGFLoNx+ulK+WcOXG7F3Nx2I+EPTg6jn1VvwBm1c1iat1Zgnhcna2ZJyZA3cRFOBhNONocr+qAF8zTtHSoJNYmolOlyIC9akyIPfrNl/ALgni4k1KwpEcr4HsyqVabUDW47vH5TqSNfFz+ZY3bZZZf7FLdTBn8So984+vbomWg/rP7OCBALI/u/+kIkgotm4TF/ImuGjUeKITw==">
    <cfdi:Emisor Rfc="ACM010101ABC" Nombre="ACME CORP" RegimenFiscal="601"/>
    <cfdi:Receptor Rfc="NEMF8801027F7" Nombre="FERNANDA" UsoCFDI="P01"/>
    <cfdi:Conceptos>
        <cfdi:Concepto ClaveProdServ="66825720" Cantidad="6" ClaveUnidad="H87" Unidad="PZA" Descripcion="PRODUCTO 1" ValorUnitario="16.43" Importe="98.58" Descuento="0"></cfdi:Concepto>
    </cfdi:Conceptos>
    <cfdi:Complemento>
        <tfd:TimbreFiscalDigital xmlns:tfd="http://www.sat.gob.mx/TimbreFiscalDigital" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://www.sat.gob.mx/TimbreFiscalDigital http://www.sat.gob.mx/sitio_internet/cfd/timbrefiscaldigital/TimbreFiscalDigitalv11.xsd" Version="1.1" UUID="85654C68-5A3C-4199-8E6E-9E8D9E8DE20B" FechaTimbrado="2021-02-26T08:51:38" SelloCFD="CjGJ6Uz6jWQ6wFyn8SEvRVCOCZq2sRtTAsUkLJjrs8vPSHfeEs+bMBhNnZ+7gLE5gSO+FUz6jWQ6wFyn8SEvRVCOCZq2sWPxRGvX7SON4p47Ygna/rCWynyjCw8kYqRtBHxypwh0HGFLoNx+ulK+WcOXG7F3Nx2I+EPTg6jn1Vvz6jWQ6wFyn8SEvRVCOCZq2s3cRFOBhNONocr+qAF8zTtHSoJNYmolOlyIC9akyIPfrNl/ALgni4k1KwpEcr4HsyqVabz6jWQ6wFyn8SEvRVCOCZq2sf7FLdTBn8So984+vbomWg/rP7OCBALI/u/+kIkgotm4TF/ImuGjUeKITw==" NoCertificadoSAT="00001000000407657133" SelloSAT="W82etl3ZwAEDP7qT705tkK7jryQU5WCFUIOw1nmDyy5/iaxsOVuDPVyhK7fQMRG6A6x9WHGYjkMDZ0DkOnq1vcClr2Sn5yOLdWd9VYf6hg6e/RiLTn1mSUni/47rWNbyODfcom3hmKasclgBEYZL6unymQD2bsUfMc0L5ODZ5/AfK36/bYVeakauL1NxXMZ2Zc4RrX5Zd5AkF04VB6UWqDL2/zuCGDccA6/MsJR2BeXnq/hQ1I8WNSNGcy1OzBukQqRbhe9hIRit58F/ZtTtFnzyeT3Tknu9MIZFq/7D+tw0TxUziC+g2n86iiKRXnRJQvlowqKmkPGO8jMefrx8pg==" RfcProvCertif="ACM100625MC0"/>
    </cfdi:Complemento>
</cfdi:Comprobante>
    ```

4. **GET atachments parsed to JSON**

Same as before but just add `/json` at the end of the endpoint.

Example:
`curl --location --request GET 'https://api.syncfy.com/v1/attachments/{{id_attachment}}/json'` - [*Refer to API docs*][syncfy-attachments-json-docs]


Output example: 
```json
{
    "id_attachment": "603747875c21564651572f88",
    "id_user": "603746cee35e9609d350f9d0",
    "id_external": "SB-SATTESTER",
    "file": "85654C68-5A3C-4199-8E6E-9E8D9E8DE20B.xml",
    "json": {
        "CFDI:COMPROBANTE": {
            "XMLNS:CFDI": "http://www.sat.gob.mx/cfd/3",
            "XMLNS:XSI": "http://www.w3.org/2001/XMLSchema-instance",
            "XSI:SCHEMALOCATION": "http://www.sat.gob.mx/cfd/3 http://www.sat.gob.mx/sitio_internet/cfd/3/cfdv33.xsd",
            "VERSION": "3.3",
            "SERIE": "E",
            "FOLIO": "122",
            "FECHA": "2021-02-26T08:51:38",
            "FORMAPAGO": "99",
            "NOCERTIFICADO": "30001000000400002451",
            "CERTIFICADO": "MIIFjDCCA3SgAwIBAgIUMzAwMDEwMDAwMDA0MDAwMDI0NTEwDQYJKoZIhvcNAQELBQAwggErMQ8wDQYDVQQDDAZBQyBVQVQxLjAsBgNVBAoMJVNFUlZJQ0lPIERFIEFETUlOSVNUUkFDSU9OIFRSSUJVVEFSSUExGjAYBgNVBAsMEVNBVC1JRVMgQXV0aG9yaXR5MSgwJgYJKoZIhvcNAQkBFhlvc2Nhci5tYXJ0aW5lekBzYXQuZ29iLm14MR0wGwYDVQQJDBQzcmEgY2VycmFkYSBkZSBjYWRpejEOMAwGA1UEEQwFMDYzNzAxCzAJBgNVBAYTAk1YMRkwFwYDVQQIDBBDSVVEQUQgREUgTUVYSUNPMREwDwYDVQQHDAhDT1lPQUNBTjERMA8GA1UELRMIMi41LjQuNDUxJTAjBgkqhkiG9w0BCQITFnJlc3BvbnNhYmxlOiBBQ0RNQS1TQVQwHhcNMTkwNjE3MjMyNTQ5WhcNMjMwNjE3MjMyNTQ5WjCBszEdMBsGA1UEAxMUWE9DSElMVCBDQVNBUyBDSEFWRVoxHTAbBgNVBCkTFFhPQ0hJTFQgQ0FTQVMgQ0hBVkVaMR0wGwYDVQQKExRYT0NISUxUIENBU0FTIENIQVZFWjEWMBQGA1UELRMNQ0FDWDc2MDUxMDFQODEbMBkGA1UEBRMSQ0FDWDc2MDUxME1HVFNIQzA0MR8wHQYDVQQLExZYT0NISUxUIENBU0FTIENIQVZFWiAyMIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAwoZeqXTNnGSt/9LMYKncHwSgab2QzgTw+/oQy8RlD9h57dJdZKYUnY6FX+2qJ5kfAEKR8WXpDdvX9wRCGolt9Mx/t/wWk+9kECMY4s6pikSF1LcvMfrikHoOyKnT6zrUWo/Zcu7IfHfbuf3UTu4Dof2kZG8cMxP2cgh2dltT0YVfxr9ndGIGlbFKM9P2RGmCyz+HXn+gCucdZuuLjo5///ev+GcoECDGU/c1+Dz+2DwRIln2p6Lu3dKS6f2kQbVO+f+vVzdyEMna08Sb92+SBJthR6LfGGP+eNgF4BPUFTXy/f2n8l/RMJ2MCgbrTBgsfCCNGTDkPtth7nieG5YOzwIDAQABox0wGzAMBgNVHRMBAf8EAjAAMAsGA1UdDwQEAwIGwDANBgkqhkiG9w0BAQsFAAOCAgEAEn3sU34HDYbDKFuL2zxdecl360N2wHvL1l/2hAq7TG7TlDE0L5+x+Q8xr9WuyDdhjZhwf89ly7GIVgW74MPvzUyCHE49opIerLaRNbwjiMjWQIn4IJij3smQUzAT9/Gz1pGoMwJpeVCS7ZP/VxiwmRCqemq2DIG+fkbU1HhzUzu3BeeEqvQjGDMKxz/H34Id4O6z/BoB/9Xw9kTIqIhUDxGYQCazTwBnuLoZl9WRCm1PqEhMmlwR/aKV1bPxsoDptlyR9kG9Vg7BOeXlqnC5cmZqge8iiIPSEwH9KCPUm7OrRXa4QomWHVNtXO2cU9KsMCb2aPujjBPdqUgxR2cLpDlMMlYpZkLDt2L18uHKz66PdAHkT3cPhvgUc/hKQCRuTxidug9CdtHWLLSq54hS0e64o5PJ/Xbp6wyXuWR9tWgURZ0+Exy4MJFsua7EDgfKsCxszR1eCFRh29wWvbMRBju0wPushu+asNMamxyvntG7PMBJngOeHBX3VPVbukEAYehNPFF1KPj4VJqPSxaI/Mpyrlxokl9vHttoRArV07zIDm8jIdQRnG/RU8KV3vlGKE2Tru6h6pQZCTCll9Qsnf52U3e2TDq8AQInNgYoraI9vOyuiOGaiouCvf2y2VMJZ06XcwsAomrT2Q3itzESDhyuyuNJyC0Sfh8rv2wWggo=",
            "SUBTOTAL": "98.58",
            "DESCUENTO": "0.00",
            "MONEDA": "MXN",
            "TOTAL": "98.58",
            "TIPODECOMPROBANTE": "I",
            "METODOPAGO": "PUE",
            "LUGAREXPEDICION": "11000",
            "SELLO": "CjGJ6Uz6jWQ6wFyn8SEvRVCOCZq2sRtTAsUkLJjrs8vPSHfeEs+bMBhNnZ+7gLE5gSO+FU+IA64d+I9w98DEop24GRNDoWPxRGvX7SON4p47Ygna/rCWynyjCw8kYqRtBHxypwh0HGFLoNx+ulK+WcOXG7F3Nx2I+EPTg6jn1VvwBm1c1iat1Zgnhcna2ZJyZA3cRFOBhNONocr+qAF8zTtHSoJNYmolOlyIC9akyIPfrNl/ALgni4k1KwpEcr4HsyqVabUDW47vH5TqSNfFz+ZY3bZZZf7FLdTBn8So984+vbomWg/rP7OCBALI/u/+kIkgotm4TF/ImuGjUeKITw==",
            "CFDI:EMISOR": {
                "RFC": "ACM010101ABC",
                "NOMBRE": "ACME CORP",
                "REGIMENFISCAL": "601"
            },
            "CFDI:RECEPTOR": {
                "RFC": "NEMF8801027F7",
                "NOMBRE": "FERNANDA",
                "USOCFDI": "P01"
            },
            "CFDI:CONCEPTOS": {
                "CFDI:CONCEPTO": {
                    "CLAVEPRODSERV": "66825720",
                    "CANTIDAD": "6",
                    "CLAVEUNIDAD": "H87",
                    "UNIDAD": "PZA",
                    "DESCRIPCION": "PRODUCTO 1",
                    "VALORUNITARIO": "16.43",
                    "IMPORTE": "98.58",
                    "DESCUENTO": "0"
                }
            },
            "CFDI:COMPLEMENTO": {
                "TFD:TIMBREFISCALDIGITAL": {
                    "XMLNS:TFD": "http://www.sat.gob.mx/TimbreFiscalDigital",
                    "XMLNS:XSI": "http://www.w3.org/2001/XMLSchema-instance",
                    "XSI:SCHEMALOCATION": "http://www.sat.gob.mx/TimbreFiscalDigital http://www.sat.gob.mx/sitio_internet/cfd/timbrefiscaldigital/TimbreFiscalDigitalv11.xsd",
                    "VERSION": "1.1",
                    "UUID": "85654C68-5A3C-4199-8E6E-9E8D9E8DE20B",
                    "FECHATIMBRADO": "2021-02-26T08:51:38",
                    "SELLOCFD": "CjGJ6Uz6jWQ6wFyn8SEvRVCOCZq2sRtTAsUkLJjrs8vPSHfeEs+bMBhNnZ+7gLE5gSO+FUz6jWQ6wFyn8SEvRVCOCZq2sWPxRGvX7SON4p47Ygna/rCWynyjCw8kYqRtBHxypwh0HGFLoNx+ulK+WcOXG7F3Nx2I+EPTg6jn1Vvz6jWQ6wFyn8SEvRVCOCZq2s3cRFOBhNONocr+qAF8zTtHSoJNYmolOlyIC9akyIPfrNl/ALgni4k1KwpEcr4HsyqVabz6jWQ6wFyn8SEvRVCOCZq2sf7FLdTBn8So984+vbomWg/rP7OCBALI/u/+kIkgotm4TF/ImuGjUeKITw==",
                    "NOCERTIFICADOSAT": "00001000000407657133",
                    "SELLOSAT": "W82etl3ZwAEDP7qT705tkK7jryQU5WCFUIOw1nmDyy5/iaxsOVuDPVyhK7fQMRG6A6x9WHGYjkMDZ0DkOnq1vcClr2Sn5yOLdWd9VYf6hg6e/RiLTn1mSUni/47rWNbyODfcom3hmKasclgBEYZL6unymQD2bsUfMc0L5ODZ5/AfK36/bYVeakauL1NxXMZ2Zc4RrX5Zd5AkF04VB6UWqDL2/zuCGDccA6/MsJR2BeXnq/hQ1I8WNSNGcy1OzBukQqRbhe9hIRit58F/ZtTtFnzyeT3Tknu9MIZFq/7D+tw0TxUziC+g2n86iiKRXnRJQvlowqKmkPGO8jMefrx8pg==",
                    "RFCPROVCERTIF": "ACM100625MC0"
                }
            }
        }
    }
}
```
### ENVS

Enviroment | id_site | name 
------ | ------ | ------
Prod   | 56cf5728784806f72b8b456f | CIEC
Sandbox | 5da784f1f9de2a06483abec1 | CIEC (Sandbox)  

 [//]: # 
[syncfy-widget-docs]: <https://syncfy.com/w/en/sync/public/app/(section:docs/mx/sync-tax/widget/overview)>
[syncfy-webhook-docs]: <https://syncfy.com/w/en/sync/public/app/(section:docs/mx/sync-tax/webhooks/overview)>
[syncfy-webhook-events]: <https://syncfy.com/w/en/sync/public/app/(section:docs/mx/sync-tax/webhooks/events)>
[syncfy-post-user]: <https://syncfy.com/w/en/sync/public/app/(section:docs/mx/sync-tax/api/users)?method=POST&path=%2Fv1%2Fusers>
[syncfy-post-sesions]: <https://syncfy.com/w/en/sync/public/app/(section:docs/mx/sync-tax/api/sessions)?method=POST&path=%2Fv1%2Fsessions>
[syncfy-transactios-docs]: <https://syncfy.com/w/en/sync/public/app/(section:docs/mx/sync-tax/api/transactions)?method=GET&path=%2Fv1%2Ftransactions>
[syncfy-attachments-docs]: <https://syncfy.com/w/en/sync/public/app/(section:docs/mx/sync-tax/api/attachments)?method=GET&path=%2Fv1%2Fattachments%2F:sync_id_attachment>
[syncfy-attachments-json-docs]: <https://syncfy.com/w/en/sync/public/app/(section:docs/mx/sync-tax/api/attachments)?method=GET&path=%2Fv1%2Fattachments%2F:sync_id_attachment%2Fjson>