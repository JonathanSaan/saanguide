import { Suspense } from "react";

import UpdatePage from "../components/updatePage";

export const metadata = {
  title: "Update - Saan's Guidebook",
  description: "Publication Creation.",
};

const Update = () => {
  return (
    <Suspense fallback={null}>
      <UpdatePage />
    </Suspense>
  );
};

export default Update;
