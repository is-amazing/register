
const express = require('express')
const app = express()
const PORT = 3000
const axios = require("axios")
const fs = require("fs")
const jsonFormat = require("json-format");
app.listen(PORT, () => console.log(`Coffee ready at ${PORT}, Caffeine ftw`))
require('dotenv').config();




app.get("/check/:subdomain", async (req, res) => {


    const response = await axios.get(`https://api.cloudflare.com/client/v4/zones/d76cdc117a7173dd501a5f212176c203/dns_records?type=CNAME&name=${req.params.subdomain}.is-really.cool`, {
    headers: {
        'X-Auth-Email': 'leejoab75@gmail.com',
        'X-Auth-Key': process.env.API_KEY,
        'Content-Type': 'application/json'
    }
    });




    if (response.data.result.length === 0) {
        res.send("available")

    } else {
        res.send("unavailable")

    }
})


app.get("/addnew", async (req, res) => {
    
    
    
    fs.promises.readdir("./domains").then(filenames => {
 
        const prefinal = JSON.stringify(filenames)
        const final = prefinal.replaceAll(".json", "");
        const finalreal = JSON.parse(final)

    })
    
    
    fs.promises.readdir("./domains")
    .then(async filenames => {

            

            const prefinal = JSON.stringify(filenames)
            const final = prefinal.replaceAll(".json", "");
            const finalreal = JSON.parse(final)


            fs.writeFile('./domains.json',jsonFormat(finalreal),function(err){
                if(err) console.log("error:" + err);

            })

              for (let filename of filenames) {

                const finalname = filename.replaceAll(".json","");

                const response = await axios.get(`https://api.is-really.cool/check/${finalname}`).then((response) => {

                    if (response.data == "unavailable"){
                        console.log(`${finalname}.is-really.cool is already present.`)
                    } else if (response.data == "available"){
                        const prefinal = JSON.stringify(filename)
                        const final = prefinal.replaceAll(".json", "");
                        const realfinal = final.replaceAll('"', '')
    
                        const filedata = fs.promises.readFile(`./domains/${filename}`)
                        .then(async function(result) {
                            const newres = JSON.parse(result)
    
                            const realresult = newres.url
                            const response = await axios.post(
                                'https://api.cloudflare.com/client/v4/zones/d76cdc117a7173dd501a5f212176c203/dns_records',
                                {
                                    'type': 'CNAME',
                                    'name': realfinal,
                                    'content': realresult,
                                    'ttl': 1,
                                    'priority': 10,
                                    'proxied': true
                                },
                                {
                                    headers: {
                                        'X-Auth-Email': 'leejoab75@gmail.com',
                                        'X-Auth-Key': process.env.API_KEY,
                                        'Content-Type': 'application/json'
                                    }
                                }
                            );

                            
                            if(response.data.success == true){
                                console.log(`${finalname}.is-really.cool has been successfully added!`)
                                
                            }
                          })
                    } 
                })




            }

    })
    res.sendStatus(200);
})



// export 'app'
module.exports = app
