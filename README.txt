# PhotoDrop

Service for exchange photos between photographer and client based on AWS S3 service.

// method: POST - https://photodrop-app-1.herokuapp.com/signup - Create new admin user.
{
  "login": "test",
  "password": "password"
}

// method: POST - https://photodrop-app-1.herokuapp.com/login - Login admin user.
{
  "login": "test",
  "password": "password"
}

                ALBUMS

// method: POST - https://photodrop-app-1.herokuapp.com/album 
    Create new album. Admin must be authorized.

// method: GET - https://photodrop-app-1.herokuapp.com/albums 
    Get all albums in JSON format. Admin must be authorized. 

// method: GET - https://photodrop-app-1.herokuapp.com/albums/<album_id> 
    Get album by album id in JSON format. Admin must be authorized. Id in params.
    
    
                PHOTO    

// method: POST - https://photodrop-app-1.herokuapp.com/photo 
    Upload photo. Admin must be authorized. 

// method: POST - https://photodrop-app-1.herokuapp.com/photos 
    Upload multiple photos. Admin must be authorized.      

// method: GET - https://photodrop-app-1.herokuapp.com/photos/:id 
    Get photos by album_id. Admin must be authorized. Id in params.

// method: GET - https://photodrop-app-1.herokuapp.com/photo 
    Get photo by photo_id. Admin must be authorized.
    Id in request body({
    "photo_id": "31"
})


                CLIENT    
 

// method: GET - https://photodrop-app-1.herokuapp.com/clients 
    Get all clients. Admin must be authorized.
