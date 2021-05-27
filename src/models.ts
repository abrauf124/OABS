/**
 * User data contains extra fields for users
 * since Firebase only supports limited built-in 
 * user data.
 */
export interface UserData {
  Role: string;
}

export interface Placesdata {
  name: string;
  lat: number;
  lng: number;
}
export interface DriverUserdata{
  Name:string
  Email: string
  Mobno:string
  Role: string
  Licno:string
  Vehno:string
  IsAvailable: boolean
  IsBooked: boolean
  RandomId: string
  Id:string



}