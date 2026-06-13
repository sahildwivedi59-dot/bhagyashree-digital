require("dotenv").config({ path: __dirname + "/.env" });

const express = require("express");
const cors = require("cors");
const { createClient } = require("@supabase/supabase-js");

const app = express();

app.use(cors());
app.use(express.json());

const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_ANON_KEY = process.env.SUPABASE_ANON_KEY;

if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
  console.error("Missing SUPABASE_URL or SUPABASE_ANON_KEY in backend/.env");
  process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

app.get("/", (req, res) => {
  res.json({ message: "Bhagyashree Digital Backend Running 🚀" });
});

app.post("/api/leads", async (req, res) => {
  try {
    const { name, phone, email, business_type, service, message } = req.body;

    if (!name || !phone) {
      return res.status(400).json({
        success: false,
        message: "Name and phone are required",
      });
    }

    const { data, error } = await supabase.from("leads").insert([
      {
        name,
        phone,
        email: email || null,
        business_type: business_type || null,
        service: service || null,
        message: message || null,
      },
    ]);

    if (error) {
      return res.status(400).json({
        success: false,
        message: error.message,
      });
    }

    res.json({
      success: true,
      message: "Lead Saved Successfully",
      data,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});