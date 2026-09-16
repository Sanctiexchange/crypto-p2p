import Card from "../../components/common/Card";

function Transactions() {
  return (
    <div className="mx-auto max-w-7xl">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-900">
          Transactions
        </h1>

        <p className="mt-1 text-sm text-slate-500">
          View your transaction history.
        </p>
      </div>

      <Card className="p-6">
        <p className="text-sm text-slate-500">
          Your transactions will appear here.
        </p>
      </Card>
    </div>
  );
}

export default Transactions;