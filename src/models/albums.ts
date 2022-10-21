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

    static getAlbum(person_id: number, album_name: string) {
        return db.execute(`SELECT * FROM albums WHERE albums.person_id = ? AND albums.album_name = ?`, [
            person_id,
            album_name,
        ]);
    }

    static getAlbumById(id: number, person_id: number) {
        return db.execute(`SELECT * FROM albums WHERE albums.id = ? AND albums.person_id = ?`, [id, person_id]);
    }
};

export default albums;
