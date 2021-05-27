import { FirebaseApp } from './firebaseApp';
import  { eventConverter } from  './Event';
import{getUser} from './user';
import { newId } from './logic/random';
interface Placesdata{
  name:string
  lat:number
  lng:number

}
interface Userdata{
  Name:string
  Email: string
  Mobno:string
  Role: string
  Licno:string
  Vehno:string

}
export async function loadThings() {
  const col = await FirebaseApp.firestore().collection("places");
  const docs = await col.orderBy('name').limit(25).withConverter(eventConverter).get();

  return docs.docs.map(doc => doc.data());
}

export async function loadPlaces(destination:string ) {

  const col = <Placesdata>await FirebaseApp.firestore()
  .collection("places")
  .doc(destination)
  .get()
  .then((doc) => {
    if (!doc.exists) {
      // doc.data() will be undefined in this case
      console.log("No such document!");
      return null;
    }
    // const data1=JSON.stringify(data);
    //console.log("Document data:", doc.data());
    return doc.data();
  })
  .catch((error) => {
    console.log("Error getting document:", error);
  });

return col;
  
}
export async function setAvailability(availability:boolean) {
  const user= await getUser();
  let random:string |undefined = newId();
  if(availability==false){
    random=user?.uid;
  }

  if(user){
  const col = await FirebaseApp.firestore()
  .collection("users")
  .doc(user.uid)
  .update({
    IsAvailable: availability,
    RandomId: random
});
  return col;
  }
  
}