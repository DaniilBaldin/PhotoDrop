import db from '../utils/databaseConnect';

const client = class Client {
    id: string;
    client_name: string;
    phone_number: string;
    admin_id: string;
    selfie_image: string;
    constructor(id: string, photo_logo: string, photo_name: string, admin_id: string, selfie_image: string) {
        this.id = id;
        this.client_name = photo_logo;
        this.phone_number = photo_name;
        this.admin_id = admin_id;
        this.selfie_image = selfie_image;
    }

    static save(client_name: string, phone_number: string, admin_id: string, selfie_image: string) {
        return db.execute(
            'INSERT INTO clients (client_name, phone_number, admin_id, selfie_image) VALUES (?, ?, ?, ?)',
            [client_name, phone_number, admin_id, selfie_image]
        );
    }

    static getClients(admin_id: string) {
        return db.execute(`SELECT * FROM clients WHERE clients.admin_id = ?`, [admin_id]);
    }

    static getClientByNumber(phone_number: string) {
        return db.execute(`SELECT * FROM clients WHERE clients.phone_number = ?`, [phone_number]);
    }

    static getAllClients() {
        return db.execute(`SELECT * FROM clients`);
    }
};

export default client;
