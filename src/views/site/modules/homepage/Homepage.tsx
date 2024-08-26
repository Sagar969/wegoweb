import { Link } from "react-router-dom";

export default function Homepage() {
  return (
    <>
      <div className="flex items-center gap-3 m-4">
        <Link to={"/panel/dashboard"} className="bg-blue-500 text-white p-2">
          To Panel
        </Link>
      </div>
    </>
  );
}
