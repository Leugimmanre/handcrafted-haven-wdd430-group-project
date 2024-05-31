"use client";
import { useSession } from "next-auth/react";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

export default function Session() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <p>Loading...</p>;
  }

  return (
    <>
      <div style={{ display: "flex", alignItems: "center" }}>
        <AccountCircleIcon style={{ fontSize: 30, marginRight: 10 }} />
        <span>{`${session?.user?.name || "Guest"}`}</span>
      </div>
    </>
  );
}
