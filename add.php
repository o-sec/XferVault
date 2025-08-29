<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

$dataFile = "data.js";
$backupFile = "data.js.bak";

// Handle CORS preflight
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

// Health check
if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    echo json_encode(["status" => "online"]);
    exit;
}

// Only allow POST
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(["error" => "Invalid request"]);
    exit;
}

// Parse input
$input = json_decode(file_get_contents("php://input"), true);
if (!isset($input['platform'], $input['category'], $input['command'])) {
    http_response_code(400);
    echo json_encode(["error" => "Missing fields"]);
    exit;
}

$platform = strtolower(trim($input['platform']));
$category = trim($input['category']);
$command  = trim($input['command']);

if (!in_array($platform, ['windows', 'linux']) || $category === "" || $command === "") {
    http_response_code(400);
    echo json_encode(["error" => "Invalid input"]);
    exit;
}

// Ensure file exists
if (!file_exists($dataFile)) {
    file_put_contents($dataFile, "var DefaultData = {};");
}

// Read file safely
$contents = file_get_contents($dataFile);
$start = strpos($contents, '{');
$end   = strrpos($contents, '}');

if ($start === false || $end === false) {
    http_response_code(500);
    echo json_encode(["error" => "Corrupted data.js)"]);
    exit;
}

$jsonData = substr($contents, $start, $end - $start + 1);
$data = json_decode($jsonData, true);

// If JSON invalid → don’t overwrite, keep existing file
if (json_last_error() !== JSON_ERROR_NONE || !is_array($data)) {
    http_response_code(500);
    echo json_encode(["error" => "Corrupted JSON in data.js"]);
    exit;
}

// Insert new command safely
if (!isset($data[$platform])) $data[$platform] = [];
if (!isset($data[$platform][$category])) $data[$platform][$category] = [];
if (!in_array($command, $data[$platform][$category], true)) {
    $data[$platform][$category][] = $command;
}

// Convert back to JS
$newJs = "var DefaultData = " . json_encode($data, JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES) . ";";

// Create backup before writing
if (file_exists($dataFile)) {
    copy($dataFile, $backupFile);
}

// Write safely with locking
$fp = fopen($dataFile, "c+");
if ($fp && flock($fp, LOCK_EX)) {
    ftruncate($fp, 0);
    fwrite($fp, $newJs);
    fflush($fp);
    flock($fp, LOCK_UN);
    fclose($fp);
    echo json_encode(["status" => "Command added"]);
} else {
    http_response_code(500);
    echo json_encode(["error" => "Could not write to file"]);
}
