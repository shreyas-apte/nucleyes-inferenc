import React from "react";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <section className="flex justify-between items-stretch flex-1 bg-background-primary">
      {children}
    </section>
  );
};

export default DashboardLayout;
