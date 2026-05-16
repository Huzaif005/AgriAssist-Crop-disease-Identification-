import os
import json
from tensorflow.keras.models import Sequential
from tensorflow.keras.layers import InputLayer, GlobalAveragePooling2D, Dense


def create_dummy(saved_dir='AI_Model/image_model/saved_models'):
    os.makedirs(saved_dir, exist_ok=True)
    # simple model that accepts 224x224x3 and outputs 3 classes
    model = Sequential([
        InputLayer(input_shape=(224,224,3)),
        GlobalAveragePooling2D(),
        Dense(3, activation='softmax')
    ])
    path = os.path.join(saved_dir, 'crop_disease_model.h5')
    model.save(path)

    # create class indices mapping
    class_indices = {'healthy': 0, 'disease_a': 1, 'disease_b': 2}
    with open(os.path.join(saved_dir, 'class_indices.json'), 'w') as f:
        json.dump(class_indices, f)

    print('Dummy model created at', path)


if __name__ == '__main__':
    create_dummy()
