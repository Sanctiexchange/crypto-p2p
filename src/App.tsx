import { Navigate, Route, Routes } from "react-router-dom";

import MainLayout from "./components/layout/MainLayout";

import Dashboard from "./pages/dashboard/Dashboard";
import P2PMarketplace from "./pages/P2P/P2PMarketplace";
import Orders from "./pages/orders/Orders";
import Wallet from "./pages/wallet/Wallet";
import Transactions from "./pages/transactions/Transactions";
import Profile from "./pages/profile/Profile";
import Settings from "./pages/settings/Settings"
import Security from "./pages/settings/Security";
import OfferDetails from "./pages/P2P/OfferDetails";

function App() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<Dashboard />} />

        <Route
          path="/p2p"
          element={<P2PMarketplace />}
        />

        <Route
          path="/orders"
          element={<Orders />}
        />

        <Route
          path="/wallet"
          element={<Wallet />}
        />

        <Route
          path="/transactions"
          element={<Transactions />}
        />

        <Route
          path="/profile"
          element={<Profile />}
        />
        <Route
          path="/settings/security"
          element={<Security />}
        />

        <Route
          path="/settings"
          element={<Settings />}
        />


        <Route
          path="/p2p/offer/:offerId"
          element={<OfferDetails />}
        />
        <Route
          path="*"
          element={<Navigate to="/" replace />}
        />
      </Route>
    </Routes>
  );
}

export default App;