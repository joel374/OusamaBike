const { useSelector } = require("react-redux");
const { useNavigate } = require("react-router-dom");

const AdminRoute = ({ children }) => {
  const authSelector = useSelector((state) => state.auth);
  console.log("is_admin?", { authSelector });
  const navigate = useNavigate();

  if (authSelector.is_admin === false) {
    navigate("/");
  }
  return children;
};

export default AdminRoute;
