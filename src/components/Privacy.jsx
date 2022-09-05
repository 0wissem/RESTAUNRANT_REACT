import React from "react";

export default function Privacy({ show = true, children }) {
  if (show) return children;
  return <div>You are not allowed to see this page</div>;
}
