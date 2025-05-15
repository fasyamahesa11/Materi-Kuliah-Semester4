<?php
  if (!empty($_GET['q'])) {
    switch ($_GET['q']) {
      case 'info':
        phpinfo(); 
        exit;
      break;
    }
  }
?>
<!DOCTYPE html>
<html>
    <head>
        <title>Institut Mahardika</title>
        <link rel="shortcut icon" href="https://mahardika.ac.id/wp-content/uploads/2023/02/Logo-Only-ITEKES-Mahardika-HD-1024x1024.png" type="image/x-icon">

        <link rel="preconnect" href="https://fonts.googleapis.com">
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
        <link href="https://fonts.googleapis.com/css2?family=Rubik:ital,wght@0,300..900;1,300..900&display=swap" rel="stylesheet">

        <style>
            html, body {
                height: 100%;
            }

            body {
                margin: 0;
                padding: 0;
                width: 100%;
                display: table;
                font-weight: 300;
                font-family: "Rubik", sans-serif;
            }

            .rubik-font {
                font-family: "Rubik", sans-serif;
                font-optical-sizing: auto;
                font-weight: 300;
                font-style: normal;
            }


            .container {
                text-align: center;
                display: table-cell;
                vertical-align: middle;
            }

            .content {
                text-align: center;
                display: inline-block;
            }

            .title {
                font-size: 5rem;
            }

            .subtitle {
                font-size: 2rem;
            }

            .opt {
                margin-top: 30px;
            }

            .opt a {
              text-decoration: none;
              font-size: 150%;
            }
            
            a:hover {
              color: blue;
            }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="content">
                <div class="">
                    <img src="https://mahardika.ac.id/wp-content/uploads/2023/02/Logo-Only-ITEKES-Mahardika-HD-1024x1024.png" alt="Logo Institut Mahardika" width="200">
                </div>
                <div class="title" title="Institut Mahardika">Institut Mahardika</div>
                <div class="subtitle" title="With Laragon">with Laragon</div>
     
                <div class="info"><br />
                      <?php print($_SERVER['SERVER_SOFTWARE']); ?><br />
                      PHP version: <?php print phpversion(); ?>   <span><a title="phpinfo()" href="/?q=info">info</a></span><br />
                      Document Root: <?php print ($_SERVER['DOCUMENT_ROOT']); ?><br />

                </div>
                <div class="opt">
                  <div><a title="Getting Started" href="https://laragon.org/docs" target="_blank">Getting Started</a></div>
                </div>
            </div>

        </div>
    </body>
</html>