import {client} from "@/lib/appwrite_client";
import { NextResponse } from "next/server";
import { Databases, ID, Query } from "node-appwrite";

const database = new Databases(client);

// Create a new subscription
async function createSubscription(data: {subscription: string, amount: number}) {
    try {
        const response = await database.createDocument(process.env.APPWRITE_DATABASE_ID as string, process.env.APPWRITE_SUBSCRIPTIONS_COLLECTION_ID as string, ID.unique(), data)

        return response;
    } catch (error) {
        console.error("An error occurred while creating the subscription:", error);
        throw new Error("Failed to create the subscription");
    }
}

// Fetch all subscriptions
async function fetchSubscription() {
    try {
        const response = await database.listDocuments(process.env.APPWRITE_DATABASE_ID as string, process.env.APPWRITE_SUBSCRIPTIONS_COLLECTION_ID as string, [Query.orderDesc('$createdAt')])

        return response.documents;
    } catch (error) {
        console.error("An error occurred while fetching the subscription:", error);
        throw new Error("Failed to fetch the subscription");
    }
}

export async function POST(req: Request) {
    try {
        const {subscription, amount} = await req.json();
        const data = {subscription, amount};
        const response = await createSubscription(data);
        return NextResponse.json({message: "Subscription created successfully", data: response});
    } catch (error) {
        return NextResponse.json({error: "Failed to create the subscription"}, {status: 500});
    }
}

export async function GET() {
    try {
        const subscriptions = await fetchSubscription();
        return NextResponse.json({subscriptions});
    } catch (error) {
        return NextResponse.json({error: "Failed to fetch the subscription"}, {status: 500});
    }
}