/* eslint-disable no-prototype-builtins */
import { type ClassValue, clsx } from "clsx";
import qs from "query-string";
import { twMerge } from "tailwind-merge";
import { number, string, z } from "zod";
import { format } from 'date-fns'
import { createAdminClient } from "./appwrite";
import { ID } from "node-appwrite";

const {
  APPWRITE_DATABASE_ID: DATABASE_ID,
  APPWRITE_BUDGETLIMIT_COLLECTION_ID: BUDGETLIMIT_COLLECTION_ID,
} = process.env;

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// FORMAT DATE TIME
export const formatDateTime = (dateString: Date) => {
  const dateTimeOptions: Intl.DateTimeFormatOptions = {
    weekday: "short", // abbreviated weekday name (e.g., 'Mon')
    month: "short", // abbreviated month name (e.g., 'Oct')
    day: "numeric", // numeric day of the month (e.g., '25')
    hour: "numeric", // numeric hour (e.g., '8')
    minute: "numeric", // numeric minute (e.g., '30')
    hour12: true, // use 12-hour clock (true) or 24-hour clock (false)
  };

  const dateDayOptions: Intl.DateTimeFormatOptions = {
    weekday: "short", // abbreviated weekday name (e.g., 'Mon')
    year: "numeric", // numeric year (e.g., '2023')
    month: "2-digit", // abbreviated month name (e.g., 'Oct')
    day: "2-digit", // numeric day of the month (e.g., '25')
  };

  const dateOptions: Intl.DateTimeFormatOptions = {
    month: "short", // abbreviated month name (e.g., 'Oct')
    year: "numeric", // numeric year (e.g., '2023')
    day: "numeric", // numeric day of the month (e.g., '25')
  };

  const timeOptions: Intl.DateTimeFormatOptions = {
    hour: "numeric", // numeric hour (e.g., '8')
    minute: "numeric", // numeric minute (e.g., '30')
    hour12: true, // use 12-hour clock (true) or 24-hour clock (false)
  };

  const formattedDateTime: string = new Date(dateString).toLocaleString(
    "en-US",
    dateTimeOptions
  );

  const formattedDateDay: string = new Date(dateString).toLocaleString(
    "en-US",
    dateDayOptions
  );

  const formattedDate: string = new Date(dateString).toLocaleString(
    "en-US",
    dateOptions
  );

  const formattedTime: string = new Date(dateString).toLocaleString(
    "en-US",
    timeOptions
  );

  return {
    dateTime: formattedDateTime,
    dateDay: formattedDateDay,
    dateOnly: formattedDate,
    timeOnly: formattedTime,
  };
};

export function formatAmount(amount: number): string {
  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
  });

  return formatter.format(amount);
}

export const parseStringify = (value: any) => JSON.parse(JSON.stringify(value));

export const removeSpecialCharacters = (value: string) => {
  return value.replace(/[^\w\s]/gi, "");
};

interface UrlQueryParams {
  params: string;
  key: string;
  value: string;
}

export function formUrlQuery({ params, key, value }: UrlQueryParams) {
  const currentUrl = qs.parse(params);

  currentUrl[key] = value;

  return qs.stringifyUrl(
    {
      url: window.location.pathname,
      query: currentUrl,
    },
    { skipNull: true }
  );
}

export function getAccountTypeColors(type: AccountTypes) {
  switch (type) {
    case "depository":
      return {
        bg: "bg-purple-25",
        lightBg: "bg-purple-100",
        title: "text-purple-900",
        subText: "text-purple-700",
      };

    case "credit":
      return {
        bg: "bg-success-25",
        lightBg: "bg-success-100",
        title: "text-success-900",
        subText: "text-success-700",
      };

    default:
      return {
        bg: "bg-green-25",
        lightBg: "bg-green-100",
        title: "text-green-900",
        subText: "text-green-700",
      };
  }
}

export function countTransactionCategories(transactions: Transaction[]): CategoryCount[] {
  const categoryCounts: { [category: string]: number } = {};
  let totalCount = 0;

  // Iterate over each transaction
  transactions &&
    transactions.forEach((transaction) => {
      // Extract the category from the transaction
      const category = transaction.category;

      // If the category exists in the categoryCounts object, increment its count
      if (categoryCounts.hasOwnProperty(category)) {
        categoryCounts[category]++;
      } else {
        // Otherwise, initialize the count to 1
        categoryCounts[category] = 1;
      }

      // Increment total count
      totalCount++;
    });

  // Convert the categoryCounts object to an array of objects
  const aggregatedCategories: CategoryCount[] = Object.keys(categoryCounts).map(
    (category) => ({
      name: category,
      count: categoryCounts[category],
      totalCount,
    })
  );

  // Sort the aggregatedCategories array by count in descending order
  aggregatedCategories.sort((a, b) => b.count - a.count);

  return aggregatedCategories;
}

export function calculateSpendingByCategory(transactions: Transaction[]) {
  const categorySpending: { [category: string]: number } = {};
  const currentMonth = format(new Date(), 'yyyy-MM')

  // Iterate over each transaction and calculate the spending by category
  transactions && transactions.forEach((transaction) => {
    // Extract the month from the transaction date
    const transactionMonth = format(new Date(transaction.date), 'yyyy-MM')

    // If the transaction month is the current month, calculate the spending by category
    if (transactionMonth === currentMonth) {
      const category = transaction.category;

      // If the category exists in the categorySpending object, increment its amount
      if (categorySpending.hasOwnProperty(category)) {
        categorySpending[category] += transaction.amount;
      } else {
        categorySpending[category] = transaction.amount;
      }
    }
  });

  return categorySpending;
}

export function calculateSpendingLastSixMonths(transactions: Transaction[]) {
  const spendingData: { [month: string]: number } = {};
  const today = new Date();

  // Initialize income data for the last 6 months
  for (let i = 0; i < 6; i++) {
    const date = new Date(today.getFullYear(), today.getMonth() - i, 1);
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Ensure month is in MM format
    const year = String(date.getFullYear()).slice(-2); // Get last two digits of the year
    const formattedDate = `${month}-${year}`;
    spendingData[formattedDate] = 0;
  }

  // Calculate spending per month
  transactions.forEach(transaction => {
    const transactionDate = new Date(transaction.date);
    const month = String(transactionDate.getMonth() + 1).padStart(2, '0');
    const year = String(transactionDate.getFullYear()).slice(-2);
    const formattedDate = `${month}-${year}`;

    if (spendingData.hasOwnProperty(formattedDate)) {
      spendingData[formattedDate] -= transaction.amount;
    }
  });

  // Convert spendingData object to arrays for the chart
  const labels = Object.keys(spendingData).reverse();
  const data = Object.values(spendingData).reverse();

  return { labels, data };
}

export function calculateIncomeLastSixMonths(transactions: Transaction[]) {
  const incomeData: { [month: string]: number } = {};
  const today = new Date();

  // Initialize income data for the last 6 months
  for (let i = 0; i < 6; i++) {
    const date = new Date(today.getFullYear(), today.getMonth() - i, 1);
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Ensure month is in MM format
    const year = String(date.getFullYear()).slice(-2); // Get last two digits of the year
    const formattedDate = `${month}-${year}`;
    incomeData[formattedDate] = 0;
  }

  // Calculate income per month
  transactions.forEach(transaction => {
    if (transaction.type === 'income') {
      const transactionDate = new Date(transaction.date);
      const month = String(transactionDate.getMonth() + 1).padStart(2, '0');
      const year = String(transactionDate.getFullYear()).slice(-2);
      const formattedDate = `${month}-${year}`;

      if (incomeData.hasOwnProperty(formattedDate)) {
        incomeData[formattedDate] += transaction.amount;
      }
    }
  });

  // Convert incomeData object to arrays for the chart
  const labels = Object.keys(incomeData).reverse();
  const data = Object.values(incomeData).reverse();

  return { labels, data };
}


export function extractCustomerIdFromUrl(url: string) {
  // Split the URL string by '/'
  const parts = url.split("/");

  // Extract the last part, which represents the customer ID
  const customerId = parts[parts.length - 1];

  return customerId;
}

export function encryptId(id: string) {
  return btoa(id);
}

export function decryptId(id: string) {
  return atob(id);
}

export const getTransactionStatus = (date: Date) => {
  const today = new Date();
  const twoDaysAgo = new Date(today);
  twoDaysAgo.setDate(today.getDate() - 2);

  return date > twoDaysAgo ? "Processing" : "Success";
};

export const authFormSchema = (type: string) => z.object({
  // sign up
  firstName: type === 'sign-in' ? z.string().optional() : z.string().min(3),
  lastName: type === 'sign-in' ? z.string().optional() : z.string().min(2),
  address1: type === 'sign-in' ? z.string().optional() : z.string().max(50),
  city: type === 'sign-in' ? z.string().optional() : z.string().max(50),
  state: type === 'sign-in' ? z.string().optional() : z.string().min(2).max(2),
  postalCode: type === 'sign-in' ? z.string().optional() : z.string().min(3).max(6),
  dateOfBirth: type === 'sign-in' ? z.string().optional() : z.string().min(3),
  ssn: type === 'sign-in' ? z.string().optional() : z.string().min(3),
  // both
  email: z.string().email(),
  password: z.string().min(8),
})

// Budget management
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
