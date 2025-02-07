import { Result } from "antd";
import { Link } from "react-router-dom";
const NotFound = () => {
  return (
    <div className="contents">
      <Result
        status="404"
        title="404"
        subTitle="Sorry, the page you visited does not exist."
      />
      <Link to="/">
        <button className="btn btn-secondary w-25">Back Home</button>
      </Link>
    </div>
  );
};

export default NotFound;
