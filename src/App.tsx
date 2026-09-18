import { Navigate, Route, Routes } from "react-router-dom";

import MainLayout from "./components/layout/MainLayout";

import Dashboard from "./pages/dashboard/Dashboard";
import P2PMarketplace from "./pages/P2P/P2PMarketplace";
import OfferDetails from "./pages/P2P/OfferDetails";
import TradeReview from "./pages/P2P/TradeReview";

import Orders from "./pages/orders/Orders";
import OrderDetails from "./pages/orders/OrderDetails";

import Wallet from "./pages/wallet/Wallet";
import Transactions from "./pages/transactions/Transactions";

import Profile from "./pages/profile/Profile";

import Settings from "./pages/settings/Settings";
import Security from "./pages/settings/Security";
import PaymentMethods from "./pages/settings/PaymentMethods";
import Notifications from "./pages/notifications/Notifications";
import MerchantDashboard from "./pages/merchant/MerchantDashboard";
import CreateAdvertisement from "./pages/merchant/CreateAdvertisement";
import MyAdvertisements from "./pages/merchant/MyAdvertisements";
import EditAdvertisement from "./pages/merchant/EditAdvertisement";
import MerchantOrders from "./pages/merchant/MerchantOrders";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminUsers from "./pages/admin/AdminUsers";
import AdminMerchants from "./pages/admin/AdminMerchants";
import AdminAdvertisements from "./pages/admin/AdminAdvertisements";
import AdminOrders from "./pages/admin/AdminOrders";

function App() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        {/* Dashboard */}
        <Route
          path="/"
          element={<Dashboard />}
        />

        {/* P2P */}
        <Route
          path="/p2p"
          element={<P2PMarketplace />}
        />

        <Route
          path="/p2p/offer/:offerId"
          element={<OfferDetails />}
        />

        <Route
          path="/p2p/offer/:offerId/review"
          element={<TradeReview />}
        />

        {/* Orders */}
        <Route
          path="/orders"
          element={<Orders />}
        />

        <Route
          path="/orders/:orderId"
          element={<OrderDetails />}
        />

        {/* Wallet */}
        <Route
          path="/wallet"
          element={<Wallet />}
        />

        {/* Transactions */}
        <Route
          path="/transactions"
          element={<Transactions />}
        />

        {/* Account */}
        <Route
          path="/profile"
          element={<Profile />}
        />

        {/* Merchant Dashboard */}
        <Route
          path="/merchant"
          element={<MerchantDashboard />}
        />

        <Route
             path="/merchant/ads/create"
            element={<CreateAdvertisement />}
        />

        <Route
            path="/merchant/ads"
            element={<MyAdvertisements />}
        />

        <Route
             path="/merchant/ads/:advertisementId/edit"
             element={<EditAdvertisement />}
        />

        <Route
          path="/merchant/orders"
          element={<MerchantOrders />}
        />

        {/* Admin Dashboard */}
        <Route
             path="/admin"
              element={<AdminDashboard />}
        />

<Route
  path="/admin/users"
  element={<AdminUsers />}
/>

      <Route
  path="/admin/merchants"
  element={<AdminMerchants />}
/>

<Route
  path="/admin/advertisements"
  element={<AdminAdvertisements />}
/>

<Route
  path="/admin/advertisements"
  element={<AdminAdvertisements />}
/>

<Route
  path="/admin/orders"
  element={<AdminOrders />}
/>

        <Route
          path="/security"
          element={<Security />}
        />

        <Route
          path="/settings"
          element={<Settings />}
        />

        <Route
          path="/settings/payment-methods"
          element={<PaymentMethods />}
        />

        {/* Notifications */}
        <Route
          path="/notifications"
          element={<Notifications />}
        />

        {/* Unknown routes */}
        <Route
          path="*"
          element={
            <Navigate
              to="/"
              replace
            />
          }
        />
      </Route>
    </Routes>
  );
}

export default App;