import { Navigate } from "react-router-dom";
import { useSelector } from "context";

export default function Permissions({ page: Page, isPublic = false }) {
  const user = useSelector(state => state.user);
  const isValidUser = user?.token?.length > 0;

  if (isValidUser || isPublic)
    return <Page/>;

  return <Navigate to="/login"/>
}
