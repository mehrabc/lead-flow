import { NextResponse } from "next/server";
import mongoose from "mongoose";
const MONGO_URI = process.env.MONGODB_URI; // Add this in .env.local
const leadSchema = new mongoose.Schema(
    {
        leadId: { type: String, unique: true, sparse: true }, // Ensures uniqueness but allows nulls
    },
    { strict: false }
);

const Lead = mongoose.models.Lead || mongoose.model("Lead", leadSchema);

const connectDB = async () => {
    if (mongoose.connection.readyState === 1) return;
    await mongoose.connect(MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
};
export async function GET(req) {
    await connectDB();
    const leads = await Lead.find().lean().exec();
    return NextResponse.json({ leads });
}