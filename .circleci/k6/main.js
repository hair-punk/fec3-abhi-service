import { check, group, sleep } from "k6";
import http from "k6/http";

// Options
export let options = {
    stages: [
        { duration: "10s", target: 10 },
        { duration: "10s" },
        { duration: "10s", target: 0 }
    ],
    thresholds: {
        http_req_duration: ["p(95)<500"]
    },
    ext: {
        loadimpact: {
            name: "Exhaust-Media-Player"
        }
    }
};

export default function() {
  group("Front page", function() {
      let res = http.get("http://localhost:3008");
      check(res, {
          "is status 200": (r) => r.status === 200
      });
      sleep(10);
  });
}