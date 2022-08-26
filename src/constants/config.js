import env from "../active.config";

const ENV = {
  local: {
    BASE_URL: "http://localhost:3001/api/",
  },
  dev: {
    BASE_URL: "",
  },
  prod: {
    BASE_URL: "",
  },
};

export default ENV[env];
