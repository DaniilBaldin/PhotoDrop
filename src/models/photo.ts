import db from '../utils/databaseConnect';

const photo = class Photo {
    photo_id: string;
    photo_logo: string;
    client_name: string;
    photo_url: string;
    album_id: string;
    marked_url: string;
    marked_logo: string;
    constructor(
        photo_id: string,
        photo_logo: string,
        client_name: string,
        photo_url: string,
        album_id: string,
        marked_url: string,
        marked_logo: string
    ) {
        this.photo_id = photo_id;
        this.photo_logo = photo_logo;
        this.client_name = client_name;
        this.photo_url = photo_url;
        this.album_id = album_id;
        this.marked_url = marked_url;
        this.marked_logo = marked_logo;
    }

    static save(
        photo_logo: string,
        client_name: string,
        photo_url: string,
        album_id: number,
        marked_url: string,
        marked_logo: string
    ) {
        return db.execute(
            'INSERT INTO photo (photo_logo, client_name, photo_url, album_id, marked_url, marked_logo) VALUES (?, ?, ?, ?, ?, ?)',
            [photo_logo, client_name, photo_url, album_id, marked_url, marked_logo]
        );
    }

    static getPhotos(album_id: string) {
        return db.execute(`SELECT * FROM photo WHERE photo.album_id = ?`, [album_id]);
    }

    static getPhotoById(photo_id: string) {
        return db.execute(`SELECT * FROM photo WHERE photo.id = ?`, [photo_id]);
    }
};

export default photo;
