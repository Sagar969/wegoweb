import { Button, Result } from "antd";
import { useNavigate } from "react-router-dom";

export default function PageNotFound() {
  const navigate = useNavigate();
  return (
    <>
      <Result
        status="404"
        title="404"
        subTitle="Sorry, the page you visited does not exist."
        extra={
          <div className="flex items-center gap-3">
            <Button type="default" onClick={() => navigate(-1)}>
              Go back
            </Button>
            <Button type="primary" onClick={() => navigate("/panel/dashboard")}>
              Back Home
            </Button>
          </div>
        }
      />
    </>
  );
}
