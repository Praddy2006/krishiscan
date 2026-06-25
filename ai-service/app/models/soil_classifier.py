import torch
import torch.nn as nn
from torchvision import models, transforms
from PIL import Image
import os
import numpy as np

SOIL_CLASSES = ["alluvial", "black", "red", "laterite", "sandy"]
MODEL_PATH = os.path.join(os.path.dirname(__file__), "../../ml_models/soil_classifier.pt")

TRANSFORM = transforms.Compose([
    transforms.Resize((224, 224)),
    transforms.ToTensor(),
    transforms.Normalize(mean=[0.485, 0.456, 0.406],
                         std=[0.229, 0.224, 0.225]),
])

class SoilClassifier:
    def __init__(self):
        self.last_scores = [0.0] * len(SOIL_CLASSES)
        self._load_model()

    def _load_model(self):
        if not os.path.exists(MODEL_PATH):
            print("[SoilClassifier] No model found — running in MOCK mode")
            self.mock = True
            return
        self.mock = False
        self.model = models.efficientnet_b0(weights=None)
        self.model.classifier[1] = nn.Linear(
            self.model.classifier[1].in_features, len(SOIL_CLASSES)
        )
        self.model.load_state_dict(torch.load(MODEL_PATH, map_location="cpu"))
        self.model.eval()
        print("[SoilClassifier] Model loaded successfully")

    def predict(self, image: Image.Image):
        if self.mock:
            return self._mock_predict()
        tensor = TRANSFORM(image).unsqueeze(0)
        with torch.no_grad():
            logits = self.model(tensor)
            probs = torch.softmax(logits, dim=1).squeeze().numpy()
        self.last_scores = probs.tolist()
        idx = int(np.argmax(probs))
        return SOIL_CLASSES[idx], float(probs[idx])

    def _mock_predict(self):
        import random
        scores = [random.random() for _ in SOIL_CLASSES]
        total = sum(scores)
        scores = [s / total for s in scores]
        self.last_scores = scores
        idx = scores.index(max(scores))
        return SOIL_CLASSES[idx], scores[idx]