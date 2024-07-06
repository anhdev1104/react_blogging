const DashboardHeading = ({ title = '', desc = '', children }) => {
  return (
    <div className="flex items-center justify-between">
      <div className="mb-10">
        <h1 className="dashboard-heading">{title}</h1>
        <p className="dashboard-short-desc">{desc}</p>
      </div>
      {children}
    </div>
  );
};

export default DashboardHeading;
