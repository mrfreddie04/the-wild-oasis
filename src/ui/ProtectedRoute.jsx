import styled from "styled-components";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../features/authentication/useUser";
import Spinner from "./Spinner";

const FullPage = styled.div`
  height: 100vh;
  background-color: var(--color-grey-50);
  display: flex;
  justify-content: center;
  align-items: center;
`;

function ProtectedRoute({ children }) {
  const navigate = useNavigate();
  const { isLoading, isAuthenticated, fetchStatus } = useUser();

  useEffect(() => {
    if (!isLoading && !isAuthenticated && fetchStatus !== "fetching") {
      //console.log("REDIRECT TO LOGIN", user);
      navigate("/login");
    }
  }, [isLoading, isAuthenticated, fetchStatus, navigate]);

  if (isLoading) {
    return (
      <FullPage>
        <Spinner />
      </FullPage>
    );
  }

  // if (isAuthenticated) {
  //   console.log(user);
  // }

  return isAuthenticated ? children : null;
}

export default ProtectedRoute;
