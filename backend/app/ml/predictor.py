import joblib
import numpy as np

model = joblib.load("app/ml/quality_model.pkl")

def predict_quality(raw_props: dict, process_params: dict):
    features = np.array([[
        raw_props.get("moisture"),
        raw_props.get("purity"),
        process_params.get("temperature"),
        process_params.get("ph"),
        process_params.get("duration_min"),
    ]])

    preds = model.predict(features)[0]

    pass_prob = min(1.0, max(0.0, (preds[2] - 95) / 5))

    return {
        "moisture": round(preds[0], 2),
        "particle_size": round(preds[1], 2),
        "purity": round(preds[2], 2),
        "pass_probability": round(pass_prob, 2),
    }
