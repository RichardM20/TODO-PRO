import ProtectedRoute from "@auth/components/ProtectedRoute";
import DashboardClient from "@dashboard/components/DashboardClient";

const DashboardPage = () => {
  return (
    <ProtectedRoute>
      <DashboardClient />
    </ProtectedRoute>
  );
};

export default DashboardPage;
