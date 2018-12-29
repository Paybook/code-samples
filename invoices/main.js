"use strict";

const request = require('request');
const fs = require('fs');
const CFDI_EXAMPLES = require('./cfdi_examples.js');

const API_KEY = process.env.SYNC_API_KEY_SANDBOX;

var enconde_file = function(filepath){
	return new Promise(function(resolve,reject){
		try{
			const file_buffer = fs.readFileSync(filepath);
			const contents_base64 = file_buffer.toString('base64');
			resolve(contents_base64);
		}catch(error){
			reject(error);
		}
	})
}

var create_user = function(name,id_external){
	return new Promise(function(resolve,reject){
		try{
			var endpoint = "users";
			var url = "https://sync.paybook.com/v1/" + endpoint;

			var options = {
				url : url,
				json : {
					name : name,
					id_external : id_external
				},
				headers: {
					'Content-type': 'application/json',
					'Authorization': 'API_KEY api_key=' + API_KEY
				}
			};
			request.post(options, function(error, response, body){
				if(error){
					reject(error);
					return
				}
				if(body.code != 200){
					reject(body);
					return
				}
				resolve(body.response);
			});
		}catch(error){
			reject(error);
		}
	});
}

var create_taxpayer = function(id_user,taxpayer,es_CSD){
	return new Promise(async function(resolve,reject){
		try{
			var endpoint = "invoicing/mx/taxpayers";
			var url = "https://sync.paybook.com/v1/" + endpoint;

			var options = {
				url : url,
				json : {
					id_user : id_user,
					taxpayer : taxpayer,
					cer : await enconde_file(es_CSD.cer),
					key : await enconde_file(es_CSD.key),
					password : es_CSD.password
				},
				headers: {
					'Content-type': 'application/json',
					'Authorization': 'API_KEY api_key=' + API_KEY
				}
			};
			request.post(options, function(error, response, body){
				if(error){
					reject(error);
					return
				}
				if(body.code != 200){
					reject(body);
					return
				}
				resolve(body.response);
			});
		}catch(error){
			reject(error);
		}
	});
}

var stamp_invoice = function(id_user,es_RFC,es_razon_social){
	return new Promise(async function(resolve,reject){
		try{
			var endpoint = "invoicing/mx/invoices";
			var url = "https://sync.paybook.com/v1/" + endpoint;

			var invoice_data = CFDI_EXAMPLES.payroll_payment;
			invoice_data.Emisor.Rfc = es_RFC;
			invoice_data.Emisor.Nombre = es_razon_social;

			var options = {
				url : url,
				json : {
					id_user : id_user,
					id_provider : 'acme',
					invoice_data : invoice_data,
				},
				headers: {
					'Content-type': 'application/json',
					'Authorization': 'API_KEY api_key=' + API_KEY
				}
			};
			request.post(options, function(error, response, body){
				if(error){
					reject(error);
					return
				}
				if(body.code != 200){
					reject(body);
					return
				}
				resolve(body.response);
			});
		}catch(error){
			reject(error);
		}
	});
}



async function main(){
	try{
		const es_razon_social = "ACCEM SERVICIOS EMPRESARIALES";
		const es_RFC = "AAA010101AAA";
		const es_CSD = {
			cer : "./CSD/CSD01_AAA010101AAA.cer",
			key : "./CSD/CSD01_AAA010101AAA.key",
			password : "12345678a"
		}

		//++++++++++++++++++++++++++ ESTE PROCESO SÓLO SE HACE UNA VEZ ++++++++++++++++++++++++++
		var user = await create_user(es_razon_social,es_RFC);
		var taxpayer = await create_taxpayer(user.id_user,es_RFC,es_CSD);
		//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
	
		var stamp_payroll_payment = await stamp_invoice(user.id_user,es_RFC,es_razon_social);		
		fs.writeFileSync(stamp_payroll_payment.uuid + ".xml", stamp_payroll_payment.xml, 'utf8');

		process.exit();
	}catch(error){
		console.log("Error");
		console.log(error);
		process.exit();
	}
}


main();