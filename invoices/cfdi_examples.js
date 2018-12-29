"use strict";

exports.payroll_payment = {
    "Version" : "3.3",
    "Serie" : "A",
    "Folio" : "FOLIO",
    "Fecha" : new Date().toISOString().substr(0,19),
    "FormaPago" : "99",
    "SubTotal" : "10000",
    "Descuento" : "1800",
    "Moneda" : "MXN",
    "Total" : "8200",
    "TipoDeComprobante" : "N",
    "MetodoPago" : "PUE",
    "LugarExpedicion" : "04300",
    "Emisor" : {
        "Rfc" : "",
        "Nombre" : "",
        "RegimenFiscal" : "612"
    },
    "Receptor" : {
        "Rfc" : "PERJ830701L89",
        "Nombre" : "JUAN PEREZ RODRIGUEZ",
        "UsoCFDI" : "P01"
    },
    "Conceptos" : {
        "Concepto" : [ 
            {
                "Concepto" : {
                    "ClaveProdServ" : "84111505",
                    "Cantidad" : "1",
                    "ClaveUnidad" : "ACT",
                    "Descripcion" : "Pago de nómina",
                    "ValorUnitario" : "10000",
                    "Importe" : "10000",
                    "Descuento" : "1800"
                }
            }
        ]
    },
    "Complemento" : {
        "Nomina" : {
            "Version" : "1.2",
            "TipoNomina" : "O",
            "FechaPago" : "2018-01-31",
            "FechaInicialPago" : "2018-01-16",
            "FechaFinalPago" : "2018-01-31",
            "NumDiasPagados" : "15",
            "TotalPercepciones" : "23874.16",
            "TotalDeducciones" : "8726.76",
            "Receptor" : {
                "Curp" : "PERJ83070MCLGRN06",
                "FechaInicioRelLaboral" : "",
                "TipoContrato" : "01",
                "Sindicalizado" : "Sí",
                "TipoJornada" : "01",
                "TipoRegimen" : "02",
                "NumEmpleado" : "004",
                "Puesto" : "",
                "RiesgoPuesto" : "1",
                "PeriodicidadPago" : "04",
                "Banco" : "044",
                "CuentaBancaria" : "",
                "ClaveEntFed" : "COA"
            },
            "Percepciones" : {
                "TotalSueldos" : "10000",
                "TotalGravado" : "10000",
                "TotalExento" : "0.00",
                "Percepcion" : [ 
                    {
                        "Percepcion" : {
                            "TipoPercepcion" : "001",
                            "Clave" : "001",
                            "Concepto" : "SUELDO PLAZA INTEGRADO",
                            "ImporteGravado" : "10000",
                            "ImporteExento" : "0.00"
                        }
                    }
                ]
            },
            "Deducciones" : {
                "TotalOtrasDeducciones" : "0.00",
                "TotalImpuestosRetenidos" : "1800",
                "Deduccion" : [ 
                    {
                        "Deduccion" : {
                            "TipoDeduccion" : "002",
                            "Clave" : "053",
                            "Concepto" : "I.S.R.",
                            "Importe" : "1800"
                        }
                    }
                ]
            }
        }
    }
}