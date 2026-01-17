// WebSocket Alert Receiver (isolated & safe)

window.ws = new WebSocket("wss://ws-relay-zqzk.onrender.com");

ws.onopen = () => {
  console.log("✅ Alert WebSocket connected");
};

ws.onmessage = (event) => {
  try {
    const data = JSON.parse(event.data);

    if (data.alert) {
      alert("⚠ CROWD ALERT ⚠\nCount: " + data.count);
      document.body.style.backgroundColor = "red";
    } else {
      document.body.style.backgroundColor = "";
    }
  } catch (e) {
    console.error("Invalid WebSocket message", e);
  }
};

ws.onerror = (err) => {
  console.error("WebSocket error", err);
};
