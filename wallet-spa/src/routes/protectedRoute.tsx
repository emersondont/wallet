import { Navigate } from "react-router-dom";
// import { useContext } from "react";
// import { AppContext } from "../context/appContext";

interface Props {
  children: React.ReactNode;
}

export default function ProtectedRoute(props: Props) {
  // const { token} = useContext(AppContext);
  const token = localStorage.getItem('accessToken');
  
  if (!token) {
    return <Navigate to="/login" />;
  }
  return (
    <>
      {props.children}
    </>
  );
};