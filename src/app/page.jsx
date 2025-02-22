import BarChart from "@/components/BarChart";

const employees = [
  {
    name: "John Doe",
    email: "john.doe@example.com",
    role: "Sales Manager",
  },
  {
    name: "Jane Smith",
    email: "jane.smith@example.com",
    role: "Lead Generation Specialist",
  },
  {
    name: "Alice Johnson",
    email: "alice.johnson@example.com",
    role: "Marketing Executive",
  },
  {
    name: "Bob Williams",
    email: "bob.williams@example.com",
    role: "Business Development Manager",
  },
  {
    name: "Emily Brown",
    email: "emily.brown@example.com",
    role: "Customer Success Manager",
  },
  {
    name: "Michael Scott",
    email: "michael.scott@example.com",
    role: "Regional Manager",
  },
];

const leads = {
  totalLeads: 1250, // Total leads
  monthlyLeads: [
    {
      month: "Feb 2024",
      total: 123,
      categories: {
        "KKC IT": 30,
        IELTS: 25,
        "SPOKEN ENGLISH": 20,
        "Study abroad UK (UWS)": 25,
        MBBS: 20,
      },
    },
    {
      month: "Jan 2024",
      total: 95,
      categories: {
        "KKC IT": 20,
        IELTS: 15,
        "SPOKEN ENGLISH": 15,
        "Study abroad UK (UWS)": 25,
        MBBS: 20,
      },
    },
    {
      month: "Dec 2023",
      total: 110,
      categories: {
        "KKC IT": 25,
        IELTS: 20,
        "SPOKEN ENGLISH": 25,
        "Study abroad UK (UWS)": 20,
        MBBS: 20,
      },
    },
    {
      month: "Nov 2023",
      total: 105,
      categories: {
        "KKC IT": 20,
        IELTS: 30,
        "SPOKEN ENGLISH": 15,
        "Study abroad UK (UWS)": 20,
        MBBS: 20,
      },
    },
    {
      month: "Oct 2023",
      total: 130,
      categories: {
        "KKC IT": 35,
        IELTS: 25,
        "SPOKEN ENGLISH": 20,
        "Study abroad UK (UWS)": 30,
        MBBS: 20,
      },
    },
    {
      month: "Sep 2023",
      total: 115,
      categories: {
        "KKC IT": 30,
        IELTS: 25,
        "SPOKEN ENGLISH": 20,
        "Study abroad UK (UWS)": 20,
        MBBS: 20,
      },
    },
    {
      month: "Aug 2023",
      total: 90,
      categories: {
        "KKC IT": 20,
        IELTS: 20,
        "SPOKEN ENGLISH": 15,
        "Study abroad UK (UWS)": 20,
        MBBS: 15,
      },
    },
    {
      month: "Jul 2023",
      total: 85,
      categories: {
        "KKC IT": 15,
        IELTS: 20,
        "SPOKEN ENGLISH": 15,
        "Study abroad UK (UWS)": 20,
        MBBS: 15,
      },
    },
    {
      month: "Jun 2023",
      total: 100,
      categories: {
        "KKC IT": 25,
        IELTS: 20,
        "SPOKEN ENGLISH": 15,
        "Study abroad UK (UWS)": 20,
        MBBS: 20,
      },
    },
    {
      month: "May 2023",
      total: 125,
      categories: {
        "KKC IT": 30,
        IELTS: 25,
        "SPOKEN ENGLISH": 20,
        "Study abroad UK (UWS)": 30,
        MBBS: 20,
      },
    },
    {
      month: "Apr 2023",
      total: 110,
      categories: {
        "KKC IT": 25,
        IELTS: 20,
        "SPOKEN ENGLISH": 20,
        "Study abroad UK (UWS)": 25,
        MBBS: 20,
      },
    },
    {
      month: "Mar 2023",
      total: 115,
      categories: {
        "KKC IT": 30,
        IELTS: 20,
        "SPOKEN ENGLISH": 20,
        "Study abroad UK (UWS)": 25,
        MBBS: 20,
      },
    },
  ],
};

const page = () => {
  const leadPercentageIncrease = () => {
    const lastTwoMonthLeads = leads.monthlyLeads.slice(0, 2);
    const percentageIncrease =
      ((lastTwoMonthLeads[0].total - lastTwoMonthLeads[1].total) /
        lastTwoMonthLeads[1].total) *
      100;
    return percentageIncrease.toFixed(2);
  };
  return (
    <div className="flex flex-col items-start justify-start gap-3 w-full px-5">
      <section className="flex justify-start items-center gap-3">
        <section className="rounded-md border border-gray-300 p-4 shadow-lg h-72 overflow-scroll overflow-x-hidden custom-scrollbar max-w-72">
          <h3 className="text-sm font-bold">Employees</h3>
          <h4 className="font-light text-xs">Add new employees</h4>
          <section className="flex flex-col gap-2 mt-2">
            {employees.map((employee, index) => (
              <div key={index} className="flex items-center justce gap-2">
                <div className="rounded-full bg-gray-300 w-7 h-7"></div>
                <div className="flex flex-col text-xs">
                  <span className="font-semibold">{employee.name}</span>
                  <span className="font-light">{employee.email}</span>
                </div>
              </div>
            ))}
          </section>
        </section>

        <section className="rounded-md border border-gray-300 p-4 shadow-lg h-72 ">
          <h3 className="text-sm font-bold">Leads</h3>
          <span className="text-lg font-bold">+{leads.totalLeads}</span>
          <span className="text-xs font-light block">
            +{leadPercentageIncrease()}% from last month
          </span>
          <BarChart leads={leads} />
        </section>
      </section>
    </div>
  );
};

export default page;
