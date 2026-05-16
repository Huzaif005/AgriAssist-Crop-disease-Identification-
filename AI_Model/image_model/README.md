AI Model (Image)

This folder contains a ready-to-run MobileNetV2 transfer-learning training script and a prediction helper.

Files:
- `train_cnn.py` : Train script. Usage:

```bash
python AI_Model/image_model/train_cnn.py --dataset_dir path/to/dataset --saved_dir AI_Model/image_model/saved_models --epochs 12
```

- `predict.py` : Load saved model and predict disease + simple severity. Usage:

```bash
python AI_Model/image_model/predict.py --image path/to/leaf.jpg --saved_dir AI_Model/image_model/saved_models
```

- `requirements.txt` : Project dependencies (root).

Notes:
- Dataset should be organized as `dataset/<ClassName>/*` per class.
- `train_cnn.py` saves `crop_disease_model.h5` and `class_indices.json` in `saved_models`.
- Severity is computed using a simple color-ratio heuristic and confidence thresholds: <70% Low, 70–85% Medium, >=85% High.
