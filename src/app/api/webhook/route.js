import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";

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

// export async function POST(request) {
//     try {
//       const body = await request.json()

//       // Verify the webhook request (you should implement proper verification)
//       // For now, we'll assume all requests are valid

//       const client = await clientPromise
//       const db = client.db("your_database_name")

//       const lead = {
//         name: body.name,
//         email: body.email,
//         phone: body.phone,
//         status: "New",
//         createdAt: new Date(),
//         // Map other fields from the Facebook Lead Ads data
//       }

//       await db.collection("leads").insertOne(lead)

//       return NextResponse.json({ message: "Lead saved successfully" }, { status: 200 })
//     } catch (error) {
//       console.error("Error saving lead:", error)
//       return NextResponse.json({ message: "Error saving lead" }, { status: 500 })
//     }
//   }
export async function POST(request) {
  try {
    const body = await request.json();

    // Log the entire body to see what data we're receiving
    console.log("Received webhook data:", JSON.stringify(body, null, 2));

    const client = await clientPromise;
    const db = client.db("veritasDB");

    // Extract the lead data from the webhook payload
    const leadData = body.entry[0].changes[0].value.lead_gen_data.data;

    // Create a lead object with all fields from Facebook
    const lead = {
      rawData: body, // Store the entire raw data
      formId: body.entry[0].changes[0].value.form_id,
      pageId: body.entry[0].changes[0].value.page_id,
      leadgenId: body.entry[0].changes[0].value.leadgen_id,
      createdAt: new Date(body.entry[0].changes[0].value.created_time),
      data: {}, // We'll populate this with the form field data
      status: "New",
    };

    // Populate the data field with all form fields
    leadData.forEach((field) => {
      lead.data[field.name] = field.values[0];
    });

    await db.collection("leads").insertOne(lead);

    return NextResponse.json(
      { message: "Lead saved successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error saving lead:", error);
    return NextResponse.json({ message: "Error saving lead" }, { status: 500 });
  }
}
