# OABS

A ride booking PWA built using Ionic 5 in React as the frontend and Firebase cloud firestore as the backend. It consists of two users(Passenger and Driver)and the real-time status updates are shown to the users using
Firestore’s onSnapshot method and react useEffect hook. The project used Capacitor’s native plugin APIs like Geolocation to access and turn on GPS, fetch location of the device and Storage to store lightweight data. 
Map implemented using Google Maps Javascript API and a free Reverse Geo-coding API. Axios is used to send https requests to the Reverse Geo-coding API. It is deployed to the web by hosting in Firebase.
