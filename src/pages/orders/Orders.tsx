import Card from "../../components/common/Card";

function Orders() {
  return (
    <div className="mx-auto max-w-7xl">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-900">
          Orders
        </h1>

        <p className="mt-1 text-sm text-slate-500">
          Track your P2P trading orders.
        </p>
      </div>

      <Card className="p-6">
        <p className="text-sm text-slate-500">
          Your orders will appear here.
        </p>
      </Card>
    </div>
  );
}

export default Orders;