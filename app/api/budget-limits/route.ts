import { client } from "@/lib/appwrite_client";
import { NextResponse } from "next/server";
import { Databases, ID, Query } from "node-appwrite";

const database = new Databases(client);

// Create a new category
async function createCategoryLimits(data: { category: string, amount: number }) {
    try {
        const response = await database.createDocument(process.env.APPWRITE_DATABASE_ID as string, process.env.APPWRITE_BUDGETLIMIT_COLLECTION_ID as string, ID.unique(), data)

        return response;
    } catch (error) {
        console.error("An error occurred while creating the category:", error);
        throw new Error("Failed to create the category");
    }
}

// Fetch all categories
async function fetchCategory() {
    try {
        const response = await database.listDocuments(process.env.APPWRITE_DATABASE_ID as string, process.env.APPWRITE_BUDGETLIMIT_COLLECTION_ID as string, [Query.orderDesc('$createdAt')])

        return response.documents;
    } catch (error) {
        console.error("An error occurred while fetching the category:", error);
        throw new Error("Failed to fetch the category");
    }
}

export async function POST(req: Request) {
    try {
        const { category, amount } = await req.json();
        const data = { category, amount };
        const response = await createCategoryLimits(data);
        return NextResponse.json({ message: "Category created successfully", data: response });
    } catch (error) {
        return NextResponse.json({ error: "Failed to create the category" }, { status: 500 });
    }
}

export async function GET() {
    try {
        const category = await fetchCategory();
        return NextResponse.json({ category });
    } catch (error) {
        return NextResponse.json({ error: "Failed to fetch the category" }, { status: 500 });
    }
}