import Card from "../../components/common/Card";

function P2PMarketplace() {
  return (
    <div className="mx-auto max-w-7xl">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-900">
          P2P Marketplace
        </h1>

        <p className="mt-1 text-sm text-slate-500">
          Buy and sell crypto directly with other traders.
        </p>
      </div>

      <Card className="p-6">
        <h2 className="text-lg font-semibold text-slate-900">
          Marketplace
        </h2>

        <p className="mt-2 text-sm text-slate-500">
          P2P offers will appear here.
        </p>
      </Card>
    </div>
  );
}

export default P2PMarketplace;