import { NextResponse } from "next/server";
// import clientPromise from "@/lib/mongodb";
import mongoose from "mongoose";
import crypto from "crypto";
const MONGO_URI = process.env.MONGODB_URI; // Add this in .env.local
const VERIFY_TOKEN = process.env.FB_VERIFY_TOKEN; // Add this in .env.local
const APP_SECRET = process.env.FB_APP_SECRET;

// Function to validate the X-Hub-Signature header
const isXHubValid = (req, body) => {
  const signature = req.headers.get("x-hub-signature-256");
  if (!signature || !APP_SECRET) return false;

  const hash = `sha256=${crypto
    .createHmac("sha256", APP_SECRET)
    .update(body, "utf-8") // Explicit encoding
    .digest("hex")}`;

  return crypto.timingSafeEqual(
    Buffer.from(signature, "utf-8"),
    Buffer.from(hash, "utf-8")
  );
};

// Connect to MongoDB
const connectDB = async () => {
  if (mongoose.connection.readyState === 1) return;
  await mongoose.connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
};

// Define Lead Schema
const leadSchema = new mongoose.Schema({}, { strict: false });

const Lead = mongoose.models.Lead || mongoose.model("Lead", leadSchema);

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const mode = searchParams.get("hub.mode");
  const token = searchParams.get("hub.verify_token");
  const challenge = searchParams.get("hub.challenge");
  console.log(challenge);
  if (mode === "subscribe" && token === process.env.FACEBOOK_VERIFY_TOKEN) {
    return new NextResponse(challenge);
  } else {
    return new NextResponse("Verification failed", { status: 403 });
  }
}

export async function POST(req) {
  try {
    const body = await req.text(); // Read raw text body
    const jsonBody = JSON.parse(body); // Convert to JSON

    console.log("Facebook request body:", jsonBody);

    // Validate signature
    if (!isXHubValid(req, body)) {
      console.log(
        "Warning - request header X-Hub-Signature not present or invalid"
      );
      return new NextResponse("Unauthorized", { status: 401 });
    }

    console.log("Request header X-Hub-Signature validated");

    await connectDB();
    const lead = new Lead({
      ...jsonBody,
      createdAt: new Date(),
    });
    await lead.save();

    return new NextResponse(
      JSON.stringify({ message: "Lead saved successfully" }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Error saving lead:", error);
    return new NextResponse(JSON.stringify({ message: "Error saving lead" }), {
      status: 500,
    });
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
