<?php
$servername = "";
$username = "";
$password = "";
$dbname = "";

$conn = new mysqli($servername, $username, $password, $dbname);
if ($conn -> connect_error) {
    die("Připojení k databázi selhalo: " . $conn -> connect_error);
}

// Příprava a provedení dotazu
$sql = "SELECT * FROM Caches";
$result = $conn -> query($sql);

// Store the fetched data in an array
$data = array();
if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $data[] = $row;
    }
}
// Sort the data by 'typ' using a custom sorting function
usort($data, function($a, $b) {
    $typesOrder = array(
        "traditional", "multi", "mystery",
        "wherigo", "letterbox", "earth", "virtual"
    );
    $aIndex = array_search($a['typ'], $typesOrder);
    $bIndex = array_search($b['typ'], $typesOrder);
    return $aIndex - $bIndex;
});

$conn->close();

// Return the data as JSON
header("Content-Type: application/json");
echo json_encode($data);
?>
