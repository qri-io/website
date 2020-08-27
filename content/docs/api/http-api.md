---
metaTitle: 'Qri HTTP API'
metaDescription: 'Documentation for Qri’s HTTP API'

---
<!--

To edit the API documentation, edit:
https://github.com/qri-io/qri/blob/master/api/open_api_3.yaml

To update the API documentation that displays on the website, run the script in:
https://github.com/qri-io/website/blob/master/scripts/update_http_api.sh

-->

import Rapidoc from '../../../src/components/Rapidoc.js'

### Starting the API locally

`qri connect` is configured to start the API server on port `2503` by default:

```
$ qri connect

📡  Success! You are now connected to the d.web. Here's your connection details:

peername:	yourlocalinstance
profileID:	QmSq3tznbKw3YtTdzujrcHaM98rhUZgJCXdk8cpCbVKChC
API address:	/ip4/127.0.0.1/tcp/2503
...
```

### Testing your local connection with curl

```
$ curl -X GET "http://localhost:2503/me" \
   -H "Accept: application/json"
{"data":{"id":"QmSq3tznbKw3YtTdzujrcHaM98rhUZgJCXdk8cpCbVKChC","peername":"yourlocalinstance","created":"2020-08-13T16:49:44.639492362-07:00","updated":"2020-08-13T16:49:44.639492362-07:00","type":"peer","email":"","name":"","description":"","homeurl":"","color":"","thumb":"","photo":"","poster":"","twitter":"","online":true,"peerIDs":["/ipfs/QmQfkkqjyct1AUUFaD3G4yQfuAW2PtJAoo3XmpSee2JTRm"]},"meta":{"code":200}}
```

<Rapidoc />



