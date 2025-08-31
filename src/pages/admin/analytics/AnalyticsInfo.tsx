import CustomTable from "@/custom-components/CustomTable";
import EmptyState from "@/components/ui/EmptyState";
import InOutBarChart from "@/components/charts/InOutBarChart";
import PageHeader from "@/components/ui/PageHeader";

const AnalyticsInfo = () => {
  const columns = [
    {
      key: "user_id",
      header: "User ID",
      width: "col-span-1",
      filterable: true,
    },
    {
      key: "question",
      header: "Question/ Query",
      width: "col-span-4",
      filterable: true,
    },
    {
      key: "timestamp",
      header: "Timestamp",
      width: "col-span-2",
      filterable: true,
    },
    {
      key: "keyword",
      header: "Topic/ Keyword",
      width: "col-span-2",
      filterable: true,
    },
    {
      key: "analysis",
      header: "Analysis",
      width: "col-span-1",
      filterable: true,
    },
  ];

  // sample values
  const labels = ["Fri", "Sat", "Sun", "Mon", "Tue", "Wed", "Thur"];
  const inData = [300, 310, 400, 620, 450, 470, 530];
  const outData = [410, 550, 700, 360, 640, 310, 650];

  return (
    <div className="space-y-6">
      <PageHeader
        header={"Analytics"}
        subHeader={"Here's some analytics of messages sent."}
      />

      <InOutBarChart labels={labels} inData={inData} outData={outData} />

      <div className="bg-[#F6F5F4] dark:bg-[#A2C8E8] p-2 rounded-lg">
        {/* {messages && messages?.data.length === 0 ? ( */}
        {faqs && faqs.length === 0 ? (
          <EmptyState
            header="No Questions Found"
            message="Questions hasn't been asked yet."
          />
        ) : (
          <div className="overflow-x-auto">
            <div>
              <CustomTable
                columns={columns}
                data={faqs ?? []}
                // isFetching={isFetchingMessages}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const faqs = [
  {
    id: 1,
    user_id: 10023,
    question: "How do I prevent cholera?",
    timestamp: "2023-10-01T12:00:00Z",
    keyword: "Cholera",
    analysis: "50%",
  },
  {
    id: 2,
    user_id: 10024,
    question: "What is cholera about?",
    timestamp: "2023-10-01T12:00:00Z",
    keyword: "Cholera",
    analysis: "50%",
  },
  {
    id: 3,
    user_id: 10025,
    question:
      "What type of drinking water is safe to drink to prevent cholera?",
    timestamp: "2023-10-01T12:00:00Z",
    keyword: "Cholera",
    analysis: "50%",
  },
  {
    id: 4,
    user_id: 10026,
    question: "Menene cholera?",
    timestamp: "2023-10-01T12:00:00Z",
    keyword: "Cholera",
    analysis: "50%",
  },
  {
    id: 5,
    user_id: 10027,
    question: "Ya zan warkar da cutar cholera?",
    timestamp: "2023-10-01T12:00:00Z",
    keyword: "Cholera",
    analysis: "50%",
  },
];

export default AnalyticsInfo;
