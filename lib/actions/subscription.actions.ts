'use server'

import { Databases } from "node-appwrite";
import { client } from "../appwrite_client";

const database = new Databases(client);

interface Subscription {
    subscription: string;
    amount: number;
    createdAt: string;
}

const {
    APPWRITE_DATABASE_ID: DATABASE_ID,
    APPWRITE_SUBSCRIPTIONS_COLLECTION_ID: SUBSCRIPTION_COLLECTION_ID,
} = process.env;

// Fetch and process subscription data
export const getTotalSubscriptionByMonth = async (): Promise<{ labels: string[], dataPoints: number[] }> => {
    try {
        // Use environment variables for database and collection IDs
        const databaseId = DATABASE_ID || 'fallback_database_id';
        const collectionId = SUBSCRIPTION_COLLECTION_ID || 'fallback_collection_id';

        if (!databaseId || !collectionId) {
            throw new Error("Missing required environment variables for database or collection ID.");
        }

        // Fetch subscription data from Appwrite
        const response = await database.listDocuments(databaseId, collectionId);

        // Assuming the response contains a list of subscription documents
        const subscriptions: Subscription[] = response.documents.map(doc => ({
            subscription: doc.subscription,
            amount: doc.amount,
            createdAt: doc.$createdAt,
        }));

        const currentDate = new Date();
        const monthlyTotals: { [key: string]: number } = {};

        // Initialize totals for the last 6 months
        for (let i = 5; i >= 0; i--) {
            const month = new Date(currentDate.getFullYear(), currentDate.getMonth() - i, 1);
            const monthKey = `${String(month.getMonth() + 1).padStart(2, '0')}-${month.getFullYear().toString().slice(-2)}`; // Format: MM-YY
            monthlyTotals[monthKey] = 0;
        }

        subscriptions.forEach((sub) => {
            if (!sub.createdAt) {
                console.error("Subscription missing createdAt:", sub);
                return;
            }

            const subscriptionDate = new Date(sub.createdAt);

            // Check for valid date before processing
            if (!isNaN(subscriptionDate.getTime())) {
                const monthKey = `${String(subscriptionDate.getMonth() + 1).padStart(2, '0')}-${subscriptionDate.getFullYear().toString().slice(-2)}`; // Format: MM-YY

                // Only consider subscriptions within the last 6 months
                if (monthlyTotals[monthKey] !== undefined) {
                    monthlyTotals[monthKey] += sub.amount;
                }
            } else {
                console.error("Invalid subscription date:", sub.createdAt);
            }
        });

        const labels = Object.keys(monthlyTotals);
        const dataPoints = Object.values(monthlyTotals);

        return { labels, dataPoints };

    } catch (error) {
        console.error('Error fetching subscription data:', error);
        return { labels: [], dataPoints: [] };
    }
};