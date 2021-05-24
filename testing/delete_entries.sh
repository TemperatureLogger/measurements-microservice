for i in `seq 1000` do 
curl -X "DELETE" "http://157.245.65.94:3000/api/measurements/2" --head http://157.245.65.94:3000/api/measurements/2
done