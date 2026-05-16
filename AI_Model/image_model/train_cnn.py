import os
import json
import argparse
from tensorflow.keras.preprocessing.image import ImageDataGenerator
from tensorflow.keras.applications import MobileNetV2
from tensorflow.keras.layers import GlobalAveragePooling2D, Dense, Dropout
from tensorflow.keras.models import Model
from tensorflow.keras.optimizers import Adam
from tensorflow.keras.callbacks import ModelCheckpoint, ReduceLROnPlateau


def build_model(num_classes, input_shape=(224,224,3)):
    base = MobileNetV2(weights='imagenet', include_top=False, input_shape=input_shape)
    x = base.output
    x = GlobalAveragePooling2D()(x)
    x = Dense(128, activation='relu')(x)
    x = Dropout(0.3)(x)
    outputs = Dense(num_classes, activation='softmax')(x)
    model = Model(inputs=base.input, outputs=outputs)
    return model


def train(dataset_dir, saved_dir, epochs=12, batch_size=32, lr=1e-4):
    target_size = (224,224)
    train_datagen = ImageDataGenerator(rescale=1./255,
                                       rotation_range=20,
                                       width_shift_range=0.1,
                                       height_shift_range=0.1,
                                       shear_range=0.1,
                                       zoom_range=0.1,
                                       horizontal_flip=True,
                                       validation_split=0.2)

    train_gen = train_datagen.flow_from_directory(dataset_dir,
                                                  target_size=target_size,
                                                  batch_size=batch_size,
                                                  class_mode='categorical',
                                                  subset='training')

    val_gen = train_datagen.flow_from_directory(dataset_dir,
                                                target_size=target_size,
                                                batch_size=batch_size,
                                                class_mode='categorical',
                                                subset='validation')

    num_classes = len(train_gen.class_indices)
    model = build_model(num_classes, input_shape=(224,224,3))

    model.compile(optimizer=Adam(learning_rate=lr),
                  loss='categorical_crossentropy',
                  metrics=['accuracy'])

    os.makedirs(saved_dir, exist_ok=True)
    model_path = os.path.join(saved_dir, 'crop_disease_model.h5')
    checkpoint = ModelCheckpoint(model_path, save_best_only=True, monitor='val_accuracy', mode='max')
    reduce_lr = ReduceLROnPlateau(monitor='val_loss', factor=0.5, patience=3, verbose=1)

    history = model.fit(train_gen,
                        validation_data=val_gen,
                        epochs=epochs,
                        callbacks=[checkpoint, reduce_lr])

    # Save class indices for prediction mapping
    class_indices_path = os.path.join(saved_dir, 'class_indices.json')
    with open(class_indices_path, 'w') as f:
        json.dump(train_gen.class_indices, f)

    print(f"Training finished. Best model saved to {model_path}")


if __name__ == '__main__':
    parser = argparse.ArgumentParser(description='Train crop disease CNN')
    parser.add_argument('--dataset_dir', type=str, required=True)
    parser.add_argument('--saved_dir', type=str, default='AI_Model/image_model/saved_models')
    parser.add_argument('--epochs', type=int, default=12)
    parser.add_argument('--batch_size', type=int, default=32)
    args = parser.parse_args()

    train(args.dataset_dir, args.saved_dir, epochs=args.epochs, batch_size=args.batch_size)
