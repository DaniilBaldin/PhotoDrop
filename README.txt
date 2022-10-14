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

// method: POST - https://photodrop-app-1.herokuapp.com/albums 
    Returns all albums, owned by user in JSON format. Admin must be authorized. 
    Return albums based on album user({"user": "user"} in JSON body(example)).

// method: GET - https://photodrop-app-1.herokuapp.com/albums/<album_id> 
    Get album by album id in JSON format. Admin must be authorized. 
    Return album data in JSON format(id, photo_id, album_id, album_user, photo_url, date)).

// method: DELETE - https://photodrop-app-1.herokuapp.com/albums/<album_id> 
    Delete album by album id. Also deletes album from AWS S3. Admin must be authorized. 
    
    
                PHOTO    

// method: GET - https://photodrop-app-1.herokuapp.com/upload 
    Opens upload page. For now works without authorization(Later will be added auth.). Amount of images is not limited.

// method: GET - https://photodrop-app-1.herokuapp.com/photos 
    Get all photos in JSON format(photo_id, photo_url). Admin must be authorized. 

// method: POST - https://photodrop-app-1.herokuapp.com/photo 
    Returns all photos, owned by user in JSON format(photo_id, photo_url). Admin must be authorized. 
    Return photos based on album user({"user": "user"} in JSON body(example)).

// method: GET - https://photodrop-app-1.herokuapp.com/photos/<photo_id> 
    Get photo url, based on photo_id. Admin must be authorized. 
    Return photo_url in JSON format(photo_url)).

// method: DELETE - https://photodrop-app-1.herokuapp.com/photos/<photo_id> 
    Delete photo by photo id. Also deletes photo from AWS S3. Admin must be authorized.         
