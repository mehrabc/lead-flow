import mongoose from "mongoose";

const leadSchema = new mongoose.Schema(
  {
    leadId: {
      type: Number,
      required: true,
      unique: true,
    },
    firstName: {
      type: String,
      required: [true, "First name is required"],
      trim: true,
      minlength: [2, "First name must be at least 2 characters long"],
    },
    lastName: {
      type: String,
      required: [true, "Last name is required"],
      trim: true,
      minlength: [2, "Last name must be at least 2 characters long"],
    },
    gender: {
      type: String,
      enum: ["male", "female", "other"],
      required: [true, "Gender is required"],
    },
    country: {
      type: String,
      required: [true, "Country is required"],
      trim: true,
    },
    city: {
      type: String,
      required: [true, "City is required"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      trim: true,
      lowercase: true,
      unique: true,
      match: [/^\S+@\S+\.\S+$/, "Please enter a valid email address"],
    },
    phone: {
      type: String,
      required: [true, "Phone number is required"],
      trim: true,
      unique: true,
    },
    course: {
      type: String,
      enum: ["IELTS Preparation", "Spoken English"],
      required: [true, "Course selection is required"],
    },
    purpose: {
      type: String,
      enum: [
        "IELTS Exam Preparation",
        "Improving English Speaking",
        "Improving English Writing & Reading",
      ],
      required: [true, "Purpose selection is required"],
    },
    terms: {
      type: Boolean,
      required: [true, "You must accept the terms and conditions"],
    },
  },
  {
    timestamps: true,
  }
);

leadSchema.statics.getNextLeadId = async function () {
  const lastLead = await this.findOne({}, {}, { sort: { leadId: -1 } });
  return lastLead ? lastLead.leadId + 1 : 1;
};

const Lead = mongoose.models.Lead || mongoose.model("Lead", leadSchema);

// Add the static method to the model after it's created
Lead.getNextLeadId = leadSchema.statics.getNextLeadId;

export default Lead;
