import { client } from "@/lib/appwrite_client";
import { NextResponse } from "next/server";
import { Databases } from "node-appwrite";

const database = new Databases(client);

// Fetch a specific category
async function fetchCategory(id: string) {
    try {
        const category = await database.getDocument(
            process.env.APPWRITE_DATABASE_ID as string, 
            process.env.APPWRITE_BUDGETLIMIT_COLLECTION_ID as string, 
            id);

        return category;
    } catch (error) {
        console.error("An error occurred while fetching the category:", error);
        throw new Error("Failed to fetch the category");
    }
}

// Delete a specific category
async function deleteCategory(id: string) {
    try {
        const response = await database.deleteDocument(
            process.env.APPWRITE_DATABASE_ID as string, 
            process.env.APPWRITE_BUDGETLIMIT_COLLECTION_ID as string, 
            id);
        return response;
    } catch (error) {
        console.error("An error occurred while deleting the category:", error);
        throw new Error("Failed to delete the category");
    }
}

// Update a specific category
async function updateCategory(id: string, data: {category: string, amount: number}) {
    try {
        const response = await database.updateDocument(
            process.env.APPWRITE_DATABASE_ID as string, 
            process.env.APPWRITE_BUDGETLIMIT_COLLECTION_ID as string, 
            id, 
            data);
        return response;
    } catch (error) {
        console.error("An error occurred while updating the category:", error);
        throw new Error("Failed to update the category");
    }
}

export async function GET(req: Request, {params}: {params: {id: string}}) {
    try {
        const id = params.id;
        const category = await fetchCategory(id);
        return NextResponse.json({category});
    } catch (error) {
        return NextResponse.json({error: "Failed to fetch the category"}, {status: 500});
    }
}

export async function DELETE(req: Request, {params}: {params: {id: string}}) {
    try {
        const id = params.id;
        await deleteCategory(id);
        return NextResponse.json({message: "Category deleted successfully"});
    } catch (error) {
        return NextResponse.json({error: "Failed to delete the category"}, {status: 500});
    }
}

export async function PUT(req: Request, {params}: {params: {id: string}}) {
    try {
        const id = params.id;
        const category = await req.json();
        await updateCategory(id, category);
        return NextResponse.json({message: "Category updated successfully"});
    } catch (error) {
        return NextResponse.json({error: "Failed to update the category"}, {status: 500});
    }
}