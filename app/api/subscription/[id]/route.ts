import { client } from "@/lib/appwrite_client";
import { NextResponse } from "next/server";
import { Databases } from "node-appwrite";

const database = new Databases(client);

// Fetch a specific subscription
async function fetchSubscription(id: string) {
    try {
        const subscription = await database.getDocument(
            process.env.APPWRITE_DATABASE_ID as string, 
            process.env.APPWRITE_SUBSCRIPTIONS_COLLECTION_ID as string, 
            id);

        return subscription;
    } catch (error) {
        console.error("An error occurred while fetching the subscription:", error);
        throw new Error("Failed to fetch the subscription");
    }
}

// Delete a specific subscription
async function deleteSubscription(id: string) {
    try {
        const response = await database.deleteDocument(
            process.env.APPWRITE_DATABASE_ID as string, 
            process.env.APPWRITE_SUBSCRIPTIONS_COLLECTION_ID as string, 
            id);
        return response;
    } catch (error) {
        console.error("An error occurred while deleting the subscription:", error);
        throw new Error("Failed to delete the subscription");
    }
}

// Update a specific subscription
async function updateSubscription(id: string, data: {subscription: string, amount: number}) {
    try {
        const response = await database.updateDocument(
            process.env.APPWRITE_DATABASE_ID as string, 
            process.env.APPWRITE_SUBSCRIPTIONS_COLLECTION_ID as string, 
            id, 
            data);
        return response;
    } catch (error) {
        console.error("An error occurred while updating the subscription:", error);
        throw new Error("Failed to update the subscription");
    }
}

export async function GET(req: Request, {params}: {params: {id: string}}) {
    try {
        const id = params.id;
        const subscription = await fetchSubscription(id);
        return NextResponse.json({subscription});
    } catch (error) {
        return NextResponse.json({error: "Failed to fetch the subscription"}, {status: 500});
    }
}

export async function DELETE(req: Request, {params}: {params: {id: string}}) {
    try {
        const id = params.id;
        await deleteSubscription(id);
        return NextResponse.json({message: "Subscription deleted successfully"});
    } catch (error) {
        return NextResponse.json({error: "Failed to delete the subscription"}, {status: 500});
    }
}

export async function PUT(req: Request, {params}: {params: {id: string}}) {
    try {
        const id = params.id;
        const subscription = await req.json();
        await updateSubscription(id, subscription);
        return NextResponse.json({message: "Subscription updated successfully"});
    } catch (error) {
        return NextResponse.json({error: "Failed to update the subscription"}, {status: 500});
    }
}