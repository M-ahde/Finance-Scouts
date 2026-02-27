import { useEffect } from "react";
import axios from "axios";

const useRecordVisit = () => {
  useEffect(() => {
    if (!sessionStorage.getItem("visited")) {
      axios.post("/api/v1/visit").catch(() => {});
      sessionStorage.setItem("visited", "true");
    }
  }, []);
};

export default useRecordVisit;
