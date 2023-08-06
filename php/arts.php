<?php
// Read the JSON data from the file
$jsonData = file_get_contents('data.json');

// Convert JSON to PHP array
$data = json_decode($jsonData, true);

// Function to get the details for a specific value (department)
function getDepartmentDetails($departmentName) {
    global $data; // Access the global variable $data inside the function
    foreach ($data['arts']['value'] as $item) {
        if ($item['val'] === $departmentName) {
            return $item;
        }
    }
    return null; // If department is not found
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <?php
    // Check if the department name is provided in the URL
    if (isset($_GET['department'])) {
        $departmentName = urldecode($_GET['department']); // Decode the department name
        $departmentDetails = getDepartmentDetails($departmentName);
        if ($departmentDetails) {
            // Set the page title to the department name
            echo '<title>' . $departmentDetails['val'] . '</title>';
        } else {
            // Department not found, set a default title
            echo '<title>Department not found</title>';
        }
    } else {
        // No department selected, set a default title
        echo '<title>No department selected</title>';
    }
    ?>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="styles.css" />
    <link rel="icon" href="/logo.png" />
</head>
<body>
    <?php include 'header.php'; ?>
    <div class="exam-container" id="password">
        <div class="getpassword">
            <div class="exam-form">
                <b id="closeButton" onclick="closepassword()">&#x2715;</b>
                <p>enter your link password</p>
                <input type="text" name="password" id="passwordInput" />
                <input type="button" value="submit" id="submitButton" onclick="chechpassword()" />
            </div>
        </div>
    </div>
<?php
// Generate the HTML output using heredoc syntax
echo <<<HTML
<div class="exam-container">
    
HTML;

// Check if the department name is provided in the URL
if (isset($_GET['department'])) {
    $departmentName = urldecode($_GET['department']); // Decode the department name
    $departmentDetails = getDepartmentDetails($departmentName);
    if ($departmentDetails) {
        // Display the details for the selected department
        echo <<<HTML
        <h1>{$departmentDetails['val']}</h1>
        <div class="exam-link">
            <div class="exam-click">
                <p>access your exam through below link</p>
                <span onclick="ClickEvent()">click here</span>
            </div>
        </div>
HTML;
    } else {
        echo <<<HTML
        <p>Department not found.</p>
HTML;
    }
} else {
    echo <<<HTML
    <p>No department selected.</p>
HTML;
}

echo <<<HTML
</div>
HTML;
?>

    <script>

    function chechpassword(){
        var departmentFromPHP = '<?php echo $departmentDetails['psk']; ?>';
        var link = '<?php echo $departmentDetails['lcount'][0]; ?>';
        var psk = document.getElementById("passwordInput").value
        if(psk == departmentFromPHP){
            window.location.href = link
        }else{
            alert("wrong password")
        }
    }
    function closepassword(){
        document.getElementById("password").style.display = "none"
    }
     function ClickEvent() {
         <?php
            // Get the 'department' parameter from the URL (query string)
            // Note: You should sanitize and validate the input to prevent security issues.
            // For this example, we are simply using htmlspecialchars to escape the value.
            $dp = isset($_GET['department']) ? htmlspecialchars($_GET['department']) : '';
            ?>
            
            var departmentFromPHP = '<?php echo $data; ?>';
            document.getElementById("password").style.display = "block"
        }
</script>
</body>
</html>
