// @flow
import storage from 'react-native-simple-store';

class StorageManager {
	async create(type: string): any{
		const ret = await storage.get(type);
		return ret;
	}
	async get(type: string): any{
		const ret = await storage.get(type);
		return ret;
	}
	async update(type: string, data?: Object): any{
		const ret = await storage.save(type, data);
		return ret;
	}
	async delete(type: string): any{
		const ret = await storage.delete(type);
		return ret;
	}
}

export default new StorageManager();
