import db from '../utils/databaseConnect';

const client = class Client {
    id: string;
    client_name: string;
    phone_number: string;
    constructor(id: string, photo_logo: string, photo_name: string) {
        this.id = id;
        this.client_name = photo_logo;
        this.phone_number = photo_name;
    }

    static save(client_name: string, phone_number: string) {
        return db.execute('INSERT INTO clients (client_name, phone_number) VALUES (?, ?)', [client_name, phone_number]);
    }

    static getClients() {
        return db.execute(`SELECT * FROM clients `);
    }

    static getClientByNumber(phone_number: string) {
        return db.execute(`SELECT * FROM clients WHERE clients.phone_number = ?`, [phone_number]);
    }

    static getClientById(id: string) {
        return db.execute(`SELECT * FROM clients WHERE clients.id = ?`, [id]);
    }
};

export default client;
