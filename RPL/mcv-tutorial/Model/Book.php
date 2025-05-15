<?php
class BookModel
{
 private $pdo;
 public function __construct()
 {
 // $path = __DIR__ . '/../data/library.db';
 // $dir = dirname($path);
 // echo '<pre>';
 // echo "Database exists: " . (file_exists($path) ? 'YES' : 'NO') . "\n";
 // echo "DB writable: " . (is_writable($path) ? 'YES' : 'NO') . "\n";
 // echo "Dir writable: " . (is_writable($dir) ? 'YES' : 'NO') . "\n";
 // echo '</pre>';
 // exit;

 // Inisialisasi koneksi PDO ke database SQL
 $host = "localhost";
 $user = "root";
 $pass = "";
 $data = "library";
 $char = "utf8mb4";

 $dns = "mysql:host=$host;dbname=$data;charset=$char";
 $options = [
    PDO :: ATTR_ERRMODE => PDO :: ERRMODE_EXCEPTION,
    PDO :: ATTR_DEFAULT_FETCH_MODE => PDO :: FETCH_ASSOC,
 ];

 $this -> pdo = new PDO ($dns, $user, $pass, $options);

//  $this->pdo = new PDO('sqlite:' . __DIR__ . '/../data/library.db');
//  $this->pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
 }
 /**
 * Mengambil semua buku
 * @return array
 */
 public function all(): array
 {
 $stmt = $this->pdo->query('SELECT * FROM books');
 return $stmt->fetchAll(PDO::FETCH_ASSOC);
 }
  /**
 * Mencari satu buku berdasarkan ID
 * @param int $id
 * @return array|false
 */
 public function find(int $id)
 {
 $stmt = $this->pdo->prepare('SELECT * FROM books WHERE id = :id');
 $stmt->execute([':id' => $id]);
 return $stmt->fetch(PDO::FETCH_ASSOC);
 }
 /**
 * Menambah buku baru
 * @param array $data
 * @return bool
 */
 public function create(array $data): bool
 {
 $stmt = $this->pdo->prepare(
 'INSERT INTO books (title, author, published_year) VALUES (:title,
:author, :year)'
 );
 return $stmt->execute([
 ':title' => $data['title'],
 ':author'=> $data['author'],
 ':year' => $data['published_year']
 ]);
 }
 /**
 * Menghapus buku berdasarkan ID
 * @param int $id
 * @return bool
 */
 public function delete(int $id): bool
 {
 $stmt = $this->pdo->prepare('DELETE FROM books WHERE id = :id');
 return $stmt->execute([':id' => $id]);
 }
}