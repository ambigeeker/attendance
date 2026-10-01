<?php
// Suppress stray text/warnings so they don't break JSON output
ini_set('display_errors', 0);
header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $name        = trim($_POST['employee_name'] ?? '');
    $designation = trim($_POST['designation'] ?? '');
    $department  = trim($_POST['department'] ?? '');
    $section     = trim($_POST['section'] ?? '');
    $action      = trim($_POST['action_type'] ?? '');
    $timestamp   = date('Y-m-d H:i:s');

    // Save directly inside the project directory
    $filename = __DIR__ . '/attendance_log.csv';
    $isNewFile = !file_exists($filename) || filesize($filename) === 0;

    $file = @fopen($filename, 'a');
    if (!$file) {
        echo json_encode([
            'status' => 'error',
            'message' => 'Permission denied: Cannot write to attendance_log.csv'
        ]);
        exit;
    }

    if ($isNewFile) {
        fputcsv($file, ['Timestamp', 'Name', 'Designation', 'Department', 'Section', 'Action']);
    }

    fputcsv($file, [$timestamp, $name, $designation, $department, $section, $action]);
    fclose($file);

    echo json_encode(['status' => 'success']);
    exit;
}

echo json_encode(['status' => 'error', 'message' => 'Invalid request method.']);
exit;