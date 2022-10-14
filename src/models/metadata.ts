import db from '../utils/databaseConnect';

const metadata = class Metadata {
    photo_id: string;
    album_id: string;
    album_user: string;
    photo_url: string;
    date: string;
    constructor(photo_id: string, album_id: string, album_user: string, photo_url: string, date: string) {
        this.photo_id = photo_id;
        this.album_id = album_id;
        this.album_user = album_user;
        this.photo_url = photo_url;
        this.date = date;
    }

    save() {
        return db.execute(
            'INSERT INTO albums (photo_id, album_id, album_user, photo_url, date) VALUES (?, ?, ?, ?, ?)',
            [this.photo_id, this.album_id, this.album_user, this.photo_url, this.date]
        );
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

export default metadata;
