import DataChart from "./data-chart/page";

export default function Home() {
  return (
    <div>
      <div className="w-full flex flex-col max-h-dvh h-screen">
        <div className="w-full flex justify-center">
          <h1>Real State Analytics</h1>
        </div>
        <div className="h-[90%]">
          <DataChart />
        </div>
      </div>
    </div>
  );
}
