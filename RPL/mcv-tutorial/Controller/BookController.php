<?php
require_once __DIR__ . '/../Model/Book.php';
class BookController
{
 private $model;
 public function __construct()
 {
 // Inisialisasi model
 $this->model = new BookModel();
 }
 /**
 * Tampilkan daftar buku
 */
 public function index()
 {
 // Mengambil semua data buku
 $books = $this->model->all();
 // Merender view dengan data $books
 include __DIR__ . '/../View/book_list.php';
 }
 /**
 * Tampilkan detail satu buku berdasarkan ID
 * URL: /?action=show&id=123
 */
 public function show()
 {
 $id = isset($_GET['id']) ? (int) $_GET['id'] : 0;
 $book = $this->model->find($id);
 include __DIR__ . '/../View/book_detail.php';
 }
 /**
 * Proses tambah buku baru (via POST)
 * URL: /?action=create
 */
 public function create()
 {
 if ($_SERVER['REQUEST_METHOD'] === 'POST') {
 $data = [
 'title' => $_POST['title'] ?? '',
 'author' => $_POST['author'] ?? '',
 'published_year' => $_POST['published_year'] ?? ''
 ];
 $this->model->create($data);
 header('Location: index.php');
 exit;
 }
 // Jika bukan POST, tampilkan form create
 include __DIR__ . '/../View/book_form.php';
 }
 /**
 * Proses hapus buku
 * URL: /?action=delete&id=123
 */
 public function delete()
 {
 $id = isset($_GET['id']) ? (int) $_GET['id'] : 0;
 $this->model->delete($id);
 header('Location: index.php');
 exit;
 }
}