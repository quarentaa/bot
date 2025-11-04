import numpy as np
import tensorflow as tf
from tensorflow import keras
from tensorflow.keras import layers

# 1. Carrega o dataset MNIST
(x_train, y_train), (x_test, y_test) = keras.datasets.mnist.load_data()

# 2. Normaliza os dados (0-255 -> 0-1)
x_train = x_train.astype("float32") / 255.0
x_test = x_test.astype("float32") / 255.0

# 3. Cria um modelo simples de rede neural
model = keras.Sequential(
    [
        keras.Input(shape=(28, 28)),
        layers.Flatten(),               # transforma a imagem 28x28 em vetor 784
        layers.Dense(128, activation="relu"),
        layers.Dropout(0.2),
        layers.Dense(10, activation="softmax"),
    ]
)

# 4. Compila o modelo
model.compile(
    loss="sparse_categorical_crossentropy",
    optimizer="adam",
    metrics=["accuracy"],
)

# 5. Treina o modelo
model.fit(x_train, y_train, batch_size=32, epochs=5)

# 6. Avalia o modelo com dados de teste
test_loss, test_accuracy = model.evaluate(x_test, y_test)
print("Perda de teste:", test_loss)
print("Acurácia de teste:", test_accuracy)

# 7. Faz uma predição de exemplo
import numpy as np
sample = np.expand_dims(x_test[0], axis=0)  # primeira imagem de teste
prediction = model.predict(sample)
print("Distribuição de probabilidades:", prediction)
print("Dígito previsto:", np.argmax(prediction))
