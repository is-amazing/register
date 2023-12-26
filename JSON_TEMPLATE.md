## Template for json file under domains folder

Please follow the template given here or your pull request will not be accepted or merged.

### IMPORTANT: Please name your JSON file the subdomain you wish to have. If your subdomain in the JSON file does not match the file name, your PR will NOT be merged. Also please do **NOT** have a comma after your email, as it will cause internal server errors. Please do not add any line breaks in your json. 

## To add define which record you want to add, add the type field to the json. Currently supported records: CNAME, A, TXT, MX

** For MX records, you do not need to put in priority, as it is preset in the system.
** For TXT records, put your contents into the url field

## Template:
```
{  
    "subdomain": "YOUR_SUBDOMAIN_HERE",  
    "url":  "YOUR_SITE_URL_HERE",
    "email": "YOUR_EMAIL_HERE",
    "type": "YOUR_TYPE_HERE"
}
```

## Example:
```
{  
    "subdomain": "joabutt",  
    "url":  "joabutt.dev",
    "email": "me@joabutt.dev",
    "type": "CNAME"
}
```
