import db from '../utils/databaseConnect';

const photo = class Photo {
    photo_id: string;
    client_name: string;
    phone_number: string;
    constructor(photo_id: string, photo_logo: string, photo_name: string) {
        this.photo_id = photo_id;
        this.client_name = photo_logo;
        this.phone_number = photo_name;
    }

    static save(photo_id: string, client_name: string, phone_number: string) {
        return db.execute('INSERT INTO photo (photo_logo, photo_name, photo_url, album_id) VALUES (?, ?, ?, ?)', [
            photo_id,
            client_name,
            phone_number,
        ]);
    }

    static getPhotos(album_id: string) {
        return db.execute(`SELECT * FROM photo WHERE photo.album_id = ?`, [album_id]);
    }

    static getPhotoById(photo_id: string) {
        return db.execute(`SELECT * FROM photo WHERE photo.id = ?`, [photo_id]);
    }
};

export default photo;
