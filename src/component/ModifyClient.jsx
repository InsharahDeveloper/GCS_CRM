import { useState } from "react";
import ClientForm from "./AddClient";

function ModifyClient() {

  const [email, setEmail] = useState("");
  const [client, setClient] = useState(null);

  const handleSearch = async () => {
  if (!email.trim()) return alert("Enter GV Email");

  const res = await fetch(
    `https://sheetdb.io/api/v1/cf5t8gxeeodoz/search?gvEmail=${email.trim()}`
  );

  const data = await res.json();

  if (data.length > 0) {
    setClient(data[0]);
  } else {
    alert("Client not found");
  }
};

  return (
    <div>
      <div className="flex gap-3 mb-4 p-5">
        <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter GV Email" className="input" />
        <button onClick={handleSearch} className="btn">Search</button>
      </div>

      {client && <ClientForm editModeProp={true} existingData={client} />}
    </div>
  );
}

export default ModifyClient