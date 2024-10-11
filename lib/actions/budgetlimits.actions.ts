import { Client, Databases, ID, Query } from "node-appwrite";
import { calculateSpendingByCategory } from '@/lib/utils';
import { createAdminClient } from '@/lib/appwrite';


const {
    NEXT_PUBLIC_APPWRITE_ENDPOINT: APPWRITE_ENDPOINT,
    NEXT_PUBLIC_APPWRITE_PROJECT: APPWRITE_PROJECT,
    APPWRITE_DATABASE_ID: DATABASE_ID,
    APPWRITE_BUDGETLIMIT_COLLECTION_ID: BUDGETLIMIT_COLLECTION_ID,
} = process.env;

const client = new Client()
    .setEndpoint(APPWRITE_ENDPOINT!)
    .setProject(APPWRITE_PROJECT!);

const databases = new Databases(client);

export const setBudgetLimit = async (userId: string, category: string, limit: number) => {
    try {
        const { database } = await createAdminClient();

        const result = await database.createDocument(
            DATABASE_ID!,
            BUDGETLIMIT_COLLECTION_ID!,
            ID.unique(),
            { userId, category, limit }
        );

        console.log('Budget limit set successfully:', result);
        return result;
    } catch (error) {
        console.error('Error setting budget limit:', error);
        throw new Error('Could not set budget limit.');
    }
};

export const fetchBudgetLimits = async (userId: string) => {
    try {
        const { database } = await createAdminClient();

        const response = await database.listDocuments(
            DATABASE_ID!,
            BUDGETLIMIT_COLLECTION_ID!,
            [
                Query.equal('userId', userId)
            ]
        );

        const budgetLimits = response.documents.reduce((acc, doc) => {
            acc[doc.category] = doc.limit;
            return acc;
        }, {} as { [category: string]: number });

        return budgetLimits;
    } catch (error) {
        console.error('Error fetching budget limits:', error);
        throw new Error('Could not fetch budget limits.');
    }
};


export const calculateUsagePercentage = async (userId: string, transactions: Transaction[]) => {
    const budgetLimits = await fetchBudgetLimits(userId);
    const categorySpending = calculateSpendingByCategory(transactions);

    const usagePercentage = Object.keys(categorySpending).reduce((acc, category) => {
        const spending = categorySpending[category];
        const limit = budgetLimits[category];

        if (limit && limit > 0) {
            acc[category] = (spending / limit) * 100;
        } else {
            acc[category] = 0;
        }

        return acc;
    }, {} as { [category: string]: number });

    return usagePercentage;
};
