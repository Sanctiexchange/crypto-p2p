import Card from "../../components/common/Card";

function Security() {
  return (
    <div className="mx-auto max-w-7xl">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-900">
          Security
        </h1>

        <p className="mt-1 text-sm text-slate-500">
          Manage your account security and protection.
        </p>
      </div>

      <Card className="p-6">
        <p className="text-sm text-slate-500">
          Security settings will appear here.
        </p>
      </Card>
    </div>
  );
}

export default Security;