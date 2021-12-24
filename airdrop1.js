const fetch = require('node-fetch');
const randomstring = require('randomstring');
const readline = require("readline-sync");
const cheerio = require('cheerio');
const chalk = require('chalk');
const delay = require('delay');
const fs = require('fs');
var request = require('request');
 
const bikinangka = length =>
    new Promise((resolve, reject) => {
        var text = "";
        var possible =
            "123456789";
 
        for (var i = 0; i < length; i++)
            text += possible.charAt(Math.floor(Math.random() * possible.length));
 
        resolve(text);
    });
 
const bikinnama = () => new Promise((resolve, reject) => {
    fetch('https://www.fakenamegenerator.com/', {
        method: 'GET'
    })
    .then(res => res.text())
    .then(result => {
        const $ = cheerio.load(result);
        const resText = $('#details > div.content > div.info > div > div.address > h3').text();
        resolve(resText);
    })
    .catch(err => {
        reject(err)
    })
}); 
 
const gettokenOTP = (device, nomor) => new Promise((resolve, reject) => {
    fetch('https://apac2-auth-api.capillarytech.com/auth/v1/token/generate', {
    method: 'POST',
    headers: {
        'Accept': 'application/json',
        'cap_brand': 'SHELLINDONESIALIVE',
        'cap_device_id': device,
        'Content-Type': 'application/json; charset=UTF-8',
        'Content-Length': 91,
        'Host': 'apac2-auth-api.capillarytech.com',
        'Connection': 'Keep-Alive',
        'Accept-Encoding': 'gzip',
        'User-Agent': 'okhttp/3.14.9'
    },
    body: JSON.stringify({"brand":"SHELLINDONESIALIVE","deviceId":device,"mobile":nomor})
})
    .then(res => res.json())
    .then(res => {
        resolve(res)
    })
    .catch(err => reject(err))
});
 
const getOTP = (sessionId, device, nomor, nomorspasi) => new Promise((resolve, reject) => {
    fetch('https://apac2-auth-api.capillarytech.com/auth/v1/otp/generate', {
    method: 'POST',
    headers: {
        'Accept': 'application/json',
        'cap_brand': 'SHELLINDONESIALIVE',
        'cap_device_id': device,
        'Content-Type': 'application/json; charset=UTF-8',
        'Content-Length': 176,
        'Host': 'apac2-auth-api.capillarytech.com',
        'Connection': 'Keep-Alive',
        'Accept-Encoding': 'gzip',
        'User-Agent': 'okhttp/3.14.9'
    },
    body: JSON.stringify({
        "brand":"SHELLINDONESIALIVE",
        "deviceId":device,
        "mobile":nomor,
        "mobile_temp":nomorspasi,
        "sessionId":sessionId
    })
})
    .then(res => res.json())
    .then(res => {
        resolve(res)
    })
    .catch(err => reject(err))
});
 
const inputOTP = (sessionId, otp, device, nomor, nomorspasi) => new Promise((resolve, reject) => {
    fetch('https://apac2-auth-api.capillarytech.com/auth/v1/otp/validate', {
    method: 'POST',
    headers: {
        'Accept': 'application/json',
        'cap_brand': 'SHELLINDONESIALIVE',
        'cap_device_id': device,
        'Content-Type': 'application/json; charset=UTF-8',
        'Content-Length': 176,
        'Host': 'apac2-auth-api.capillarytech.com',
        'Connection': 'Keep-Alive',
        'Accept-Encoding': 'gzip',
        'User-Agent': 'okhttp/3.14.9'
    },
    body: JSON.stringify({
        "brand":"SHELLINDONESIALIVE",
        "deviceId":device,
        "mobile":nomor,
        "mobile_temp":nomorspasi,
        "otp":otp,
        "sessionId":sessionId
    })
})
    .then(res => res.json())
    .then(res => {
        resolve(res)
    })
    .catch(err => reject(err))
});
 
const register = (device, nomor, token, email, nama1, nama2) => new Promise((resolve, reject) => {
    fetch('https://apac2-api-gateway.capillarytech.com/mobile/v2/api/v2/customers', {
    method: 'POST',
    headers: {
        'Accept': 'application/json',
        'cap_authorization': token,
        'cap_brand': 'SHELLINDONESIALIVE',
        'cap_device_id': device,
        'cap_mobile': nomor,
        'Content-Type': 'application/json; charset=UTF-8',
        'Content-Length': 471,
        'Host': 'apac2-auth-api.capillarytech.com',
        'Connection': 'Keep-Alive',
        'Accept-Encoding': 'gzip',
        'User-Agent': 'okhttp/3.14.9'
    },
    body: JSON.stringify({
        "extendedFields":{
            "acquisition_channel":"mobileApp",
            "dob":"1999/05/08","verification_status":"false"
            },
        "loyaltyInfo":{
            "loyaltyType":"loyalty"
            },
        "profiles":[{
            "fields":{
                "onboarding":"pending",
                "app_privacy_policy":"1",
                "goplus_tnc":"1"
                },
            "firstName":nama1,
            "identifiers":[{
                "type":"mobile",
                "value":nomor},{"type":"email","value":email}],"lastName":nama2}],"referralCode":"171vx30aj","statusLabel":"Active",
        "statusLabelReason":"App Registration"})
})
    .then(res => res.json())
    .then(res => {
        resolve(res)
    })
    .catch(err => reject(err))
});
 
 
 
(async () => {
console.log(chalk.yellow('\n- - - Shell Asia - - - '));
while(true){
    try{
        const angka = await bikinangka(4);
        const namanya1 = await bikinnama();
        const namanya2 = namanya1.split(" ");
        const nama1 = namanya2[0]
        const nama2 = namanya2[2]
        const email = `${nama1}${nama2}${angka}@gmail.com`
        const crypto = require("crypto");
        const device = crypto.randomBytes(22).toString("hex")     
        const nomor1 = readline.question(chalk.yellow('\n[-] Nomor : '));
        const nomor = `62${nomor1}`
        const nomorspasi = `+62 ${nomor1}`
        const getdata = await gettokenOTP(device, nomor)
        if (getdata.status.success === true) {
            console.log(chalk.yellow(`[-] Getting SessionId . . .`))
            await delay(2000)
            const sessionId = getdata.user.sessionId
            const sendOTP = await getOTP(sessionId, device, nomor, nomorspasi)
            if (sendOTP.status.success === true) {
                console.log(chalk.yellow(`[-] Sending OTP . . .`))
                const otp = await readline.question(chalk.yellow('[-] OTP : '));
                const inputtOTP = await inputOTP(sessionId, otp, device, nomor, nomorspasi)
                if (inputtOTP.status.success === true) {
                    await delay(2000)
                    const token = inputtOTP.auth.token
                    const register1 = await register(device, nomor, token, email, nama2, nama1)
                    console.log(register1)
                }
                else{
                    console.log(chalk.red(`[!] Error . . . ${inputtOTP.status.message}`))
                }
            }
            else{
                console.log(chalk.red(`[!] Error . . . ${sendOTP.status.message}`))
            }
        }
        else{
            console.log(chalk.red(`[!] Error . . . ${getdata.status.message}`))
        }
}catch(e){
        console.log(e)
    }
}
})();
