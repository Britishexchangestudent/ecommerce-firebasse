import { useSelector } from "react-redux";
import { NotFound } from "../../../pages";

import { selectEmail } from "../../../redux/slice/authSlice";

export function AdminRoute({ children }) {
  const email = useSelector(selectEmail);

  if (email === "danialahmed.dev@gmail.com") {
    return children;
  }
  return <NotFound />;
}

export function AdminOnlyLink({ children }) {
  const email = useSelector(selectEmail);

  if (email === "danialahmed.dev@gmail.com") {
    return children;
  }
  return null;
}
