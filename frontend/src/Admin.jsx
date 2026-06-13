
import React,{useEffect,useState} from "react";
import {createRoot} from "react-dom/client";
import {Lock, Search, Trash2, LogOut, RefreshCw, Phone, MessageCircle} from "lucide-react";
import "./style.css";

const API="http://localhost:5000";
const ADMIN_EMAIL="admin@bhagyashreedigital.in";
const ADMIN_PASS="admin123";

function Admin(){
 const [logged,setLogged]=useState(localStorage.getItem("bd_admin_login")==="yes");
 const [login,setLogin]=useState({email:ADMIN_EMAIL,password:ADMIN_PASS});
 const [leads,setLeads]=useState([]);
 const [q,setQ]=useState("");
 const [status,setStatus]=useState("All");

 async function load(){
  try{
    const r=await fetch(`${API}/api/leads`);
    const d=await r.json();
    setLeads(d.leads||[]);
  }catch(e){ alert("Backend not running. Run npm run dev"); }
 }
 useEffect(()=>{ if(logged) load(); },[logged]);

 function doLogin(e){
  e.preventDefault();
  if(login.email===ADMIN_EMAIL && login.password===ADMIN_PASS){
    localStorage.setItem("bd_admin_login","yes");
    setLogged(true);
  } else alert("Wrong email or password");
 }
 function logout(){
  localStorage.removeItem("bd_admin_login");
  setLogged(false);
 }

 async function updateStatus(id,newStatus){
  await fetch(`${API}/api/leads/${id}`,{method:"PATCH",headers:{"Content-Type":"application/json"},body:JSON.stringify({status:newStatus})});
  load();
 }
 async function del(id){
  if(!confirm("Delete this lead?")) return;
  await fetch(`${API}/api/leads/${id}`,{method:"DELETE"});
  load();
 }

 const filtered=leads
  .filter(l=>status==="All" ? true : l.status===status)
  .filter(l=>(l.name+l.phone+l.type+l.service+l.message+l.status).toLowerCase().includes(q.toLowerCase()));

 if(!logged) return <main className="loginPage">
  <form className="loginBox" onSubmit={doLogin}>
    <Lock size={38}/>
    <h2>Bhagyashree Digital Admin</h2>
    <input value={login.email} onChange={e=>setLogin({...login,email:e.target.value})}/>
    <input type="password" value={login.password} onChange={e=>setLogin({...login,password:e.target.value})}/>
    <button>Login</button>
    <p>Demo login: admin@bhagyashreedigital.in / admin123</p>
  </form>
 </main>;

 return <main className="adminMain">
  <nav>
    <div className="logo">BD Admin</div>
    <div className="navlinks">
      <button onClick={load}><RefreshCw size={16}/> Refresh</button>
      <button onClick={logout}><LogOut size={16}/> Logout</button>
    </div>
  </nav>

  <section className="adminHero">
    <h1>Lead Management Dashboard</h1>
    <p>Manage website enquiries, WhatsApp leads, services and follow-up status.</p>
  </section>

  <section className="adminStats">
    <div><b>{leads.length}</b><span>Total Leads</span></div>
    <div><b>{leads.filter(l=>l.status==="New").length}</b><span>New</span></div>
    <div><b>{leads.filter(l=>l.status==="Contacted").length}</b><span>Contacted</span></div>
    <div><b>{leads.filter(l=>l.status==="Converted").length}</b><span>Converted</span></div>
  </section>

  <section className="adminPanel">
    <div className="panelHead">
      <h2>All Leads</h2>
      <div className="tools">
        <label><Search size={18}/><input placeholder="Search lead..." value={q} onChange={e=>setQ(e.target.value)}/></label>
        <select value={status} onChange={e=>setStatus(e.target.value)}>
          <option>All</option><option>New</option><option>Contacted</option><option>Converted</option><option>Closed</option>
        </select>
      </div>
    </div>

    <div className="leadTable">
      <div className="leadRow head"><span>Name</span><span>Phone</span><span>Business</span><span>Service</span><span>Status</span><span>Action</span></div>
      {filtered.map(l=><div className="leadRow" key={l.id}>
        <span><b>{l.name}</b><small>{new Date(l.createdAt).toLocaleString()}</small></span>
        <span>{l.phone}</span>
        <span>{l.type}</span>
        <span>{l.service}<small>{l.message}</small></span>
        <span><select value={l.status} onChange={e=>updateStatus(l.id,e.target.value)}>
          <option>New</option><option>Contacted</option><option>Converted</option><option>Closed</option>
        </select></span>
        <span className="rowActions">
          <a target="_blank" href={`tel:${l.phone}`}><Phone size={16}/></a>
          <a target="_blank" href={`https://wa.me/91${l.phone}?text=Hi%20${l.name},%20this%20is%20Bhagyashree%20Digital.%20We%20received%20your%20enquiry%20for%20${l.service}.`}><MessageCircle size={16}/></a>
          <button className="delete" onClick={()=>del(l.id)}><Trash2 size={16}/></button>
        </span>
      </div>)}
    </div>
  </section>
 </main>
}

createRoot(document.getElementById("admin-root")).render(<Admin/>);
