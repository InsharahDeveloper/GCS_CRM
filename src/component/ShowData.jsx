import { useEffect, useState } from "react";

function ShowData() {

  const [clients, setClients] = useState([]);
  const [country, setCountry] = useState("");
  const [upcoming, setUpcoming] = useState([]);
const [renewalFilter, setRenewalFilter] = useState("");

  const countries = [
    "USA","UK","CANADA","Australia","Italy","Germany","Ireland",
    "Europe","Spain","Belgium","Switzerland","Denmark","France",
    "Netherlands","Sweden","Custom"
  ];

  useEffect(() => {
    fetch("https://sheetdb.io/api/v1/cf5t8gxeeodoz")
      .then(res => res.json())
      .then(data => {
        setClients(data);

        const today = new Date();

        const upcomingClients = data.filter(c => {
          const renewal = new Date(c.renewalDate);
          const diff = (renewal - today) / (1000 * 60 * 60 * 24);
          return diff <= 1 && diff >= 0;
        });

        setUpcoming(upcomingClients);
      });
  }, []);

  // 🎯 FILTER LOGIC
  const filtered = clients.filter(c => {

    const matchCountry = country ? c.gvCountry === country : true;

    const today = new Date();
    const renewal = new Date(c.renewalDate);
    const diff = (renewal - today) / (1000 * 60 * 60 * 24);

    const matchUpcoming =
  renewalFilter === "upcoming"
    ? diff <= 1 && diff >= 0
    : true;

    return matchCountry && matchUpcoming;
  });

  return (
    <div className="p-2 sm:p-4">

      {/* 🔔 ALERT */}
      {upcoming.length > 0 && (
        <div className="bg-orange-200 p-3 rounded mb-5 text-sm sm:text-base">
          ⚠️ {upcoming.length} client(s) renewal in 1 day
        </div>
      )}

      {/* 🎛 FILTERS */}
      <div className="flex flex-col sm:flex-row gap-3 mb-4">

        {/* COUNTRY FILTER */}
        <select
          onChange={(e) => setCountry(e.target.value)}
          className="input w-full sm:w-auto"
        >
          <option value="">All Countries</option>
          {countries.map((c, i) => (
            <option key={i} value={c}>{c}</option>
          ))}
        </select>

        {/* UPCOMING FILTER BUTTON */}
       <select
  onChange={(e) => setRenewalFilter(e.target.value)}
  className="input w-full sm:w-auto"
>
  <option value="">All Renewal</option>
  <option value="upcoming">Renewal Coming Soon</option>
</select>

      </div>

      {/* 📊 TABLE */}
      <div className="overflow-x-auto">
        <table className="w-full border-2 border-collapse text-xs sm:text-sm">
          <thead>
            <tr className="bg-orange-400 text-white">
              <th className="p-2 border-black border-1">Name</th>
              <th className="p-2 border-black border-1">Whatsapp</th>
              <th className="p-2 border-black border-1">Country</th>
              <th className="p-2 border-black border-1">Price</th>
              <th className="p-2 border-black border-1">GV Email</th>
              <th className="p-2 border-black border-1">Renewal</th>
              <th className="p-2 border-black border-1">Notes</th>
            </tr>
          </thead>

          <tbody>
            {filtered.map((c, i) => (
              <tr key={i} className="border-b hover:bg-gray-50">
                <td className="p-2 border-1">{c.clientName}</td>
                <td className="p-2 border-1">{c.clientWhatsapp}</td>
                <td className="p-2 border-1">{c.gvCountry}</td>
                <td className="p-2 border-1">{c.price}</td>
                <td className="p-2 border-1">{c.gvEmail}</td>
                <td className="p-2 border-1">{c.renewalDate}</td>
                <td className="p-2 border-1">{c.notes}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* STYLE */}
      <style>{`
        .input {
          padding: 10px;
          border: 1px solid #ccc;
          border-radius: 8px;
        }
      `}</style>

    </div>
  );
}

export default ShowData;