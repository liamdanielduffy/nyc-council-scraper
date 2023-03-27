import { serve } from "https://deno.land/std@0.177.0/http/server.ts";

serve(async (_) => {
    const result = await fetch("https://legistar.council.nyc.gov/Calendar.aspx");
    const html = await result.text();
    return new Response(html);
});