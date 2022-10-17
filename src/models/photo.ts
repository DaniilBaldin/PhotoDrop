import db from '../utils/databaseConnect';

const photo = class Photo {
    photo_id: string;
    photo_logo: string;
    photo_name: string;
    photo_url: string;
    album_id: string;
    date: string;
    constructor(
        photo_id: string,
        photo_logo: string,
        photo_name: string,
        photo_url: string,
        album_id: string,
        date: string
    ) {
        this.photo_id = photo_id;
        this.photo_logo = photo_logo;
        this.photo_name = photo_name;
        this.photo_url = photo_url;
        this.album_id = album_id;
        this.date = date;
    }

    static saveAlbum(photo_logo: string, photo_name: string, photo_url: string, album_id: number) {
        return db.execute('INSERT INTO photo (photo_logo, photo_name, photo_url, album_id) VALUES (?, ?, ?, ?)', [
            photo_logo,
            photo_name,
            photo_url,
            album_id,
        ]);
    }

    static getAlbums() {
        return db.execute(`SELECT * FROM albums`);
    }

    static getAlbumsByUser(album_user: string) {
        return db.execute(`SELECT * FROM albums WHERE albums.album_user = ?`, [album_user]);
    }

    static getAlbumById(album_id: string) {
        return db.execute(`SELECT * FROM albums WHERE albums.album_id = ?`, [album_id]);
    }

    static deleteAlbumById(album_id: string) {
        return db.execute(`DELETE FROM albums WHERE albums.album_id = ?`, [album_id]);
    }

    static getPhotos() {
        return db.execute(`SELECT photo_id, photo_url FROM albums `);
    }

    static getPhotosByUser(album_user: string) {
        return db.execute(`SELECT photo_id, photo_url FROM albums WHERE albums.album_user = ?`, [album_user]);
    }

    static getPhotoById(photo_id: string) {
        return db.execute(`SELECT photo_url FROM albums WHERE albums.photo_id = ?`, [photo_id]);
    }

    static deletePhotoById(photo_id: string) {
        return db.execute(`DELETE FROM albums WHERE albums.photo_id = ?`, [photo_id]);
    }
};

export default photo;
