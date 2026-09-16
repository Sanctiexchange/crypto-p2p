import Card from "../../components/common/Card";

function Wallet() {
  return (
    <div className="mx-auto max-w-7xl">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-900">
          Wallet
        </h1>

        <p className="mt-1 text-sm text-slate-500">
          Manage your crypto assets and balances.
        </p>
      </div>

      <Card className="p-6">
        <p className="text-sm text-slate-500">
          Your crypto balances will appear here.
        </p>
      </Card>
    </div>
  );
}

export default Wallet;