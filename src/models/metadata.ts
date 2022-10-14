import db from '../utils/databaseConnect';

const metadata = class Metadata {
    person_id: number;
    photo_id: string;
    album_id: string;
    album_name: string;
    album_location: string;
    album_user: string;
    photo_url: string;
    date: string;
    constructor(
        person_id: number,
        photo_id: string,
        album_id: string,
        album_name: string,
        album_location: string,
        album_user: string,
        photo_url: string,
        date: string
    ) {
        this.person_id = person_id;
        this.photo_id = photo_id;
        this.album_id = album_id;
        this.album_name = album_name;
        this.album_location = album_location;
        this.album_user = album_user;
        this.photo_url = photo_url;
        this.date = date;
    }

    // saveAlbum() {
    //     return db.execute('INSERT INTO albums (album_name, album_location, date, person_id) VALUES (?, ?, ?, ?, ?)', [
    //         this.album_name,
    //         this.album_location,
    //         this.date,
    //         this.person_id,
    //     ]);
    // }

    static saveAlbum(album_name: string, album_location: string, date: string, person_id: number) {
        return db.execute('INSERT INTO albums (album_name, album_location, date, person_id) VALUES (?, ?, ?, ?, ?)', [
            album_name,
            album_location,
            date,
            person_id,
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

export default metadata;
