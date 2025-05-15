<?php
// ini_set('display_errors', 1);
// error_reporting(E_ALL);
require_once __DIR__ . '/Controller/BookController.php';
$action = $_GET['action'] ?? 'index';
$ctrl = new BookController();
// Panggil method sesuai action, jika ada
if (method_exists($ctrl, $action)) {
 $ctrl->{$action}();
} else {
 // Default ke index jika method tidak ditemukan
 $ctrl->index();
}