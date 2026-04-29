import { useState } from "react";
import ClientForm from "../component/AddClient";
import ModifyClient from "../component/ModifyClient";

function ClientDashboard() {
  const [tab, setTab] = useState("add");

  return (
    <div className="p-5 min-h-screen grid  justify-center bg-gray-100">
        <div className="w-[90vw] min-[340px]:w-[80vw]">
      <div className="flex gap-3 wrap">
<button
  onClick={() => setTab("add")}
  className={`tabBtn ${tab === "add" ? "activeTab" : ""}`}
>
  Add Client
</button>       
<button
  onClick={() => setTab("modify")}
  className={`tabBtn ${tab === "modify" ? "activeTab" : ""}`}
>
  Modify Client
</button>
      </div>
        <div className="bg-white sec min-h-[80vh]">
      {tab === "add" && <ClientForm />}
      {tab === "modify" && <ModifyClient />}
      </div>

      </div>
    </div>
  );
}


export default ClientDashboard