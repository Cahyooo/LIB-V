<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>Start Button with Logo on Top</title>

  <style>
    body {
      margin: 0;
      background-color: #7fa4ad;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      height: 100vh;
      font-family: Arial, sans-serif;

      /* posisi awal halaman (sebelum slide keluar) */
      transition: transform 0.7s ease-in, opacity 0.7s ease-in;
    }

    /* Efek slide ke atas saat keluar */
    .slide-out {
      transform: translateY(-80px);
      opacity: 0;
    }

    .container {
      text-align: center;
    }

    .image {
      max-width: 350px;
      height: auto;
      margin-bottom: 20px;
      display: block;
      margin-left: auto;
      margin-right: auto;
    }

    button.start-button {
      font-weight: 500;
      font-size: 30px;
      color: #0f292f;
      background-color: transparent;
      border: 3px solid #0f292f;
      cursor: pointer;
      letter-spacing: 2px;
      padding: 10px 20px;
      border-radius: 100px;
      transition: background-color 0.5s, color 0.3s;
    }

    button.start-button:hover {
      background-color: #0f292f;
      color: #ffffff;
    }

    button.start-button:focus {
      outline: none;
    }
  </style>
</head>
<body>

  <div class="container">
    <img class="image" src="Pic/logo.png" alt="Logo" />
    <button type="button" class="start-button" id="startBtn">START</button>
  </div>

  <script>
    document.getElementById("startBtn").addEventListener("click", function () {

      // Tambahkan class untuk animasi slide-up
      document.body.classList.add("slide-out");

      // Tunggu animasi selesai
      setTimeout(() => {
        window.location.href = "page2.php";
      }, 700); // harus sama dengan transition 0.7s
    });
  </script>

</body>
</html>
