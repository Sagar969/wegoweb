import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
const PanelRoutes = lazy(() => import("./routes/PanelRoutes"));
const SiteRoutes = lazy(() => import("./routes/SiteRoutes"));
import "./css/App.css";
import { ConfigProvider, theme as antdTheme, message } from "antd";

function App() {
  const { defaultAlgorithm, darkAlgorithm } = antdTheme;

  return (
    <>
      <ConfigProvider
        theme={{
          // algorithm: darkAlgorithm,
          components: {
            Layout: {
              bodyBg: "transparent",
              colorBgContainer: "transparent",
              colorBgBase: "transparent",
              siderBg: "var(--background)",
              headerBg: "var(--background)",
            },
          },
        }}
      >
        <Routes>
          <Route
            path="/panel/*"
            element={
              <Suspense>
                <PanelRoutes />
              </Suspense>
            }
          />
          <Route
            path="/*"
            element={
              <Suspense>
                <SiteRoutes />
              </Suspense>
            }
          />
        </Routes>
      </ConfigProvider>
    </>
  );
}

export default App;
