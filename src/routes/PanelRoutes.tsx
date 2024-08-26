import PageNotFound from "@/views/panel/components/ui/PageNotFound";
import PanelTemplate from "@/views/panel/components/ui/PanelTemplate";
import { lazy } from "react";
import { Route, Routes } from "react-router-dom";
const Dashboard = lazy(
  () => import("@/views/panel/modules/dashboard/Dashboard")
);

export default function PanelRoutes() {
  return (
    <>
      <Routes>
        <Route path="dashboard">
          <Route
            index
            element={
              <PanelTemplate>
                <Dashboard />
              </PanelTemplate>
            }
          />
          <Route
            path="*"
            element={
              <PanelTemplate>
                <PageNotFound />
              </PanelTemplate>
            }
          />
        </Route>
      </Routes>
    </>
  );
}
