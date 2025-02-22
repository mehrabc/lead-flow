import Lead from "@/models/Lead"
async function getLeads() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_WEBSITE_URL}/api/leads`, {
    cache: "no-store", // Prevent caching (similar to getServerSideProps)
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch: ${res.status} ${res.statusText}`);
  }

  return res.json();
}

const page = async () => {
  const data = await getLeads();

  // let fetchedData = await fetch(`${process.env.NEXT_PUBLIC_WEBSITE_URL}/api/leads`)
  // const data = await fetchedData.json();
  console.log("THIS IS THE FETCHED DATA", data)
  return (
    <div className="flex flex-col gap-3 justify-start items-center text-lg font-semibold">
      {data.leads.map((lead, index) => (
        <ul key={index} className="list-disc">
          <li> {lead.entry[0].changes[0].field} : <span className="underline ">{lead.entry[0].changes[0].value}</span></li>

        </ul>
      ))}
    </div>
  )
}

export default page