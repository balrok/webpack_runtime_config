Test the sample application:

* docker build -t frontend .
* docker run -p3000:3000 -t frontend
* or: docker run -e"REACT_APP_VAR1=var1.run" -e "REACT_APP_VAR2=var2.run" -p3000:3000 -t frontend
