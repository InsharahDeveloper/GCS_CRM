import { useState } from "react";

export default function AddClient() {
  const [form, setForm] = useState({
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

  const countries = [
    "USA",
    "UK",
    "CANADA",
    "Australia",
    "Italy",
    "Germany",
    "Ireland",
    "Europe",
    "Spain",
    "Belgium",
    "Switzerland",
    "Denmark",
    "France",
    "Netherlands",
    "Sweden",
    "Custom",
  ];

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

const handleSubmit = async (e) => {
  e.preventDefault();
  setLoading(true);

  // ✅ Format price properly
  const formattedForm = {
    ...form,
    price:
      form.currency === "$"
        ? `${form.price}$`
        : `${form.price}pkr`,
  };

  // ✅ Make all values safe (no undefined/null)
  const safeForm = Object.fromEntries(
    Object.entries(formattedForm).map(([k, v]) => [k, v || ""])
  );

  console.log("Sending Data:", safeForm); // 🔍 Debug

  try {
    const response = await fetch(
      "https://sheetdb.io/api/v1/cf5t8gxeeodoz",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          data: [safeForm], // ✅ MUST be array
        }),
      }
    );

    const result = await response.json();

    if (response.ok) {
      alert("Client Saved Successfully! 🚀");

      setForm({
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
    } else {
      console.log("SheetDB Error:", result);
      alert(result?.error || "SheetDB Error");
    }
  } catch (error) {
    console.log("Network Error:", error);
    alert("Network Error");
  }

  setLoading(false);
};

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center p-4">

      <div className="w-full max-w-5xl bg-white rounded-2xl shadow-xl p-6 md:p-8">

        <h1 className="text-3xl font-bold mb-6">📋 Add New Client</h1>

        <form onSubmit={handleSubmit} className="space-y-5">

          {/* GRID */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

            <input
              required
              name="clientName"
              value={form.clientName}
              onChange={handleChange}
              placeholder="Client Name"
              className="input"
            />

            <input
              name="businessName"
              value={form.businessName}
              onChange={handleChange}
              placeholder="Business Name"
              className="input"
            />

            <input
              required
              name="clientEmail"
              value={form.clientEmail}
              onChange={handleChange}
              placeholder="Client Email"
              className="input"
            />

            {/* WHATSAPP */}
            <input
              name="clientWhatsapp"
              value={form.clientWhatsapp}
              onChange={(e) => {
                let value = e.target.value.replace(/[^0-9]/g, "");
                if (value.length <= 15) {
                  setForm((prev) => ({
                    ...prev,
                    clientWhatsapp: value,
                  }));
                }
              }}
              placeholder="WhatsApp Number"
              className="input"
            />

            {/* GV COUNTRY */}
            <select
              required
              name="gvCountry"
              value={form.gvCountry}
              onChange={handleChange}
              className="input"
            >
              <option value="">Select GV Country</option>
              {countries.map((c, i) => (
                <option key={i} value={c}>
                  {c}
                </option>
              ))}
            </select>

            {/* PRICE */}
            <div className="w-full">
              <div className="flex items-stretch border border-gray-300 rounded-lg overflow-hidden focus-within:ring-2 focus-within:ring-blue-500">

                <input
                  required
                  name="price"
                  value={form.price}
                  onChange={handleChange}
                  placeholder="Enter price"
                  className="w-full px-3 py-3 outline-none border-none"
                />

                <select
                  name="currency"
                  value={form.currency}
                  onChange={handleChange}
                  className="bg-gray-100 px-3 text-sm outline-none border-l border-gray-300"
                >
                  <option value="$">USD $</option>
                  <option value="pkr">PKR</option>
                </select>

              </div>
            </div>

            <input
              required
              name="gvEmail"
              value={form.gvEmail}
              onChange={handleChange}
              placeholder="GV Email ID"
              className="input"
            />

            <input
              required
              type="password"
              name="gvPassword"
              value={form.gvPassword}
              onChange={handleChange}
              placeholder="GV Password"
              className="input"
            />

          </div>

          {/* DATES */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

            <input
              required
              type="date"
              name="purchaseDate"
              value={form.purchaseDate}
              onChange={handleChange}
              className="input"
            />

            <input
              required
              type="date"
              name="renewalDate"
              value={form.renewalDate}
              onChange={handleChange}
              className="input"
            />

          </div>

          {/* STATUS */}
          <select
            name="status"
            value={form.status}
            onChange={handleChange}
            className="input"
          >
            <option>Active</option>
            <option>Expired</option>
            <option>Pending</option>
          </select>

          {/* NOTES */}
          <textarea
            name="notes"
            value={form.notes}
            onChange={handleChange}
            placeholder="Notes..."
            rows="4"
            className="input"
          />

          {/* BUTTON */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white py-3 rounded-xl font-semibold"
          >
            {loading ? "Saving..." : "Save Client"}
          </button>

        </form>
      </div>

      {/* STYLE */}
      <style>{`
        .input {
          width: 100%;
          padding: 12px;
          border: 1px solid #d1d5db;
          border-radius: 10px;
          outline: none;
        }
        .input:focus {
          border-color: #3b82f6;
          box-shadow: 0 0 0 2px #3b82f6;
        }
      `}</style>

    </div>
  );
}