import { NextResponse } from "next/server";
// import clientPromise from "@/lib/mongodb";
import mongoose from "mongoose";

const MONGO_URI = process.env.MONGO_URI; // Add this in .env.local
const VERIFY_TOKEN = process.env.FB_VERIFY_TOKEN; // Add this in .env.local

// Connect to MongoDB
const connectDB = async () => {
  if (mongoose.connection.readyState === 1) return;
  await mongoose.connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
};

// Define Lead Schema
const leadSchema = new mongoose.Schema({
  name: String,
  email: String,
  status: String,
  createdAt: Object,
});

const Lead = mongoose.models.Lead || mongoose.model("Lead", leadSchema);

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const mode = searchParams.get("hub.mode");
  const token = searchParams.get("hub.verify_token");
  const challenge = searchParams.get("hub.challenge");

  if (mode === "subscribe" && token === process.env.FACEBOOK_VERIFY_TOKEN) {
    return new NextResponse(challenge);
  } else {
    return new NextResponse("Verification failed", { status: 403 });
  }
}

export async function POST(request) {
  try {
    await connectDB();
    const body = await req.json();

    console.log("Received webhook data:", JSON.stringify(body));
    // Verify the webhook request (you should implement proper verification)
    // For now, we'll assume all requests are valid

    const lead = new Lead({
      form_id: change.value.form_id,
      lead_id: change.value.lead_id,
      created_time: change.value.created_time,
      field_data: change.value.field_data,
    });
    await lead.save();

    return NextResponse.json(
      { message: "Lead saved successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error saving lead:", error);
    return NextResponse.json({ message: "Error saving lead" }, { status: 500 });
  }
}

// export async function POST(request) {
//   try {
//     const body = await request.json();

//     // Log the entire body to see what data we're receiving
//     console.log("Received webhook data:", JSON.stringify(body, null, 2));

//     const client = await clientPromise;
//     const db = client.db("veritasDB");

//     // Extract the lead data from the webhook payload
//     const leadData = body.entry[0].changes[0].value.lead_gen_data.data;

//     // Create a lead object with all fields from Facebook
//     const lead = {
//       rawData: body, // Store the entire raw data
//       formId: body.entry[0].changes[0].value.form_id,
//       pageId: body.entry[0].changes[0].value.page_id,
//       leadgenId: body.entry[0].changes[0].value.leadgen_id,
//       createdAt: new Date(body.entry[0].changes[0].value.created_time),
//       data: {}, // We'll populate this with the form field data
//       status: "New",
//     };

//     // Populate the data field with all form fields
//     leadData.forEach((field) => {
//       lead.data[field.name] = field.values[0];
//     });

//     await db.collection("leads").insertOne(lead);

//     return NextResponse.json(
//       { message: "Lead saved successfully" },
//       { status: 200 }
//     );
//   } catch (error) {
//     console.error("Error saving lead:", error);
//     return NextResponse.json({ message: "Error saving lead" }, { status: 500 });
//   }
