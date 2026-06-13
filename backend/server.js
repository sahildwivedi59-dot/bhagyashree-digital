import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import { createClient } from "@supabase/supabase-js";

dotenv.config();

const app = express();

app.use(cors({
  origin: "*",
  methods: ["GET", "POST", "PATCH", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));

app.use(express.json());

const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_ANON_KEY = process.env.SUPABASE_ANON_KEY;

if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
  console.error("Missing SUPABASE_URL or SUPABASE_ANON_KEY");
  process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Bhagyashree Digital Backend Running 🚀"
  });
});

app.get("/api/leads", async (req, res) => {
  try {
    const { data, error } = await supabase
      .from("leads")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      return res.status(400).json({
        success: false,
        message: error.message
      });
    }

    const leads = (data || []).map((lead) => ({
      id: lead.id,
      name: lead.name || "",
      phone: lead.phone || "",
      email: lead.email || "",
      type: lead.business_type || "",
      service: lead.service || "",
      message: lead.message || "",
      status: lead.status || "New",
      createdAt: lead.created_at
    }));

    res.json({
      success: true,
      leads
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message
    });
  }
});

app.post("/api/leads", async (req, res) => {
  try {
    const { name, phone, email, type, business_type, service, message } = req.body;

    if (!name || !phone) {
      return res.status(400).json({
        success: false,
        message: "Name and phone are required"
      });
    }

    const { data, error } = await supabase
      .from("leads")
      .insert([
        {
          name,
          phone,
          email: email || null,
          business_type: business_type || type || null,
          service: service || null,
          message: message || null,
          status: "New"
        }
      ])
      .select();

    if (error) {
      return res.status(400).json({
        success: false,
        message: error.message
      });
    }

    res.json({
      success: true,
      message: "Lead saved successfully",
      data
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message
    });
  }
});

app.patch("/api/leads/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const { data, error } = await supabase
      .from("leads")
      .update({ status })
      .eq("id", id)
      .select();

    if (error) {
      return res.status(400).json({
        success: false,
        message: error.message
      });
    }

    res.json({
      success: true,
      data
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message
    });
  }
});

app.delete("/api/leads/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const { error } = await supabase
      .from("leads")
      .delete()
      .eq("id", id);

    if (error) {
      return res.status(400).json({
        success: false,
        message: error.message
      });
    }

    res.json({
      success: true,
      message: "Lead deleted successfully"
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message
    });
  }
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});