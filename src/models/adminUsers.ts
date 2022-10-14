import db from '../utils/databaseConnect';

const admin = class Admin {
    id: number;
    user: string;
    password: string;
    dateCreated: string;
    constructor(id: number, user: string, password: string, dateCreated: string) {
        this.id = id;
        this.user = user;
        this.password = password;
        this.dateCreated = dateCreated;
    }

    // save() {
    //     return db.execute('INSERT INTO adminusers (user, password, dateCreated) VALUES (?, ?, ?)', [
    //         this.user,
    //         this.password,
    //         this.dateCreated,
    //     ]);
    // }

    static save(user: string, password: string, dateCreated: string) {
        return db.execute('INSERT INTO adminusers (user, password, dateCreated) VALUES (?, ?, ?)', [
            user,
            password,
            dateCreated,
        ]);
    }

    static find(login: string, password: string) {
        return db.execute(`SELECT * FROM adminusers WHERE adminusers.user = ? AND adminusers.password = ?`, [
            login,
            password,
        ]);
    }

    static findOne(id: number) {
        return db.execute(`SELECT * FROM adminusers WHERE adminusers.id = ?`, [id]);
    }
};

export default admin;
