<!DOCTYPE html>
<html lang="en">
<head>
 <meta charset="UTF-8">
 <title>Detail Buku</title>
</head>
<body>
 <h1>Detail Buku</h1>
 <?php if ($book): ?>
 <p><strong>ID:</strong> <?= htmlspecialchars($book['id']) ?></p>
 <p><strong>Judul:</strong> <?= htmlspecialchars($book['title']) ?></p>
 <p><strong>Penulis:</strong> <?= htmlspecialchars($book['author']) ?></p>
 <p><strong>Tahun Terbit:</strong> <?= htmlspecialchars($book['published_year'])
?></p>
 <p><a href="index.php">Kembali ke Daftar Buku</a></p>
 <?php else: ?>
 <p>Buku tidak ditemukan.</p>
 <p><a href="index.php">Kembali ke Daftar Buku</a></p>
 <?php endif; ?>
</body>
</html>