import numpy as np
import pandas as pd
from sklearn.ensemble import RandomForestRegressor
import joblib

# Simulated training data
np.random.seed(42)
data = pd.DataFrame({
    "moisture_raw": np.random.uniform(5, 15, 200),
    "purity_raw": np.random.uniform(90, 99, 200),
    "temperature": np.random.uniform(70, 100, 200),
    "ph": np.random.uniform(1.5, 3.0, 200),
    "duration": np.random.uniform(60, 180, 200),
    "final_moisture": np.random.uniform(4, 8, 200),
    "particle_size": np.random.uniform(20, 60, 200),
    "final_purity": np.random.uniform(95, 99.5, 200),
})

X = data[["moisture_raw", "purity_raw", "temperature", "ph", "duration"]]
y = data[["final_moisture", "particle_size", "final_purity"]]

model = RandomForestRegressor(n_estimators=200, random_state=42)
model.fit(X, y)

joblib.dump(model, "app/ml/quality_model.pkl")
print("✅ Quality model trained and saved")
