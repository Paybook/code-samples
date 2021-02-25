# Implement SAT CIEC Retenciones

> This recipe uses [Syncfy Widget][syncfy-widget-docs]


## REQUIREMENTS 
1. [Syncfy Widget][syncfy-widget-docs]
2. [Webhooks][syncfy-webhook-docs] implemented
3. Syncfy API Key

## STEPS
> The next steps assume that you have at least one [syncfy API user created][syncfy-post-user] and know how to create a [session token][syncfy-post-sesions]. 

1. **Create CIEC Retenciones credential with Syncfy Widget**
    
    Use Syncfy Widget to create a new credential, then get `id_credential` from webhook's [credential_create][syncfy-webhook-events] notification.

2. **Get transactions**
    
    In your webhook you will recibe a [refresh][syncfy-webhook-events] notification with transactions endpoints, use them to get the newest data.

    Example:

    `curl --location --request GET 'https://api.syncfy.com/v1/transactions?id_credential={{id_credential}}'` - [*Refer to API docs*][syncfy-transactios-docs]

    Output example (Just one transaction):
    ```json
    {
        "id_transaction": "60374cc13c72ec5a2778c541",
        "id_account": "5f2d9f6fadb8b4448a48cb29",
        "id_account_type": "546d4904df527d1844a2e18d",
        "id_credential": "60374c9e96805a646d64c12b",
        "id_currency": "523a25953b8e77910e8b456c",
        "id_disable_type": null,
        "id_external": "SB-SATTESTER",
        "id_site": "5f2c2aacd74b837fc10602c1",
        "id_site_organization": "5ee938d1ba013f42ec1e5a81",
        "id_site_organization_type": "56cf4f5b784806cf028b4569",
        "id_user": "603746cee35e9609d350f9d0",
        "is_account_disable": 0,
        "is_deleted": 0,
        "is_disable": 0,
        "is_pending": 0,
        "description": "XOCHILT CASAS CHAVEZ",
        "amount": 0,
        "currency": "MXN",
        "attachments": [
            {
                "id_attachment": "60374cc13c72ec5a2778c545",
                "id_attachment_type": "5f2956741ae9967c4d3dccd1",
                "is_valid": 1,
                "file": "64B3CDF9-C5C4-42F0-8E94-F40FAB04DF4C.xml",
                "mime": null,
                "url": "/attachments/60374cc13c72ec5a2778c545"
            }
        ],
        "extra": {
            "tax_id": "CACX7605101P8"
        },
        "reference": "64B3CDF9-C5C4-42F0-8E94-F40FAB04DF4C",
        "keywords": [
            "1.0",
            "26",
            "recibidas",
            "serviciosplataformastecnologicas",
            "vigente"
        ],
        "dt_transaction": 1614319200,
        "dt_refresh": 1614236865,
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
<retenciones:Retenciones xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:retenciones="http://www.sat.gob.mx/esquemas/retencionpago/1" xmlns:plataformasTecnologicas="http://www.sat.gob.mx/esquemas/retencionpago/1/PlataformasTecnologicas10" xsi:schemaLocation="http://www.sat.gob.mx/esquemas/retencionpago/1 http://www.sat.gob.mx/esquemas/retencionpago/1/retencionpagov1.xsd http://www.sat.gob.mx/esquemas/retencionpago/1/PlataformasTecnologicas10 http://www.sat.gob.mx/esquemas/retencionpago/1/PlataformasTecnologicas10/ServiciosPlataformasTecnologicas10.xsd" Version="1.0" FolioInt="410" CveRetenc="26" FechaExp="2021-02-25T22:13:01" NoCertificado="30001000000400002451" Certificado="MIIFjDCCA3SgAwIBAgIUMzAwMDEwMDAwMDA0MDAwMDI0NTEwDQYJKoZIhvcNAQELBQAwggErMQ8wDQYDVQQDDAZBQyBVQVQxLjAsBgNVBAoMJVNFUlZJQ0lPIERFIEFETUlOSVNUUkFDSU9OIFRSSUJVVEFSSUExGjAYBgNVBAsMEVNBVC1JRVMgQXV0aG9yaXR5MSgwJgYJKoZIhvcNAQkBFhlvc2Nhci5tYXJ0aW5lekBzYXQuZ29iLm14MR0wGwYDVQQJDBQzcmEgY2VycmFkYSBkZSBjYWRpejEOMAwGA1UEEQwFMDYzNzAxCzAJBgNVBAYTAk1YMRkwFwYDVQQIDBBDSVVEQUQgREUgTUVYSUNPMREwDwYDVQQHDAhDT1lPQUNBTjERMA8GA1UELRMIMi41LjQuNDUxJTAjBgkqhkiG9w0BCQITFnJlc3BvbnNhYmxlOiBBQ0RNQS1TQVQwHhcNMTkwNjE3MjMyNTQ5WhcNMjMwNjE3MjMyNTQ5WjCBszEdMBsGA1UEAxMUWE9DSElMVCBDQVNBUyBDSEFWRVoxHTAbBgNVBCkTFFhPQ0hJTFQgQ0FTQVMgQ0hBVkVaMR0wGwYDVQQKExRYT0NISUxUIENBU0FTIENIQVZFWjEWMBQGA1UELRMNQ0FDWDc2MDUxMDFQODEbMBkGA1UEBRMSQ0FDWDc2MDUxME1HVFNIQzA0MR8wHQYDVQQLExZYT0NISUxUIENBU0FTIENIQVZFWiAyMIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAwoZeqXTNnGSt/9LMYKncHwSgab2QzgTw+/oQy8RlD9h57dJdZKYUnY6FX+2qJ5kfAEKR8WXpDdvX9wRCGolt9Mx/t/wWk+9kECMY4s6pikSF1LcvMfrikHoOyKnT6zrUWo/Zcu7IfHfbuf3UTu4Dof2kZG8cMxP2cgh2dltT0YVfxr9ndGIGlbFKM9P2RGmCyz+HXn+gCucdZuuLjo5///ev+GcoECDGU/c1+Dz+2DwRIln2p6Lu3dKS6f2kQbVO+f+vVzdyEMna08Sb92+SBJthR6LfGGP+eNgF4BPUFTXy/f2n8l/RMJ2MCgbrTBgsfCCNGTDkPtth7nieG5YOzwIDAQABox0wGzAMBgNVHRMBAf8EAjAAMAsGA1UdDwQEAwIGwDANBgkqhkiG9w0BAQsFAAOCAgEAEn3sU34HDYbDKFuL2zxdecl360N2wHvL1l/2hAq7TG7TlDE0L5+x+Q8xr9WuyDdhjZhwf89ly7GIVgW74MPvzUyCHE49opIerLaRNbwjiMjWQIn4IJij3smQUzAT9/Gz1pGoMwJpeVCS7ZP/VxiwmRCqemq2DIG+fkbU1HhzUzu3BeeEqvQjGDMKxz/H34Id4O6z/BoB/9Xw9kTIqIhUDxGYQCazTwBnuLoZl9WRCm1PqEhMmlwR/aKV1bPxsoDptlyR9kG9Vg7BOeXlqnC5cmZqge8iiIPSEwH9KCPUm7OrRXa4QomWHVNtXO2cU9KsMCb2aPujjBPdqUgxR2cLpDlMMlYpZkLDt2L18uHKz66PdAHkT3cPhvgUc/hKQCRuTxidug9CdtHWLLSq54hS0e64o5PJ/Xbp6wyXuWR9tWgURZ0+Exy4MJFsua7EDgfKsCxszR1eCFRh29wWvbMRBju0wPushu+asNMamxyvntG7PMBJngOeHBX3VPVbukEAYehNPFF1KPj4VJqPSxaI/Mpyrlxokl9vHttoRArV07zIDm8jIdQRnG/RU8KV3vlGKE2Tru6h6pQZCTCll9Qsnf52U3e2TDq8AQInNgYoraI9vOyuiOGaiouCvf2y2VMJZ06XcwsAomrT2Q3itzESDhyuyuNJyC0Sfh8rv2wWggo=" Sello="CjGJ6Uz6jWQ6wFyn8SEvRVCOCZq2sRtTAsUkLJjrs8vPSHfeEs+bMBhNnZ+7gLE5gSO+FU+IA64d+I9w98DEop24GRNDoWPxRGvX7SON4p47Ygna/rCWynyjCw8kYqRtBHxypwh0HGFLoNx+ulK+WcOXG7F3Nx2I+EPTg6jn1VvwBm1c1iat1Zgnhcna2ZJyZA3cRFOBhNONocr+qAF8zTtHSoJNYmolOlyIC9akyIPfrNl/ALgni4k1KwpEcr4HsyqVabUDW47vH5TqSNfFz+ZY3bZZZf7FLdTBn8So984+vbomWg/rP7OCBALI/u/+kIkgotm4TF/ImuGjUeKITw==">
    <retenciones:Emisor RFCEmisor="CACX7605101P8" NomDenRazSocE="XOCHILT CASAS CHAVEZ"/>
    <retenciones:Receptor Nacionalidad="Nacional">
        <retenciones:Nacional RFCRecep="IIA040805DZ4" NomDenRazSocR="INDUSTRIA ILUMINADORA DE ALMACENES SA DE CV"/>
    </retenciones:Receptor>
    <retenciones:Periodo MesIni="12" MesFin="12" Ejerc="2019"/>
    <retenciones:Totales montoTotOperacion="0" montoTotGrav="0" montoTotExent="0" montoTotRet="0"/>
    <retenciones:Complemento>
        <plataformasTecnologicas:ServiciosPlataformasTecnologicas DifIVAEntregadoPrestServ="0.00" MonTotServSIVA="0.00" MonTotalporUsoPlataforma="0.00" NumServ="1" Periodicidad="02" TotalISRRetenido="0.00" TotalIVARetenido="0.00" TotalIVATrasladado="0.00" Version="1.0">
            <plataformasTecnologicas:Servicios>
                <plataformasTecnologicas:DetallesDelServicio FechaServ="2020-02-10" FormaPagoServ="02" PrecioServSinIVA="0.00" TipoDeServ="01">
                    <plataformasTecnologicas:ImpuestosTrasladadosdelServicio Base="0.00" Importe="0.00" Impuesto="02" TasaCuota="0.160000" TipoFactor="Tasa"/>
                    <plataformasTecnologicas:ComisionDelServicio Base="0.00" Importe="0.00" Porcentaje="0.001"/>
                </plataformasTecnologicas:DetallesDelServicio>
            </plataformasTecnologicas:Servicios>
        </plataformasTecnologicas:ServiciosPlataformasTecnologicas>
        <tfd:TimbreFiscalDigital xmlns:tfd="http://www.sat.gob.mx/TimbreFiscalDigital" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://www.sat.gob.mx/TimbreFiscalDigital http://www.sat.gob.mx/sitio_internet/cfd/timbrefiscaldigital/TimbreFiscalDigitalv11.xsd" Version="1.1" UUID="64B3CDF9-C5C4-42F0-8E94-F40FAB04DF4C" FechaTimbrado="2021-02-25T22:13:01" SelloCFD="CjGJ6Uz6jWQ6wFyn8SEvRVCOCZq2sRtTAsUkLJjrs8vPSHfeEs+bMBhNnZ+7gLE5gSO+FUz6jWQ6wFyn8SEvRVCOCZq2sWPxRGvX7SON4p47Ygna/rCWynyjCw8kYqRtBHxypwh0HGFLoNx+ulK+WcOXG7F3Nx2I+EPTg6jn1Vvz6jWQ6wFyn8SEvRVCOCZq2s3cRFOBhNONocr+qAF8zTtHSoJNYmolOlyIC9akyIPfrNl/ALgni4k1KwpEcr4HsyqVabz6jWQ6wFyn8SEvRVCOCZq2sf7FLdTBn8So984+vbomWg/rP7OCBALI/u/+kIkgotm4TF/ImuGjUeKITw==" NoCertificadoSAT="00001000000407657133" SelloSAT="W82etl3ZwAEDP7qT705tkK7jryQU5WCFUIOw1nmDyy5/iaxsOVuDPVyhK7fQMRG6A6x9WHGYjkMDZ0DkOnq1vcClr2Sn5yOLdWd9VYf6hg6e/RiLTn1mSUni/47rWNbyODfcom3hmKasclgBEYZL6unymQD2bsUfMc0L5ODZ5/AfK36/bYVeakauL1NxXMZ2Zc4RrX5Zd5AkF04VB6UWqDL2/zuCGDccA6/MsJR2BeXnq/hQ1I8WNSNGcy1OzBukQqRbhe9hIRit58F/ZtTtFnzyeT3Tknu9MIZFq/7D+tw0TxUziC+g2n86iiKRXnRJQvlowqKmkPGO8jMefrx8pg==" RfcProvCertif="ACM100625MC0"/>
    </retenciones:Complemento>
</retenciones:Retenciones>
    ```

4. **GET atachments parsed to JSON**

Same as before but just add `/json` at the end of the endpoint.

Example:
`curl --location --request GET 'https://api.syncfy.com/v1/attachments/{{id_attachment}}/json'` - [*Refer to API docs*][syncfy-attachments-json-docs]


Output example: 
```json
{
    "id_attachment": "60374cc13c72ec5a2778c545",
    "id_user": "603746cee35e9609d350f9d0",
    "id_external": "SB-SATTESTER",
    "file": "64B3CDF9-C5C4-42F0-8E94-F40FAB04DF4C.xml",
    "json": {
        "RETENCIONES:RETENCIONES": {
            "XMLNS:XSI": "http://www.w3.org/2001/XMLSchema-instance",
            "XMLNS:RETENCIONES": "http://www.sat.gob.mx/esquemas/retencionpago/1",
            "XMLNS:PLATAFORMASTECNOLOGICAS": "http://www.sat.gob.mx/esquemas/retencionpago/1/PlataformasTecnologicas10",
            "XSI:SCHEMALOCATION": "http://www.sat.gob.mx/esquemas/retencionpago/1 http://www.sat.gob.mx/esquemas/retencionpago/1/retencionpagov1.xsd http://www.sat.gob.mx/esquemas/retencionpago/1/PlataformasTecnologicas10 http://www.sat.gob.mx/esquemas/retencionpago/1/PlataformasTecnologicas10/ServiciosPlataformasTecnologicas10.xsd",
            "VERSION": "1.0",
            "FOLIOINT": "410",
            "CVERETENC": "26",
            "FECHAEXP": "2021-02-25T22:13:01",
            "NOCERTIFICADO": "30001000000400002451",
            "CERTIFICADO": "MIIFjDCCA3SgAwIBAgIUMzAwMDEwMDAwMDA0MDAwMDI0NTEwDQYJKoZIhvcNAQELBQAwggErMQ8wDQYDVQQDDAZBQyBVQVQxLjAsBgNVBAoMJVNFUlZJQ0lPIERFIEFETUlOSVNUUkFDSU9OIFRSSUJVVEFSSUExGjAYBgNVBAsMEVNBVC1JRVMgQXV0aG9yaXR5MSgwJgYJKoZIhvcNAQkBFhlvc2Nhci5tYXJ0aW5lekBzYXQuZ29iLm14MR0wGwYDVQQJDBQzcmEgY2VycmFkYSBkZSBjYWRpejEOMAwGA1UEEQwFMDYzNzAxCzAJBgNVBAYTAk1YMRkwFwYDVQQIDBBDSVVEQUQgREUgTUVYSUNPMREwDwYDVQQHDAhDT1lPQUNBTjERMA8GA1UELRMIMi41LjQuNDUxJTAjBgkqhkiG9w0BCQITFnJlc3BvbnNhYmxlOiBBQ0RNQS1TQVQwHhcNMTkwNjE3MjMyNTQ5WhcNMjMwNjE3MjMyNTQ5WjCBszEdMBsGA1UEAxMUWE9DSElMVCBDQVNBUyBDSEFWRVoxHTAbBgNVBCkTFFhPQ0hJTFQgQ0FTQVMgQ0hBVkVaMR0wGwYDVQQKExRYT0NISUxUIENBU0FTIENIQVZFWjEWMBQGA1UELRMNQ0FDWDc2MDUxMDFQODEbMBkGA1UEBRMSQ0FDWDc2MDUxME1HVFNIQzA0MR8wHQYDVQQLExZYT0NISUxUIENBU0FTIENIQVZFWiAyMIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAwoZeqXTNnGSt/9LMYKncHwSgab2QzgTw+/oQy8RlD9h57dJdZKYUnY6FX+2qJ5kfAEKR8WXpDdvX9wRCGolt9Mx/t/wWk+9kECMY4s6pikSF1LcvMfrikHoOyKnT6zrUWo/Zcu7IfHfbuf3UTu4Dof2kZG8cMxP2cgh2dltT0YVfxr9ndGIGlbFKM9P2RGmCyz+HXn+gCucdZuuLjo5///ev+GcoECDGU/c1+Dz+2DwRIln2p6Lu3dKS6f2kQbVO+f+vVzdyEMna08Sb92+SBJthR6LfGGP+eNgF4BPUFTXy/f2n8l/RMJ2MCgbrTBgsfCCNGTDkPtth7nieG5YOzwIDAQABox0wGzAMBgNVHRMBAf8EAjAAMAsGA1UdDwQEAwIGwDANBgkqhkiG9w0BAQsFAAOCAgEAEn3sU34HDYbDKFuL2zxdecl360N2wHvL1l/2hAq7TG7TlDE0L5+x+Q8xr9WuyDdhjZhwf89ly7GIVgW74MPvzUyCHE49opIerLaRNbwjiMjWQIn4IJij3smQUzAT9/Gz1pGoMwJpeVCS7ZP/VxiwmRCqemq2DIG+fkbU1HhzUzu3BeeEqvQjGDMKxz/H34Id4O6z/BoB/9Xw9kTIqIhUDxGYQCazTwBnuLoZl9WRCm1PqEhMmlwR/aKV1bPxsoDptlyR9kG9Vg7BOeXlqnC5cmZqge8iiIPSEwH9KCPUm7OrRXa4QomWHVNtXO2cU9KsMCb2aPujjBPdqUgxR2cLpDlMMlYpZkLDt2L18uHKz66PdAHkT3cPhvgUc/hKQCRuTxidug9CdtHWLLSq54hS0e64o5PJ/Xbp6wyXuWR9tWgURZ0+Exy4MJFsua7EDgfKsCxszR1eCFRh29wWvbMRBju0wPushu+asNMamxyvntG7PMBJngOeHBX3VPVbukEAYehNPFF1KPj4VJqPSxaI/Mpyrlxokl9vHttoRArV07zIDm8jIdQRnG/RU8KV3vlGKE2Tru6h6pQZCTCll9Qsnf52U3e2TDq8AQInNgYoraI9vOyuiOGaiouCvf2y2VMJZ06XcwsAomrT2Q3itzESDhyuyuNJyC0Sfh8rv2wWggo=",
            "SELLO": "CjGJ6Uz6jWQ6wFyn8SEvRVCOCZq2sRtTAsUkLJjrs8vPSHfeEs+bMBhNnZ+7gLE5gSO+FU+IA64d+I9w98DEop24GRNDoWPxRGvX7SON4p47Ygna/rCWynyjCw8kYqRtBHxypwh0HGFLoNx+ulK+WcOXG7F3Nx2I+EPTg6jn1VvwBm1c1iat1Zgnhcna2ZJyZA3cRFOBhNONocr+qAF8zTtHSoJNYmolOlyIC9akyIPfrNl/ALgni4k1KwpEcr4HsyqVabUDW47vH5TqSNfFz+ZY3bZZZf7FLdTBn8So984+vbomWg/rP7OCBALI/u/+kIkgotm4TF/ImuGjUeKITw==",
            "RETENCIONES:EMISOR": {
                "RFCEMISOR": "CACX7605101P8",
                "NOMDENRAZSOCE": "XOCHILT CASAS CHAVEZ"
            },
            "RETENCIONES:RECEPTOR": {
                "NACIONALIDAD": "Nacional",
                "RETENCIONES:NACIONAL": {
                    "RFCRECEP": "IIA040805DZ4",
                    "NOMDENRAZSOCR": "INDUSTRIA ILUMINADORA DE ALMACENES SA DE CV"
                }
            },
            "RETENCIONES:PERIODO": {
                "MESINI": "12",
                "MESFIN": "12",
                "EJERC": "2019"
            },
            "RETENCIONES:TOTALES": {
                "MONTOTOTOPERACION": "0",
                "MONTOTOTGRAV": "0",
                "MONTOTOTEXENT": "0",
                "MONTOTOTRET": "0"
            },
            "RETENCIONES:COMPLEMENTO": {
                "PLATAFORMASTECNOLOGICAS:SERVICIOSPLATAFORMASTECNOLOGICAS": {
                    "DIFIVAENTREGADOPRESTSERV": "0.00",
                    "MONTOTSERVSIVA": "0.00",
                    "MONTOTALPORUSOPLATAFORMA": "0.00",
                    "NUMSERV": "1",
                    "PERIODICIDAD": "02",
                    "TOTALISRRETENIDO": "0.00",
                    "TOTALIVARETENIDO": "0.00",
                    "TOTALIVATRASLADADO": "0.00",
                    "VERSION": "1.0",
                    "PLATAFORMASTECNOLOGICAS:SERVICIOS": {
                        "PLATAFORMASTECNOLOGICAS:DETALLESDELSERVICIO": {
                            "FECHASERV": "2020-02-10",
                            "FORMAPAGOSERV": "02",
                            "PRECIOSERVSINIVA": "0.00",
                            "TIPODESERV": "01",
                            "PLATAFORMASTECNOLOGICAS:IMPUESTOSTRASLADADOSDELSERVICIO": {
                                "BASE": "0.00",
                                "IMPORTE": "0.00",
                                "IMPUESTO": "02",
                                "TASACUOTA": "0.160000",
                                "TIPOFACTOR": "Tasa"
                            },
                            "PLATAFORMASTECNOLOGICAS:COMISIONDELSERVICIO": {
                                "BASE": "0.00",
                                "IMPORTE": "0.00",
                                "PORCENTAJE": "0.001"
                            }
                        }
                    }
                },
                "TFD:TIMBREFISCALDIGITAL": {
                    "XMLNS:TFD": "http://www.sat.gob.mx/TimbreFiscalDigital",
                    "XMLNS:XSI": "http://www.w3.org/2001/XMLSchema-instance",
                    "XSI:SCHEMALOCATION": "http://www.sat.gob.mx/TimbreFiscalDigital http://www.sat.gob.mx/sitio_internet/cfd/timbrefiscaldigital/TimbreFiscalDigitalv11.xsd",
                    "VERSION": "1.1",
                    "UUID": "64B3CDF9-C5C4-42F0-8E94-F40FAB04DF4C",
                    "FECHATIMBRADO": "2021-02-25T22:13:01",
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
Prod   | 5f3808dafc91b2584b3107c1 | CIEC Retenciones
Sandbox | 5f2c2aacd74b837fc10602c1 | CIEC Retenciones (Sandbox)  

 [//]: # 
[syncfy-widget-docs]: <https://syncfy.com/w/en/sync/public/app/(section:docs/mx/sync-tax/widget/overview)>
[syncfy-webhook-docs]: <https://syncfy.com/w/en/sync/public/app/(section:docs/mx/sync-tax/webhooks/overview)>
[syncfy-webhook-events]: <https://syncfy.com/w/en/sync/public/app/(section:docs/mx/sync-tax/webhooks/events)>
[syncfy-post-user]: <https://syncfy.com/w/en/sync/public/app/(section:docs/mx/sync-tax/api/users)?method=POST&path=%2Fv1%2Fusers>
[syncfy-post-sesions]: <https://syncfy.com/w/en/sync/public/app/(section:docs/mx/sync-tax/api/sessions)?method=POST&path=%2Fv1%2Fsessions>
[syncfy-transactios-docs]: <https://syncfy.com/w/en/sync/public/app/(section:docs/mx/sync-tax/api/transactions)?method=GET&path=%2Fv1%2Ftransactions>
[syncfy-attachments-docs]: <https://syncfy.com/w/en/sync/public/app/(section:docs/mx/sync-tax/api/attachments)?method=GET&path=%2Fv1%2Fattachments%2F:sync_id_attachment>
[syncfy-attachments-json-docs]: <https://syncfy.com/w/en/sync/public/app/(section:docs/mx/sync-tax/api/attachments)?method=GET&path=%2Fv1%2Fattachments%2F:sync_id_attachment%2Fjson>