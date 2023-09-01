echo "The program was started"

## variables
Name="anmol"

## to access variable use $
## read to get input
## echo $Name
## read age
## echo you age is $age



while true; 
do
  # Check if Chrome is running
  if ps | grep chrome; then
    echo "Chrome is running"
  else
    echo "Chrome is not running"
    # Launch Chrome
    google-chrome
  fi

  # Sleep for 1 second
  sleep 1
done