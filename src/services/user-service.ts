'use server';

/**
 * @fileOverview A service for managing users in Firestore.
 *
 * - getAllUsers - A function that retrieves all users from the database.
 */

import { db } from '@/lib/firebase';
import { collection, getDocs } from 'firebase/firestore';

export type User = {
    uid: string;
    name: string;
    email: string;
    ieeeId: string;
};

/**
 * Retrieves all users from the Firestore database.
 * @returns A promise that resolves to an array of user objects.
 */
export async function getAllUsers(): Promise<User[]> {
    const usersCollection = collection(db, 'users');
    const usersSnapshot = await getDocs(usersCollection);
    const usersList = usersSnapshot.docs.map(doc => ({
        uid: doc.id,
        ...doc.data()
    } as User));
    return usersList;
}
