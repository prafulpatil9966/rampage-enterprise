import { NextResponse, type NextRequest } from "next/server";
import { services } from "@/lib/content";
import { createClient } from "@/utils/supabase/server";

type ContactSubmission = {
  name: string;
  phone: string;
  email: string;
  service: string;
  message: string;
};

function isContactSubmission(value: unknown): value is ContactSubmission {
  if (typeof value !== "object" || value === null) return false;

  const submission = value as Record<string, unknown>;
  return (
    typeof submission.name === "string" &&
    typeof submission.phone === "string" &&
    typeof submission.email === "string" &&
    typeof submission.service === "string" &&
    typeof submission.message === "string"
  );
}

function validateSubmission(submission: ContactSubmission) {
  const name = submission.name.trim();
  const phone = submission.phone.trim();
  const email = submission.email.trim();
  const message = submission.message.trim();

  if (name.length < 1 || name.length > 120) {
    return "Enter a name of 1 to 120 characters.";
  }
  if (!/^[0-9+\-()\s]{7,15}$/.test(phone)) {
    return "Enter a valid phone number.";
  }
  if (
    email.length > 254 ||
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
  ) {
    return "Enter a valid email address.";
  }
  if (!services.some((service) => service.title === submission.service)) {
    return "Select a valid service.";
  }
  if (message.length < 1 || message.length > 5000) {
    return "Enter a message of 1 to 5000 characters.";
  }

  return null;
}

export async function POST(request: NextRequest) {
  let payload: unknown;

  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  if (!isContactSubmission(payload)) {
    return NextResponse.json(
      { error: "Complete all contact form fields." },
      { status: 400 },
    );
  }

  const validationError = validateSubmission(payload);
  if (validationError) {
    return NextResponse.json({ error: validationError }, { status: 400 });
  }

  try {
    const supabase = await createClient();
    const { error } = await supabase.from("contact_enquiries").insert({
      name: payload.name.trim(),
      phone: payload.phone.trim(),
      email: payload.email.trim(),
      service: payload.service,
      message: payload.message.trim(),
    });

    if (error) {
      console.error("Supabase contact enquiry insert failed:", error.message);
      return NextResponse.json(
        { error: "Your enquiry could not be saved. Please try again later." },
        { status: 500 },
      );
    }

    return NextResponse.json({ success: true }, { status: 201 });
  } catch (error) {
    console.error("Contact enquiry submission failed:", error);
    return NextResponse.json(
      { error: "Your enquiry could not be saved. Please try again later." },
      { status: 500 },
    );
  }
}
