import { Outlet } from "react-router-dom";

export default function Root() {
  return (
    <div className="h-screen w-screen bg-blue-green overflow-auto">
      <Outlet />
    </div>
  );
}
