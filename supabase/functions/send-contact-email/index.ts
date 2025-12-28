import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.49.2";
import { Resend } from "https://esm.sh/resend@4.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
  source_page?: string;
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { name, email, subject, message, source_page = "/contact" }: ContactFormData = await req.json();

    // Validate required fields
    if (!name || !email || !subject || !message) {
      console.error("Missing required fields:", { name: !!name, email: !!email, subject: !!subject, message: !!message });
      return new Response(
        JSON.stringify({ error: "All fields are required" }),
        { status: 400, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      console.error("Invalid email format:", email);
      return new Response(
        JSON.stringify({ error: "Invalid email address" }),
        { status: 400, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    // Create Supabase client with service role for database insert
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Store submission in database
    const submittedAt = new Date().toISOString();
    const { error: dbError } = await supabase
      .from("contact_submissions")
      .insert({
        name,
        email,
        subject,
        message,
        source_page,
        submitted_at: submittedAt,
      });

    if (dbError) {
      console.error("Database insert error:", dbError);
      return new Response(
        JSON.stringify({ error: "Failed to save submission" }),
        { status: 500, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    console.log("Submission saved to database successfully");

    // Send email notification
    const emailResponse = await resend.emails.send({
      from: "CuriosityFields <onboarding@resend.dev>",
      to: ["sunilfun009@gmail.com"],
      subject: `New Contact Form: ${subject}`,
      html: `
        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #333; border-bottom: 2px solid #6366f1; padding-bottom: 10px;">New Contact Form Submission</h2>
          
          <table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
            <tr>
              <td style="padding: 10px 0; color: #666; width: 100px;"><strong>Name:</strong></td>
              <td style="padding: 10px 0; color: #333;">${name}</td>
            </tr>
            <tr>
              <td style="padding: 10px 0; color: #666;"><strong>Email:</strong></td>
              <td style="padding: 10px 0; color: #333;"><a href="mailto:${email}" style="color: #6366f1;">${email}</a></td>
            </tr>
            <tr>
              <td style="padding: 10px 0; color: #666;"><strong>Subject:</strong></td>
              <td style="padding: 10px 0; color: #333;">${subject}</td>
            </tr>
            <tr>
              <td style="padding: 10px 0; color: #666;"><strong>Submitted:</strong></td>
              <td style="padding: 10px 0; color: #333;">${new Date(submittedAt).toLocaleString()}</td>
            </tr>
            <tr>
              <td style="padding: 10px 0; color: #666;"><strong>Source:</strong></td>
              <td style="padding: 10px 0; color: #333;">${source_page}</td>
            </tr>
          </table>
          
          <div style="background: #f4f4f5; padding: 20px; border-radius: 8px; margin-top: 20px;">
            <h3 style="margin: 0 0 10px 0; color: #333;">Message:</h3>
            <p style="margin: 0; color: #333; white-space: pre-wrap;">${message}</p>
          </div>
          
          <p style="color: #999; font-size: 12px; margin-top: 30px;">This email was sent from the CuriosityFields contact form.</p>
        </div>
      `,
    });

    if (emailResponse.error) {
      console.error("Email send error:", emailResponse.error);
      // Don't fail the request if email fails - data is already saved
      console.log("Continuing despite email error - submission was saved");
    } else {
      console.log("Email sent successfully:", emailResponse);
    }

    return new Response(
      JSON.stringify({ success: true, message: "Contact form submitted successfully" }),
      { status: 200, headers: { "Content-Type": "application/json", ...corsHeaders } }
    );

  } catch (error: any) {
    console.error("Error in send-contact-email function:", error);
    return new Response(
      JSON.stringify({ error: error.message || "An unexpected error occurred" }),
      { status: 500, headers: { "Content-Type": "application/json", ...corsHeaders } }
    );
  }
};

serve(handler);
