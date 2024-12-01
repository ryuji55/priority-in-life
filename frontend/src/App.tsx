import { useEffect, useState } from "react";
import axios from "axios";

type ApiResponse = {
  message: string;
};

function App() {
  const [message, setMessage] = useState("");

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
    </div>
  );
}

export default App;
