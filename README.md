# measurements-microservice

## Json Fields:
```
{
    time,
    temperature,
    humidity,
    serialNumber
}
```

## Routes
- Get all: `http://localhost:3000/api/measurements/`
- Get by unix timestamp: `http://157.245.65.94:3000/api/measurements/<unix_timestamp`
- Get custom number of entries: `http://157.245.65.94:3000/api/measurements/period/<NUMBER_OF_ENTRIES`
- Add new data: `http://157.245.65.94:3000/api/measurements` with json format:
```
{
    "time": 1621840215,
    "temperature": 45.24895,
    "humidity": 31.964598,
    "serialNumber": 995346
}

```

## Testing

For Testing the routes, open **POSTMAN** and import [this file](/testing/measurements-cloud.postman_collection.json).  
