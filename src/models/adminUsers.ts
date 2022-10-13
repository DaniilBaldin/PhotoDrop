import db from '../utils/databaseConnect';

const admin = class Admin {
    user: string;
    password: string;
    dateCreated: string;
    constructor(user: string, password: string, dateCreated: string) {
        this.user = user;
        this.password = password;
        this.dateCreated = dateCreated;
    }

    save() {
        return db.execute('INSERT INTO adminusers (user, password, dateCreated) VALUES (?, ?, ?)', [
            this.user,
            this.password,
            this.dateCreated,
        ]);
    }

    static find(login: string, password: string) {
        return db.execute(`SELECT * FROM adminusers WHERE adminusers.user = ? AND adminusers.password = ?`, [
            login,
            password,
        ]);
    }
};

export default admin;
