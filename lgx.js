'use strict';  
const superagent = require('superagent');
const colors = require('colors');
const ua = require('random-useragent');
const delay = require('delay');

async function main() {
  console.warn = () => {};
  console.log("Legion Bot")
  var reff = 'lq0WcrX'; // Kode Reff
while(true){
for (let i = 0; i < 5; i++) {

  
  function makeid(length) {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
      result += characters.charAt(Math.floor(Math.random() * 
 charactersLength));
   }
   return result;
}



/*******************Start Register****************************/

  async function getnama() {
    return new Promise((resolve, reject) => {
      superagent
        .get("https://api.randomuser.me/")
        .then((res) => {
          resolve(JSON.parse(res.text).results[0]);
        });
    });
  }
     
     let nama = getnama();
     await nama.then(function(result) {
      delay(2000);
      async function getemail() {
         return new Promise((resolve, reject) => {
           superagent
             .post("https://mob2.temp-mail.org/mailbox")
             .set({
               'Host': 'mob2.temp-mail.org',
               'Accept': 'application/json',
               'Content-Length': '0',
               'User-Agent': '3.00',
               'Connection': 'Keep-Alive'
             })
             .then((res) => {
               resolve(JSON.parse(res.text));
             });
         });
       }
      

     var gemail = getemail();
      gemail.then(function(mail) {
      delay(2000);
      let depan = result.name.first;
      let belakang = result.name.last;
      let udid = makeid(16);
      let token = mail.token;
      let email = mail.mailbox;

      
    var data = '{"password":"Asdqwe123@","email":"'+email+'","name":"'+depan+' '+belakang+'","udid":"'+udid+'","referralCode":"'+reff+'"}';

     
    
    async function newreg() {
         return new Promise((resolve, reject) => {
           superagent
             .post("https://api.legionnetwork.io/api1/user/create")
             .send(data)
             .set({
               'Host': 'api.legionnetwork.io',
               'Accept': 'application/json, text/plain, */*',
               'Content-Type': 'application/json',
               'Content-Length': data.length,
               "user-agent": ua.getRandom()
             })
             .then((res) => {
               resolve({status:'oke',msg:JSON.parse(res.text).msg});
             })
             .catch((error) => {
               reject('gagal');
             });

         });
       }
    /*******************End Register****************************/

    /*******************Start Verif****************************/

    var register = newreg();
     register.then(function(msg) {
      delay(2000);
      if (msg.status == 'oke') {
        var m = new Date((new Date().toLocaleString("en-US", "Asia/Jakarta")));
        console.log(m.getHours() + ":" + m.getMinutes() + ":" + m.getSeconds()+' | '+colors.green('[Register Sukses]')+colors.cyan('Email : ')+email)
      async function getmailbox(token) {
        return new Promise((resolve, reject) => {
          superagent
            .get("https://mob2.temp-mail.org/messages")
            .set({
              'Host': 'mob2.temp-mail.org',
              'Accept': 'application/json',
              'Content-Type': 'application/json',
              'Authorization': token,
              'User-Agent': '3.00'
            })
            .then((res) => {
              resolve(JSON.parse(res.text).messages);
            })
            .catch((error) => {
              reject('gagal');
            });

        });
      }
    

      var mailbox = getmailbox(token);
      (function getmsg(mailbox,tries = 0){ 
         mailbox.then(function(inbox) {
          
            setTimeout(function(){
              try {
                if (inbox[0] != '') {
                  let id = inbox[0]._id;
                  async function getbody(token,id) {
                    return new Promise((resolve, reject) => {
                      superagent
                        .get("https://mob2.temp-mail.org/messages/"+id)
                        .set({
                          'Host': 'mob2.temp-mail.org',
                          'Accept': 'application/json',
                          'Content-Type': 'application/json',
                          'Authorization': token,
                          'User-Agent': '3.00'
                        })
                        .then((res) => {
                          resolve(JSON.parse(res.text).bodyHtml);
                        })
                        .catch((error) => {
                          reject('gagal');
                        });
            
                    });
                  }

                  var body = getbody(token,id);

                  (function verif(body){ 
                  body.then(function(isi) {
                    var link = isi.replace(/(\r\n|\n|\r)/gm, "").split('<a href="')[2].split('">')[0];
                    superagent
                        .get(link)
                        .set({
                          'Accept': '*/*',
                          "referer": "https://mob2.temp-mail.org/messages/"+id,
                          "sec-fetch-dest": "document",
                          "sec-fetch-mode": "navigate",
                          "sec-fetch-site": "same-origin",
                          "sec-fetch-user": "?1",
                          "upgrade-insecure-requests": "1",
                          'User-Agent': ua.getRandom()
                        })
                        .buffer(false)
                        .then((res) => {
                          const urlRedirect = res.redirects.length ? res.redirects.pop() : url;
                          var tokenverif = urlRedirect.split('?token=')[1];

                          superagent
                          .get("https://api.legionnetwork.io/api1/user/verify/link?token="+tokenverif)
                          .set({
                            'Host': 'api.legionnetwork.io',
                            'Accept': 'application/json, text/plain, */*',
                            'Content-Type': 'application/json',
                            'Accept-Language': 'en-US,en;q=0.9',
                            "user-agent": ua.getRandom()
                          })
                          .then((res) => {
                            let msg = res.text;
                            if (msg.search("Verified") != -1) {
                              var m = new Date((new Date().toLocaleString("en-US", "Asia/Jakarta")));
                              console.log(m.getHours() + ":" + m.getMinutes() + ":" + m.getSeconds()+' | '+colors.green('[Verif Sukses]')+colors.cyan(' Email : ')+email)
                            }
                          })
                          .catch((error) => {
                            var m = new Date((new Date().toLocaleString("en-US", "Asia/Jakarta")));
                              console.log(m.getHours() + ":" + m.getMinutes() + ":" + m.getSeconds()+' | '+colors.yellow('[Retry Verif]')+colors.cyan(' Email : ')+email)
                            verif(body)
                          });


                          
                        }).catch((error) => {
                          var m = new Date((new Date().toLocaleString("en-US", "Asia/Jakarta")));
                          console.log(m.getHours() + ":" + m.getMinutes() + ":" + m.getSeconds()+' | '+colors.red('[Verif Error]')+colors.cyan('Email : ')+email)
                        });

                  })
                })(body)

                }
              } catch (error) {
                if (tries == 10) {
                  var m = new Date((new Date().toLocaleString("en-US", "Asia/Jakarta")));
                  console.log(m.getHours() + ":" + m.getMinutes() + ":" + m.getSeconds()+' | '+colors.red('[Gagal Get Inbox]')+colors.cyan('Email : ')+email)
                  return;
                }
                tries++;
                getmsg(mailbox,tries);
              }
              
            }, 2000);
          
        })//list inbox
    })(mailbox);


    }else{
      var m = new Date((new Date().toLocaleString("en-US", "Asia/Jakarta")));
      console.log(m.getHours() + ":" + m.getMinutes() + ":" + m.getSeconds()+' | '+colors.red('[Register Gagal]')+colors.cyan('Email : ')+email);
    }
  

    }).catch((message) => { 
        var m = new Date((new Date().toLocaleString("en-US", "Asia/Jakarta")));
        console.log(m.getHours() + ":" + m.getMinutes() + ":" + m.getSeconds()+' | '+colors.red('[Register Gagal]')+colors.cyan('Email : ')+email);
    });



  }).catch((message) => { 
    
})
}).catch((message) => { 
  
})

}   
}    
}    

main();
