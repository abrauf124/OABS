export class Event {
    constructor(
    public id: string,
      public name: string,
      public lat:number,
      public lng:number
    ){}
  }
  
  export const eventConverter = {
    toFirestore: function (event: Event) {
      return {
        // id: event.id,  // Note! Not in ".data()" of the model!
        name: event.name,
        lat: event.lat,
        lng: event.lng
      
      }
    },
    fromFirestore: function (snapshot: any, options: any) {
      const data = snapshot.data(options)
      const id = snapshot.id
      return new Event(id, data.name, data.lat,data.lat)
    }
  }
  