from http.server import BaseHTTPRequestHandler
import json
import joblib # type: ignore
from pathlib import Path


# -------------------------
# LOAD MODEL ONCE
# -------------------------

MODEL_PATH = Path(__file__).parent.parent / "tools" / "issue_title_model.pkl"

model = joblib.load(MODEL_PATH)


# -------------------------
# HELPER
# -------------------------

def classify_score(score):
    if score > 0.85:
        return "excellent"

    elif score > 0.65:
        return "good"

    elif score > 0.50:
        return "weak"

    return "poor"


# -------------------------
# SERVERLESS HANDLER
# -------------------------

class handler(BaseHTTPRequestHandler):

    def do_POST(self):

        try:

            content_length = int(self.headers["Content-Length"])

            body = self.rfile.read(content_length)

            data = json.loads(body)

            title = data.get("title", "").strip()

            # -------------------------
            # VALIDATION
            # -------------------------

            if not title:

                self.send_response(400)
                self.send_header("Content-Type", "application/json")
                self.end_headers()

                self.wfile.write(json.dumps({
                    "error": "Title is required"
                }).encode())

                return

            # -------------------------
            # PREDICTION
            # -------------------------

            score = model.predict_proba([title])[0][1]

            quality = classify_score(score)

            response = {
                "valid": score >= 0.65,
                "score": round(float(score), 2),
                "quality": quality
            }

            # -------------------------
            # RESPONSE
            # -------------------------

            self.send_response(200)

            self.send_header("Content-Type", "application/json")

            self.end_headers()

            self.wfile.write(
                json.dumps(response).encode()
            )

        except Exception as e:

            self.send_response(500)

            self.send_header("Content-Type", "application/json")

            self.end_headers()

            self.wfile.write(json.dumps({
                "error": str(e)
            }).encode())