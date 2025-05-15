<!DOCTYPE html>
<html lang="en">
<head>
 <meta charset="UTF-8">
 <title>Daftar Buku</title>
 <style>
 body { font-family: Arial, sans-serif; margin: 20px; }
 table { width: 100%; border-collapse: collapse; margin-top: 10px; }
 th, td { border: 1px solid #ccc; padding: 8px; text-align: left; }
 th { background-color: #f5f5f5; }
 a { text-decoration: none; color: #007BFF; }
 a:hover { text-decoration: underline; }
 </style>
</head>
<body>
 <h1>Daftar Buku</h1>
 <a href="index.php?action=create">Tambah Buku Baru</a>
 <table>
 <thead>
 <tr>
 <th>ID</th>
 <th>Judul</th>
 <th>Penulis</th>
 <th>Tahun Terbit</th>
 <th>Aksi</th>
 </tr>
 </thead>
 <tbody>
 <?php if (!empty($books)): ?>
 <?php foreach ($books as $book): ?>
 <tr>
 <td><?= htmlspecialchars($book['id']) ?></td>
 <td><?= htmlspecialchars($book['title']) ?></td>
 <td><?= htmlspecialchars($book['author']) ?></td>
 <td><?= htmlspecialchars($book['published_year']) ?></td>
 <td>
 <a href="index.php?action=show&id=<?= $book['id'] ?>">Lihat</a> |
 <a href="index.php?action=delete&id=<?= $book['id'] ?>" onclick="return
confirm('Yakin hapus?')">Hapus</a>
 </td>
 </tr>
 <?php endforeach; ?>
 <?php else: ?>
 <tr><td colspan="5">Belum ada data buku.</td></tr>
 <?php endif; ?>
 </tbody>
 </table>
</body>
</html>