
import React, { Component, useState } from 'react';
import HomeView from './HomeView';
import { Capacitor, Plugins, CallbackID } from "@capacitor/core";
import LocationService from './Location';
import {} from 'google-map-react';
import { NativeGeocoder, NativeGeocoderResult, NativeGeocoderOptions } from '@ionic-native/native-geocoder/ngx';
import  axios from 'axios';

const { Geolocation, Toast } = Plugins;

class Home extends Component {
    state: any;
    watchId: CallbackID = '';
    constructor(props: any) {
        super(props);
        this.state = {
            center: {
                lat: 12.934485599999999,
                lng: 77.6192336,
            },
            latitude: 18.934485599999999,
            longitude: 87.6192336,
            loading: false,
            locate:{},
            errormsg:''
        };
    }
    
    checkPermissions = async () => {
        const hasPermission = await LocationService.checkGPSPermission();
        if (hasPermission) {
            if (Capacitor.isNative) {
                const canUseGPS = await LocationService.askToTurnOnGPS();
                this.postGPSPermission(canUseGPS);
            }
            else {
                this.postGPSPermission(true);
            }
        }
        else {
            console.log('14');
            const permission = await LocationService.requestGPSPermission();
            if (permission === 'CAN_REQUEST' || permission === 'GOT_PERMISSION') {
                if (Capacitor.isNative) {
                    const canUseGPS = await LocationService.askToTurnOnGPS();
                    this.postGPSPermission(canUseGPS);
                }
                else {
                    this.postGPSPermission(true);
                }
            }
            else {
                await Toast.show({
                    text: 'User denied location permission'
                })
            }
        }
    }

    postGPSPermission = async (canUseGPS: boolean) => {
        if (canUseGPS) {
            this.watchPosition();
        }
        else {
            await Toast.show({
                text: 'Please turn on GPS to get location'
            })
        }
    }

    watchPosition = async () => {
        try {
            this.setState({
                loading: true
            })
            this.watchId = Geolocation.watchPosition({}, (position, err) => {
                
                if (err) {
                    return;
                }
                this.setState({
                    center: {
                        lat: position.coords.latitude,
                        lng: position.coords.longitude,
                    },
                    loading: false
                }, () => {
                    this.reversegeo();
                    this.clearWatch();
                })
            })
        }
        catch (err) { console.log('err', err) }
    }
    
    clearWatch() {
        if (this.watchId != null) {
            Geolocation.clearWatch({ id: this.watchId });
            
            
        }
        this.setState({
            loading: false
        })

        
        //    const map = new google.maps.Map(document.getElementById("map") as HTMLElement,);
        //    const geocoder = new google.maps.Geocoder();
        //    const infowindow = new google.maps.InfoWindow();
        //     this.geocodeLatLng(geocoder,map,infowindow)
        
    // }
    //  geocodeLatLng(
        
    //     geocoder: google.maps.Geocoder,
    //     map: google.maps.Map,
    //     infowindow: google.maps.InfoWindow
    //   ) {
        //     const { center } = this.state
    //     const latitude=center.lat
    //     const longitude=center.lng ;
      
    //     const latlng = {
    //       lat: parseFloat(latitude[0]),
    //       lng: parseFloat(longitude[1]),
    //     };
    
    //     geocoder.geocode(
        //       { location: latlng },
        //       ()=>(
            //         results: google.maps.GeocoderResult[],
            //         status: google.maps.GeocoderStatus
            //       ) => {console.log("here");
            //         if (status === "OK") {
                //           if (results[0]) {
    //             console.log(results)
    //             }
    
            
    //            else {
        //             window.alert("No results found");
        //           }
        //         } else {
            //           window.alert("Geocoder failed due to: " + status);
            //           console.log(status)
            //         }
            //       }
            //     );
        }
        reversegeo= async() =>{

            const { center, loading } = this.state
            let lati=center.lat;
            let longi=center.lng
  
            // GET request using axios with error handling
           const dat= await axios.get(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lati}&longitude=${longi}&localityLanguage=en`)
            .then(response=> {this.setState({locate:response.data});
            console.log(this.state.locate);
      }
      )
       .catch(error => {
          this.setState({ errormsg: error.message });
          console.error('There was an error!', error);
      });
  
  }

    render() {
        const { center, loading ,locate} = this.state
        return (
            <HomeView
                center={center}
                latitude={center.lat}
                longitude={center.lng}
                getGeoLocation={this.checkPermissions}
                loading={loading}
                locate={locate.locality}
            />
        );
    }
}

export default Home;
