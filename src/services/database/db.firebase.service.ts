import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs , addDoc, setDoc, doc, getDoc, query, where, and } from 'firebase/firestore';
import { FirebaseConfig } from '../../constants';

export class DBFirebaseService{

    private static instanceDb: any = undefined;

    private static getInstanceDb(){
        if(DBFirebaseService.instanceDb == undefined) {
            const app = initializeApp(FirebaseConfig);
            DBFirebaseService.instanceDb = getFirestore(app);
        }
        return DBFirebaseService.instanceDb;
    }

    public static async getAll(name: string): Promise<any> {
        const objectsCol = collection( DBFirebaseService.getInstanceDb() , name);
        const objectSnapshot = await getDocs( objectsCol);
        return objectSnapshot.docs.map(doc => doc.data());
    }

    public static async getAny(name: string , id: string): Promise<any> {
        const docSnap = await getDoc( doc( DBFirebaseService.getInstanceDb() , name , id) );
        return docSnap.data();
    }

    public static async searchDocument(name: string , emailUser: string, nameUser: string ): Promise<any> {
        const q = query(
                    collection(DBFirebaseService.getInstanceDb(), name),
                    and(
                        where("nombre", "==", nameUser),
                        where("correo", "==", emailUser),
                        where("use", "==", false)
                    )
                );
        const querySnapshot = await getDocs(q);
        return querySnapshot.docs.map(doc => { 
            return {id: doc.id, data: doc.data()}
        });
    }

    public static async setDocument(name: string, body: { [key: string] : any } , id: string = ''): Promise<any> {
        const _collection = collection( DBFirebaseService.getInstanceDb(), name);
        if (id !== ''){
            const response = await setDoc(doc(_collection, id), body);
            return response;
        }
        const response = await addDoc( _collection, body);
        return response;
    }
}