<?php
$URL = 'https://data.gov.bh/api/explore/v2.1/catalog/datasets/01-statistics-of-students-nationalities_updated/records?where=colleges%20like%20%22IT%22%20AND%20the_programs%20like%20%22bachelor%22&limit=100';
$response = file_get_contents($URL);

if ($response === FALSE) {
    die('Error occurred while fetching data.');
}

$result = json_decode($response, true);

if ($result === NULL) {
    die('Error occurred while decoding JSON.');
}

if (!isset($result['results'])) {
    die('No results found in the API response.');
}

$records = $result['results'];
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Students Nationalities Data</title>
    <link rel="stylesheet" href="https://unpkg.com/@picocss/pico@1.5.7/css/pico.min.css">
</head>
<body>

    <header class="container">
        <h1>Students Nationalities Data</h1>
    </header>

    <main class="container">
        <table role="grid">
            <thead>
                <tr>
                    <th>Year</th>
                    <th>Semester</th>
                    <th>Program</th>
                    <th>Nationality</th>
                    <th>College</th>
                    <th>Number of Students</th>
                </tr>
            </thead>
            <tbody>
                <?php foreach ($records as $record): ?>
                    <tr>
                        <td><?php echo $record['year']; ?></td>
                        <td><?php echo $record['semester']; ?></td>
                        <td><?php echo $record['the_programs']; ?></td>
                        <td><?php echo $record['nationality']; ?></td>
                        <td><?php echo $record['colleges']; ?></td>
                        <td><?php echo $record['number_of_students']; ?></td>
                    </tr>
                <?php endforeach; ?>
            </tbody>
        </table>
    </main>

</body>
</html>
