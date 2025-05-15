<!DOCTYPE html>
<html lang="en">
<head>
 <meta charset="UTF-8">
 <title>Tambah Buku</title>
</head>
<body>
 <h1>Tambah Buku Baru</h1>
 <form action="index.php?action=create" method="post">
 <p>
 <label>Judul:<br>
 <input type="text" name="title" required>
 </label>
 </p>
 <p>
 <label>Penulis:<br>
 <input type="text" name="author" required>
 </label>
 </p>
 <p>
 <label>Tahun Terbit:<br>
 <input type="number" name="published_year" required>
 </label>
 </p>
 <p>
 <button type="submit">Simpan</button>
 <a href="index.php">Batal</a>
 </p>
 </form>
</body>
</html>