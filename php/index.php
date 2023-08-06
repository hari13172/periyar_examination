<!DOCTYPE html>
<html>
<head>
    <title>Periyar University - Exams</title>
    
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body>
<?php include 'header.php'; ?>
    <?php
    // Read the JSON data from the file
    $jsonData = file_get_contents('data.json');
    // Convert JSON to PHP array
    $data = json_decode($jsonData, true);
    echo "<div class='container'>";
    echo "<h1>M.Phil/Ph.D Common Entrance (CET-22-JULY-2023)</h1>";
    echo "<div class='box-container'>";
    // Function to display data in a box
    function displayDataInBox($department,$current) {
        echo '<div class="box">';
        echo '<h1>' . $department['name'] . '</h1>';
        echo '<div class="box-value">';
        foreach ($department['value'] as $item) {
            echo '<a href="'.$current.'.php?department=' . rawurlencode($item['val']) . '">' . $item['val'] . '</a>';
        }
        echo '</div>';
        echo '</div>';
    }
    // Display Science Departments in separate boxes
    displayDataInBox($data['list1'],"list1");
    displayDataInBox($data['list2'],"list2");
    displayDataInBox($data['arts'],"arts");
    echo "</div>";
    echo "</div>";
    ?>
</body>
</html>
