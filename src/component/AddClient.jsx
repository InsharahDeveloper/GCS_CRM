import { useState, useEffect } from "react";


function AddClient({ editModeProp = false, existingData = null }) {

  const [editMode, setEditMode] = useState(editModeProp);
  const [success, setSuccess] = useState(false);

  const [form, setForm] = useState({
    id: "",
    clientName: "",
    businessName: "",
    clientEmail: "",
    clientWhatsapp: "",
    gvCountry: "",
    price: "",
    currency: "$",
    gvEmail: "",
    gvPassword: "",
    purchaseDate: "",
    renewalDate: "",
    status: "Active",
    notes: "",
  });

  const [loading, setLoading] = useState(false);

  const countries = ["USA", "UK", "CANADA", "Australia", "Italy", "Germany", "Ireland", "Europe", "Spain", "Belgium", "Switzerland", "Denmark", "France", "Netherlands", "Sweden", "Custom"];

  useEffect(() => {
    if (existingData) {
      setForm(existingData);
      setEditMode(true);
    }
  }, [existingData]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let uniqueId = editMode ? form.id : Date.now().toString();

    if (!form.clientName.trim()) return alert("Client Name required");
    if (!form.clientEmail.includes("@")) return alert("Invalid Email");
    if (isNaN(form.price) || form.price === "") return alert("Price must be number");
    if (!form.gvCountry) return alert("Select Country");
    if (!form.clientWhatsapp.trim()) return alert("Whatsapp required");

    setLoading(true);

    const formattedForm = {
      ...form,
      id: uniqueId,
      price: form.currency === "$" ? `${form.price}$` : `${form.price}pkr`,
    };

    const safeForm = Object.fromEntries(
      Object.entries(formattedForm).map(([k, v]) => [k, v || ""])
    );

    try {
      const url = editMode
        ? `https://sheetdb.io/api/v1/cf5t8gxeeodoz/gvEmail/${form.gvEmail}`
        : "https://sheetdb.io/api/v1/cf5t8gxeeodoz";

      const method = editMode ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ data: [safeForm] }),
      });

      if (res.ok) {
        setSuccess(true);
        setTimeout(() => setSuccess(false), 2000);

        if (!editMode) {
          setForm({
            id: "",
            clientName: "",
            businessName: "",
            clientEmail: "",
            clientWhatsapp: "",
            gvCountry: "",
            price: "",
            currency: "$",
            gvEmail: "",
            gvPassword: "",
            purchaseDate: "",
            renewalDate: "",
            status: "Active",
            notes: "",
          });
        }
      } else {
        alert("Error saving data");
      }

    } catch {
      alert("Network Error");
    }

    setLoading(false);
  };

  return (
    <div className="flex justify-center overflow-hidden sec">
{success && (
  <div className="fixed py-10 lg:px-8 text-center bg-white top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[fit-centent] h-[fit-content] lg:text-2xl flex items-center justify-center p-3 rounded-xl shadow-2xl border border-orange-400">
    Client Saved Successfully ✅
  </div>
)}
      <div className="w-full max-w-5xl sec bg-white p-6 shadow">

        <h1 className="text-2xl mb-4">{editMode ? "Edit Client" : "Add Client"}</h1>

        <form onSubmit={handleSubmit} className="space-y-4">

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <input name="clientName" value={form.clientName} onChange={handleChange} placeholder="Client Name" className="input" />
            <input name="businessName" value={form.businessName} onChange={handleChange} placeholder="Business Name" className="input" />
            <input name="clientEmail" value={form.clientEmail} onChange={handleChange} placeholder="Email" className="input" />
            <input name="clientWhatsapp" value={form.clientWhatsapp} onChange={handleChange} placeholder="WhatsApp" className="input" />

            <select name="gvCountry" value={form.gvCountry} onChange={handleChange} className="input">
              <option value="">Select Country</option>
              {countries.map(c => <option key={c}>{c}</option>)}
            </select>

            <div className="flex border border-gray-300 rounded-lg overflow-hidden">
              <input
                type="number"
                name="price"
                value={form.price}
                onChange={handleChange}
                placeholder="Enter price"
                className="w-full px-3 py-2 outline-none"
              />

              <select
                name="currency"
                value={form.currency}
                onChange={handleChange}
                className="bg-gray-100 px-3 border-l"
              >
                <option value="$">USD $</option>
                <option value="pkr">PKR</option>
              </select>
            </div>
            <input name="gvEmail" value={form.gvEmail} onChange={handleChange} placeholder="GV Email" className="input" />
            <input type="password" name="gvPassword" value={form.gvPassword} onChange={handleChange} placeholder="Password" className="input" />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <input type="date" name="purchaseDate" value={form.purchaseDate} onChange={handleChange} className="input" />
            <input type="date" name="renewalDate" value={form.renewalDate} onChange={handleChange} className="input" />
          </div>

          <textarea name="notes" value={form.notes} onChange={handleChange} className="input" placeholder="Notes"></textarea>

          <button className="btn w-full">
            {loading ? "Saving..." : editMode ? "Update Client" : "Save Client"}
          </button>

        </form>
      </div>
    </div>
  );
}


export default AddClient