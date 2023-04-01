import mongodb from 'mongodb';

class DBClient{
    constructor(){
	this.db = {connected: false};
	this.client = new mongodb.MongoClient(`mongodb://${process.env.DB_HOST || '127.0.0.1'}:${process.env.DB_PORT ||  27017}/${process.env.DB_DATABASE || 'files_manager'}`, { useUnifiedTopology: true });
	this.client.on('open', _=>this.db.connected = true);
	this.client.connect();
    }
    isAlive(){
	// return this.client.isConnected();
	return this.db.connected;
    }
    nbUsers(){
	this.client.db().collection('users').countDocuments();
    }
    nbFiles(){
	this.client.db().collection('files').countDocuments();
    }
}

const dbClient = new DBClient();
export default dbClient;