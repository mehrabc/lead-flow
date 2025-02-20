"use server";

import { formSchema } from "@/lib/validations/form";
import Lead from "@/models/Lead";
// import { connectToDatabase } from "@/lib/Mongodb";

export async function submitForm(data) {
  console.log("HELOOOOO, I am from actions");
  console.log("Received form data:", data);

  const validatedFields = formSchema.safeParse(data);
  console.log("Validation result:", validatedFields);

  if (!validatedFields.success) {
    throw new Error("Invalid form data");
  }

  try {
    // await connectToDatabase();

    // Get the next leadId
    const nextLeadId = await Lead.getNextLeadId();

    const newLead = new Lead({
      ...validatedFields.data,
      leadId: nextLeadId,
    });

    console.log("Lead before saving:", newLead);

    await newLead.save();

    console.log("Lead saved successfully:", newLead);

    return {
      success: true,
      message: "Lead submitted successfully",
      leadId: newLead.leadId,
    };
  } catch (error) {
    console.error("Error submitting lead:", error);
    if (error.code === 11000) {
      if (error.keyPattern.email) {
        throw new Error("Email already registered");
      } else if (error.keyPattern.phone) {
        throw new Error("Phone number already registered");
      }
    }
    throw new Error("Failed to submit lead: " + error.message);
  }
}
