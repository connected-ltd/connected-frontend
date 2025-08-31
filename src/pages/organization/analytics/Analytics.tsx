import EmptyState from "@/components/ui/EmptyState";
import LGAHeatmap from "./LgaHeatMap";
import CustomTable from "@/custom-components/CustomTable";
import PageHeader from "@/components/ui/PageHeader";

const Analytics = () => {
  const googleMapsApiKey = import.meta.env.VITE_GOOGLE_CLOUD_API_KEY;

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

  return (
    <div>
      <PageHeader
        header={"Analytics"}
        subHeader={"View your heatmap and analytics here"}
      />
      <div className="space-y-6 my-4">
        <LGAHeatmap
          googleMapsApiKey={googleMapsApiKey}
          className="w-full h-[50vh] rounded-lg border border-gray-200"
        />

        <div>
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

export default Analytics;
