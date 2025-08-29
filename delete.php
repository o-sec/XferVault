<?php
// Allow cross-origin requests
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');
header('Content-Type: application/json');

// Handle preflight (OPTIONS) requests
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

// File path
$dataFile = 'data.js';
$backupFile = 'data.js.bak';

// Ensure file exists
if (!file_exists($dataFile)) {
    echo json_encode(['success' => false, 'error' => 'data.js not found']);
    exit;
}

// Extract JSON object from data.js
$data = file_get_contents($dataFile);
if (!preg_match('/var\s+DefaultData\s*=\s*(\{.*\});/s', $data, $matches)) {
    echo json_encode(['success' => false, 'error' => 'Invalid data.js format']);
    exit;
}

$json = json_decode($matches[1], true);
if (!$json) {
    echo json_encode(['success' => false, 'error' => 'Failed to decode JSON']);
    exit;
}

// Parse POST input
$input = json_decode(file_get_contents('php://input'), true);
$platform = $input['platform'] ?? null;
$category = $input['category'] ?? null;
$command  = $input['command'] ?? null;

if (!$platform || !$category) {
    echo json_encode(['success' => false, 'error' => 'Missing platform or category']);
    exit;
}

if (!isset($json[$platform][$category])) {
    echo json_encode(['success' => false, 'error' => 'Category not found']);
    exit;
}

// Deleting logic
if ($command) {
    // Delete specific command
    $index = array_search($command, $json[$platform][$category], true);
    if ($index === false) {
        echo json_encode(['success' => false, 'error' => 'Command not found']);
        exit;
    }
    array_splice($json[$platform][$category], $index, 1);

    // Remove category if empty after deletion
    if (empty($json[$platform][$category])) {
        unset($json[$platform][$category]);
    }
} else {
    // Delete entire category
    unset($json[$platform][$category]);
}

// Create backup before writing
if (file_exists($dataFile)) {
    copy($dataFile, $backupFile);
}

// Save updated data back into data.js
$newContent = "var DefaultData = " . json_encode($json, JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES) . ";";
if (file_put_contents($dataFile, $newContent) === false) {
    echo json_encode(['success' => false, 'error' => 'Failed to write data.js']);
    exit;
}

echo json_encode(['success' => true]);
