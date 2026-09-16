import MainLayout from "./components/layout/MainLayout";
import Button from "./components/common/Button";
import Card from "./components/common/Card";
import Badge from "./components/common/Badge";

function App() {
  return (
    <MainLayout>
      <div className="mx-auto max-w-7xl">
        <div className="mb-8">
          <p className="text-sm font-medium text-blue-600">
            Welcome back
          </p>

          <h1 className="mt-1 text-2xl font-bold text-slate-900">
            Dashboard
          </h1>

          <p className="mt-1 text-sm text-slate-500">
            Manage your crypto assets and P2P trades.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <Card className="p-6">
            <p className="text-sm text-slate-500">
              Total Balance
            </p>

            <h2 className="mt-2 text-2xl font-bold text-slate-900">
              ₦0.00
            </h2>

            <p className="mt-2 text-xs text-slate-400">
              Nigerian Naira
            </p>
          </Card>

          <Card className="p-6">
            <p className="text-sm text-slate-500">
              BTC Balance
            </p>

            <h2 className="mt-2 text-2xl font-bold text-slate-900">
              0.000000 BTC
            </h2>

            <Badge variant="info">
              Bitcoin
            </Badge>
          </Card>

          <Card className="p-6">
            <p className="text-sm text-slate-500">
              Account Status
            </p>

            <div className="mt-3">
              <Badge variant="success">
                Verified
              </Badge>
            </div>

            <p className="mt-2 text-xs text-slate-400">
              Your account is ready for trading.
            </p>
          </Card>
        </div>

        <Card className="mt-6 p-6">
          <h2 className="text-lg font-semibold text-slate-900">
            Quick Actions
          </h2>

          <div className="mt-4 flex flex-wrap gap-3">
            <Button>
              Buy Crypto
            </Button>

            <Button variant="outline">
              Sell Crypto
            </Button>

            <Button variant="secondary">
              View Wallet
            </Button>
          </div>
        </Card>
      </div>
    </MainLayout>
  );
}

export default App;