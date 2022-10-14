import db from '../utils/databaseConnect';

const albums = class Albums {
    id: number;
    album_name: string;
    album_location: string;
    date: string;
    person_id: number;
    album_logo: string;
    constructor(
        id: number,
        album_name: string,
        album_location: string,
        date: string,
        person_id: number,
        album_logo: string
    ) {
        this.id = id;
        this.album_name = album_name;
        this.album_location = album_location;
        this.date = date;
        this.person_id = person_id;
        this.album_logo = album_logo;
    }

    static saveAlbum(album_name: string, album_location: string, date: string, person_id: number) {
        return db.execute('INSERT INTO albums (album_name, album_location, date, person_id) VALUES (?, ?, ?, ?)', [
            album_name,
            album_location,
            date,
            person_id,
        ]);
    }

    static getAlbums(person_id: number) {
        return db.execute(`SELECT * FROM albums WHERE albums.person_id = ?`, [person_id]);
    }

    static getAlbum(person_id: number, album_name: string, date: string) {
        return db.execute(
            `SELECT * FROM albums WHERE albums.person_id = ? AND albums.album_name = ? and albums.date = ?`,
            [person_id, album_name, date]
        );
    }

    static getAlbumById(id: number, person_id: number) {
        return db.execute(`SELECT * FROM albums WHERE albums.id = ? AND albums.person_id = ?`, [id, person_id]);
    }

    static updateAlbum(
        album_logo: string,
        album_name: string,
        album_location: string,
        date: string,
        id: number,
        person_id: number
    ) {
        return db.execute(
            `UPDATE albums SET albums.album_logo = ?,
                                albums.album_name = ?,
                                albums.album_location = ?,
                                albums.date = ?
                                WHERE albums.id = ? AND albums.person_id = ?`,
            [album_logo, album_name, album_location, date, id, person_id]
        );
    }

    static deleteAlbumById(id: number, person_id: number) {
        return db.execute(`DELETE FROM albums WHERE albums.id = ? AND albums.person_id = ?`, [id, person_id]);
    }
};

export default albums;
