import Homepage from "@/views/site/modules/homepage/Homepage";
import { Suspense } from "react";
import { Route, Routes } from "react-router-dom";

export default function SiteRoutes() {
  return (
    <>
      <Routes>
        <Route
          index
          element={
            <Suspense>
              <Homepage />
            </Suspense>
          }
        />
      </Routes>
    </>
  );
}
