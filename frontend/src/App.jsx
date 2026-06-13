
import React, {useState} from "react";
import { createRoot } from "react-dom/client";
import { Globe, Workflow, Megaphone, Bot, Users, Briefcase, Phone, Mail, MapPin, MessageCircle, Star, CheckCircle, Send } from "lucide-react";
import "./style.css";

const API = "https://bhagyashree-digital.onrender.com";
const baseWa = "https://wa.me/917581841039";
function waMsg(text){ return `${baseWa}?text=${encodeURIComponent(text)}`; }

const industryData = {
  "Doctors & Clinics": {
    img:"https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1200&q=80",
    title:"Complete Digital Solution for Doctors & Clinics",
    desc:"Online appointment booking, patient CRM, WhatsApp reminders and follow-up system for clinics.",
    features:["Online Appointment Booking","Patient Management CRM","WhatsApp Appointment Reminder","Follow-up Automation","Google Review Request","Daily Appointment Dashboard"],
    msg:"Hi Bhagyashree Digital, I need a Doctor/Clinic CRM demo."
  },
  "Coaching Institutes": {
    img:"https://images.unsplash.com/photo-1523580846011-d3a5bc25702b?auto=format&fit=crop&w=1200&q=80",
    title:"Admission & Student Lead System for Coaching",
    desc:"Capture student enquiries, track admissions, send follow-ups and manage parent communication.",
    features:["Admission Landing Page","Student Lead CRM","Fee Reminder Ready","WhatsApp Follow-up","Parent Communication","Batch Enquiry Tracking"],
    msg:"Hi Bhagyashree Digital, I need a Coaching Institute website/CRM demo."
  },
  "Real Estate": {
    img:"https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=1200&q=80",
    title:"Property Lead CRM for Real Estate",
    desc:"Show properties, collect buyer leads, manage site visits and automate follow-ups.",
    features:["Property Listing Website","Buyer Lead CRM","Site Visit Booking","WhatsApp Follow-up","Agent Dashboard","Lead Status Tracking"],
    msg:"Hi Bhagyashree Digital, I need a Real Estate lead CRM demo."
  },
  "Salon & Spa": {
    img:"https://images.unsplash.com/photo-1522337660859-02fbefca4702?auto=format&fit=crop&w=1200&q=80",
    title:"Booking & Customer System for Salon",
    desc:"Online booking, customer database, offer reminders and review collection for salons.",
    features:["Online Booking","Customer CRM","Membership Tracking","Offer Notifications","Birthday Wishes","Review Automation"],
    msg:"Hi Bhagyashree Digital, I need a Salon booking system demo."
  },
  "Restaurants": {
    img:"https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=80",
    title:"Digital Menu & Booking for Restaurants",
    desc:"Menu website, table booking, enquiries and customer loyalty system for restaurants.",
    features:["Digital Menu","Table Booking","Online Order Enquiry","Customer Database","Loyalty Program Ready","Review Collection"],
    msg:"Hi Bhagyashree Digital, I need a Restaurant website/booking demo."
  },
  "Retail Shops": {
    img:"https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1200&q=80",
    title:"Product Showcase & Local Sales System",
    desc:"Show products online, collect customer enquiries and manage WhatsApp orders.",
    features:["Product Catalogue","Lead CRM","WhatsApp Orders","Customer Database","Local Marketing","Sales Analytics Ready"],
    msg:"Hi Bhagyashree Digital, I need a Retail shop website/CRM demo."
  }
};

function App(){
  const [business,setBusiness]=useState("Doctors & Clinics");
  const selected=industryData[business];
  const [lead,setLead]=useState({name:"",phone:"",type:"Doctors & Clinics",service:"Website + CRM",message:""});
  const [status,setStatus]=useState("");
  const services=[
    {icon:<Globe/>,title:"Website Development",text:"Clean business websites, landing pages and contact forms."},
    {icon:<Workflow/>,title:"CRM Automation",text:"Lead tracking, appointment booking and follow-up dashboards."},
    {icon:<Bot/>,title:"AI Solutions",text:"AI chatbot, auto replies and customer support assistant."},
    {icon:<Megaphone/>,title:"Digital Marketing",text:"Google Ads, Meta Ads, SEO and local growth campaigns."},
    {icon:<Users/>,title:"Social Media",text:"Instagram, Facebook and content management for your brand."},
    {icon:<Briefcase/>,title:"Business Consulting",text:"Simple digital growth planning for local businesses."},
  ];

  async function submitLead(e){
    e.preventDefault();
    setStatus("Saving lead...");
    try{
      const res = await fetch(`${API}/api/leads`, {
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify(lead)
      });
      const data = await res.json();
      if(!res.ok) throw new Error(data.message || "Lead not saved");
      setStatus("✅ Lead saved. Opening WhatsApp...");
      const msg=`Hi Bhagyashree Digital, my name is ${lead.name}. Phone: ${lead.phone}. Business: ${lead.type}. Service: ${lead.service}. ${lead.message}`;
      window.open(waMsg(msg),"_blank");
      setLead({name:"",phone:"",type:"Doctors & Clinics",service:"Website + CRM",message:""});
    }catch(err){
      setStatus("❌ Backend not connected. Please run npm run dev.");
    }
  }

  return <main>
    <nav>
      <div className="logo">Bhagyashree Digital</div>
      <div className="navlinks">
        <a href="#services">Services</a>
        <a href="#industries">Industries</a>
        <a href="#lead">Free Audit</a>
        <a href="#pricing">Pricing</a>
        <a href="#contact">Contact</a>
      </div>
      <a className="whatsapp" href={waMsg("Hi Bhagyashree Digital, I want to know about your services.")} target="_blank">WhatsApp</a>
    </nav>

    <section className="hero">
      <div className="heroText">
        <p className="tag">AI • CRM • Websites • Marketing</p>
        <h1>Simple digital solutions for local businesses.</h1>
        <p>We build clean websites, CRM systems and automation tools that help businesses get more enquiries and manage customers better.</p>
        <div className="actions">
          <a className="primary" href="#lead">Get Free Audit</a>
          <a className="secondary" href={waMsg("Hi Bhagyashree Digital, I want a free consultation.")} target="_blank">Chat on WhatsApp</a>
        </div>
      </div>
      <div className="heroCard">
        <h3>Find the right solution</h3>
        <p>Select your business and see what system you need.</p>
        <div className="quickGrid">
          <span>Website</span><span>CRM</span><span>AI Bot</span><span>Marketing</span>
        </div>
      </div>
    </section>

    <section className="trust">
      {["Fast Delivery","Mobile Friendly","Affordable Pricing","Local Business Focus"].map(x=><div key={x}><CheckCircle/> {x}</div>)}
    </section>

    <section id="services" className="section">
      <div className="sectionTitle">
        <p className="tag">Our Services</p>
        <h2>Everything your business needs online</h2>
      </div>
      <div className="grid">
        {services.map(s=><div className="card" key={s.title}><div className="icon">{s.icon}</div><h3>{s.title}</h3><p>{s.text}</p></div>)}
      </div>
    </section>

    <section id="industries" className="section light">
      <div className="sectionTitle">
        <p className="tag">Choose Your Business</p>
        <h2>Get the right solution for your business</h2>
      </div>
      <div className="industryWrap">
        <div className="industryList">
          {Object.keys(industryData).map(x=><button className={business===x?"active":""} onClick={()=>{setBusiness(x); setLead({...lead,type:x});}} key={x}>{x}</button>)}
        </div>
        <div className="recommend">
          <img src={selected.img} alt={business}/>
          <div className="recommendContent">
            <p className="tag">{business}</p>
            <h3>{selected.title}</h3>
            <p>{selected.desc}</p>
            <div className="featureGrid">
              {selected.features.map(f=><span key={f}><CheckCircle size={17}/>{f}</span>)}
            </div>
            <div className="actions small">
              <a className="primary" href="#lead">Book Free Demo</a>
              <a className="secondary" href={waMsg(selected.msg)} target="_blank">WhatsApp Now</a>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section id="lead" className="section leadSection">
      <div className="leadText">
        <p className="tag">Free Business Audit</p>
        <h2>Want to know what your business needs?</h2>
        <p>Fill this short form. Your lead will save in admin panel and WhatsApp will open for fast response.</p>
      </div>
      <form className="leadForm" onSubmit={submitLead}>
        <input placeholder="Your Name" value={lead.name} onChange={e=>setLead({...lead,name:e.target.value})} required/>
        <input placeholder="Phone Number" value={lead.phone} onChange={e=>setLead({...lead,phone:e.target.value})} required/>
        <select value={lead.type} onChange={e=>setLead({...lead,type:e.target.value})}>
          {Object.keys(industryData).map(x=><option key={x}>{x}</option>)}
        </select>
        <select value={lead.service} onChange={e=>setLead({...lead,service:e.target.value})}>
          <option>Website + CRM</option><option>Website Development</option><option>CRM Automation</option><option>Digital Marketing</option><option>AI Chatbot</option>
        </select>
        <textarea placeholder="Tell us about your business" value={lead.message} onChange={e=>setLead({...lead,message:e.target.value})}></textarea>
        <button><Send size={18}/> Save Lead & Open WhatsApp</button>
        <p className="leadStatus">{status}</p>
      </form>
    </section>

    <section className="section">
      <div className="sectionTitle">
        <p className="tag">How It Works</p>
        <h2>Simple process</h2>
      </div>
      <div className="steps">
        {["Understand Requirement","Design Website/CRM","Connect Forms & Dashboard","Launch & Support"].map((x,i)=><div key={x}><b>{i+1}</b><h3>{x}</h3><p>Clear step-by-step work so you know exactly what is happening.</p></div>)}
      </div>
    </section>

    <section id="pricing" className="section light">
      <div className="sectionTitle">
        <p className="tag">Pricing</p>
        <h2>Starting packages</h2>
      </div>
      <div className="pricing">
        <div><h3>Website</h3><h4>₹5,999+</h4><p>Business website + contact form.</p></div>
        <div className="popular"><h3>Website + CRM</h3><h4>₹10,999+</h4><p>Website, lead form and basic CRM dashboard.</p></div>
        <div><h3>Custom Automation</h3><h4>Custom</h4><p>WhatsApp, AI chatbot, reports and advanced workflows.</p></div>
      </div>
    </section>

    <section className="section reviews">
      <div className="sectionTitle">
        <p className="tag">Trust</p>
        <h2>Built for real businesses</h2>
      </div>
      <div className="reviewGrid">
        {[1,2,3].map(i=><div className="review" key={i}><div className="stars"><Star/><Star/><Star/><Star/><Star/></div><p>Clean work, simple process and useful digital setup for business growth.</p><b>Local Business Owner</b></div>)}
      </div>
    </section>

    <section id="contact" className="section contact">
      <div className="sectionTitle">
        <p className="tag">Contact</p>
        <h2>Ready to discuss your project?</h2>
      </div>
      <div className="contactBox">
        <div>
          <p><Phone/> +91 7581841039</p>
          <p><MessageCircle/> WhatsApp: +91 7581841039</p>
          <p>Instagram: @officialbhagyashreedigital</p>
          <p><Mail/> bhagyashreedigital.in@gmail.com</p>
          <p><MapPin/> Vijay Nagar Square, Indore</p>
        </div>
        <form onSubmit={submitLead}>
          <input placeholder="Your Name" value={lead.name} onChange={e=>setLead({...lead,name:e.target.value})} required/>
          <input placeholder="Phone Number" value={lead.phone} onChange={e=>setLead({...lead,phone:e.target.value})} required/>
          <select value={lead.service} onChange={e=>setLead({...lead,service:e.target.value})}><option>Website Development</option><option>CRM Automation</option><option>Digital Marketing</option><option>AI Solutions</option></select>
          <textarea placeholder="Tell us about your business" value={lead.message} onChange={e=>setLead({...lead,message:e.target.value})}></textarea>
          <button>Send Enquiry</button>
        </form>
      </div>
    </section>

    <a className="floatWa" href={waMsg("Hi Bhagyashree Digital, I want to discuss my project.")} target="_blank">💬 WhatsApp</a>
  </main>
}

createRoot(document.getElementById("root")).render(<App/>);
