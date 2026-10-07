import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "https://esm.sh/resend@4.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface SubscriptionData {
  email: string;
  source_page?: string;
}

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { email, source_page = "/" }: SubscriptionData = await req.json();
    const trimmedEmail = email?.trim();

    if (!trimmedEmail || trimmedEmail.length > 255 || !emailRegex.test(trimmedEmail)) {
      return new Response(
        JSON.stringify({ error: "Invalid email address" }),
        { status: 400, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    const emailResponse = await resend.emails.send({
      from: "CuriosityFields <onboarding@resend.dev>",
      to: [trimmedEmail],
      subject: "Welcome to CuriosityFields — You're subscribed",
      html: '<div style="font-family:-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,sans-serif;max-width:600px;margin:0 auto;color:#18181b">' +
        '<div style="background:#18181b;padding:36px 28px;text-align:center"><h1 style="margin:0;color:#fff;font-size:28px">Welcome to CuriosityFields</h1></div>' +
        '<div style="padding:32px 28px;background:#fff"><h2 style="margin-top:0">You\'re officially subscribed.</h2>' +
        '<p style="line-height:1.7;color:#52525b">Thanks for joining CuriosityFields. We\'ll send one thoughtful email each week with fascinating discoveries in science, technology, and beyond.</p>' +
        '<p style="line-height:1.7;color:#52525b">You subscribed from: <strong>' + source_page + '</strong></p>' +
        '<p style="line-height:1.7;color:#52525b">You can unsubscribe anytime.</p>' +
        '<p style="margin-top:32px;color:#71717a;font-size:13px">CuriosityFields<br />Independent, research-driven stories for curious minds.</p></div></div>',
    });

    if (emailResponse.error) {
      // Subscription is already saved; don't fail the signup if the welcome email can't be sent
      // (e.g. Resend sending domain not verified yet).
      console.error("Newsletter email send error:", emailResponse.error);
      return new Response(
        JSON.stringify({ success: true, emailSent: false }),
        { status: 200, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    console.log("Newsletter confirmation email sent successfully");

    return new Response(
      JSON.stringify({ success: true }),
      { status: 200, headers: { "Content-Type": "application/json", ...corsHeaders } }
    );
  } catch (error: any) {
    console.error("Error in send-newsletter-subscription function:", error);
    return new Response(
      JSON.stringify({ error: error.message || "An unexpected error occurred" }),
      { status: 500, headers: { "Content-Type": "application/json", ...corsHeaders } }
    );
  }
};

serve(handler);
