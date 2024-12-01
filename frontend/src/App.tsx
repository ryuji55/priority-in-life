import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router";

type ApiResponse = {
  message: string;
};

function App() {
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const goToLoginPage = () => navigate("/login");
  const goToRegisterPage = () => navigate("/register");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get<ApiResponse>("/api/test");
        setMessage(response.data.message);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h1>Frontend + Backend Test</h1>
      <p>{message}</p>
      <button onClick={goToLoginPage}>ログインページ</button>
      <button onClick={goToRegisterPage}>登録ページ</button>
    </div>
  );
}

export default App;
