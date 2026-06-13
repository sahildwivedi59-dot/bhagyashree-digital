
const express=require("express");
const cors=require("cors");
const fs=require("fs");
const path=require("path");

const app=express();
app.use(cors());
app.use(express.json());

const file=path.join(__dirname,"data","leads.json");

function read(){
  if(!fs.existsSync(file)) return [];
  return JSON.parse(fs.readFileSync(file,"utf8"));
}
function write(data){
  fs.writeFileSync(file,JSON.stringify(data,null,2));
}

app.get("/",(req,res)=>res.json({message:"Bhagyashree Digital Backend Running"}));

app.get("/api/leads",(req,res)=>{
  res.json({leads:read()});
});

app.post("/api/leads",(req,res)=>{
  const {name,phone,type,service,message}=req.body;
  if(!name || !phone) return res.status(400).json({message:"Name and phone required"});
  const leads=read();
  const lead={
    id:Date.now().toString(),
    name,
    phone,
    type:type||"",
    service:service||"",
    message:message||"",
    status:"New",
    createdAt:new Date().toISOString()
  };
  leads.unshift(lead);
  write(leads);
  res.status(201).json({message:"Lead saved",lead});
});

app.patch("/api/leads/:id",(req,res)=>{
  const leads=read();
  const i=leads.findIndex(l=>l.id===req.params.id);
  if(i<0) return res.status(404).json({message:"Lead not found"});
  leads[i]={...leads[i],...req.body,updatedAt:new Date().toISOString()};
  write(leads);
  res.json({message:"Lead updated",lead:leads[i]});
});

app.delete("/api/leads/:id",(req,res)=>{
  write(read().filter(l=>l.id!==req.params.id));
  res.json({message:"Lead deleted"});
});

app.listen(5000,()=>console.log("Backend running on http://localhost:5000"));
