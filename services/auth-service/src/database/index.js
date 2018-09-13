import { getConnection, createConnection, Connection } from 'typeorm';

export class DBConnections{
  async getDefaultConnection(){
    return await createConnection('default');
  }

  static async init(){
    try{
      await new DBConnections().getDefaultConnection();
      return Promise.resolve();
    }catch(e){
      console.error(e);
      return Promise.reject(e);
    }
  }
};