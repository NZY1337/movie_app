const SingleDefaultLayout = ({ children }) => {
  return (
    <div className="col-lg-3" style={{ marginBottom: "30px" }}>
      <div className="default-card">{children}</div>
    </div>
  );
};

export default SingleDefaultLayout;
