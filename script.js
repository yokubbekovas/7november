let favorites = [];

// Функция для перевода слова с использованием fakeTranslate
// Функция для перевода слова с использованием fakeTranslate
async function translateWord() {
    const word = document.getElementById("wordInput").value.trim();
    if (!word) {
        alert("Введите слово для перевода.");
        return;
    }
    try {
        const translation = await fakeTranslate(word); // Ожидаем результата от fakeTranslate
        document.getElementById("translationResult").innerText = translation;
        document.getElementById("saveButton").disabled = false; // Разблокировать кнопку
    } catch (error) {
        document.getElementById("translationResult").innerText = error; // Покажите ошибку
        document.getElementById("saveButton").disabled = true; // Отключите кнопку
    }
}


// Сохранение перевода в избранное
function saveTranslation() {
    const word = document.getElementById("wordInput").value.trim();
    const translation = document.getElementById("translationResult").innerText;

    favorites.push({ word, translation });
    updateFavorites();
    document.getElementById("saveButton").disabled = true;

    alert(`Сохранено: ${word} - ${translation}`);
}

// Обновление списка избранного
function updateFavorites() {
    const favoritesList = document.getElementById("favoritesList");
    favoritesList.innerHTML = ""; // Очистить список

    if (favorites.length === 0) {
        const message = document.createElement("li");
        message.innerText = "Нет избранных переводов.";
        favoritesList.appendChild(message);
    } else {
        favorites.forEach((item, index) => {
            const listItem = document.createElement("li");
            listItem.innerText = `${item.word} - ${item.translation}`;
            
            const removeButton = document.createElement("button");
            removeButton.innerText = "Удалить";
            removeButton.addEventListener("click", () => removeFavorite(index));
            
            listItem.appendChild(removeButton);
            favoritesList.appendChild(listItem);
        });
    }
}

// Удаление перевода из избранного
function removeFavorite(index) {
    favorites.splice(index, 1); // Удаляем элемент из favorites
    updateFavorites();
    alert("Перевод удален из избранного.");
}

// Обработчики событий для кнопок
document.addEventListener("DOMContentLoaded", function() {
    document.getElementById("translateButton").addEventListener("click", translateWord);
    document.getElementById("saveButton").addEventListener("click", saveTranslation);
});



// Объект dictionary для хранения переводов
const dictionary = {
    "hello": "здравствуйте",
    "world": "мир",
    "friend": "друг",
    "good": "хорошо",
    "day": "день",
    "night": "ночь",
    "love": "любовь",
    "peace": "мир",
    "cat": "кот",
    "dog": "собака",
    "water": "вода",
    "fire": "огонь",
    "earth": "земля",
    "wind": "ветер",
    "sun": "солнце",
    "moon": "луна",
    "tree": "дерево",
    "flower": "цветок",
    "book": "книга",
    "computer": "компьютер"
};

// Функция для перевода
function fakeTranslate(word) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const translation = dictionary[word.toLowerCase()];
            if (translation) {
                resolve(translation);
            } else {
                reject("Перевод не найден");
            }
        }, 1000); // Задержка 1 секунда
    });
}
