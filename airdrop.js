const fetch = require('node-fetch');
const randomstring = require('randomstring');
const readline = require("readline-sync");


const sendOTP = (yhh, uname) => new Promise((resolve, reject) => {
    fetch('https://live.digitap.eu/v2/account/authenticate/email?create=true&', {
    method: 'POST',
    headers: {
        'Accept': 'application/json',
        'Referer': 'https://wam.app/',
        'User-Agent': 'Mozilla/5.0 (Linux; Android 5.0; SM-G900P Build/LRX21T) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.110 Mobile Safari/537.36',
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({"email":yhh,"password":"anok123321","vars":{"ua":"\"Mozilla/5.0 (Linux; Android 5.0; SM-G900P Build/LRX21T) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.110 Mobile Safari/537.36\"","location":"{\"code\":\"ID\",\"name\":\"Indonesia\"}","cookie_consent":null,"invite":uname,"utm_medium":"Invite","utm_source":"Screen","utm_campaign":`@${uname}`}})
})
    .then(res => res.json())
    .then(res => {
        resolve(res)
    })
    .catch(err => reject(err))
});



(async () => {
    var uname =  readline.question('uname : ')
    var total =  readline.question('jumlah : ')
    console.log('\n')
for(i = 0; i<total; i++){
     var nama  = randomstring.generate({length: 9,charset: 'abcdefghijklmnopqrstuvwxyz1234567890'})
      var yhh = `${nama}@yahaha.hayuk`
      console.log(yhh)
try{
    const rOTP = await sendOTP(yhh, uname)
    console.log(rOTP)
}catch(e){
        console.log(e)
    }
}
})();