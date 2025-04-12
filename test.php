<?php
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Генерация теста
    echo "<h1>Тест по математике</h1>";
    // Генерация теста
    $questions = [
        "Сколько будет 2 + 2?" => [3, 4, 5],
        "Сколько будет 3 * 3?" => [6, 9, 8],
        "Сколько будет 10 - 4?" => [5, 6, 7]
    ];

    // Вывод теста
    foreach ($questions as $question => $answers) {
        echo "<p>$question</p>";
        foreach ($answers as $answer) {
            echo "<input type='radio' name='$question' value='$answer'> $answer<br>";
        }
    }
}
?>
