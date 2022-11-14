import { createConnection, Connection } from 'mysql'

const config = {
    host: '10.120.2.22',
    port: 3306,
    user: 'Ruben',
    password: '',
    database: 'billing',
}

const connection: () => Connection = () => {
    const conn = createConnection(config)
    conn.connect()
    return conn
}


console.log('connection: ', connection());

export { connection }
