<?php
// PAGE 2 – auto slide ke atas → masuk page3.php
?>
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>Virtual Assistant</title>
  <style>
    body, html {
      margin: 0;
      padding: 0;
      height: 100%;
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      background-color: #b8dcd7;
      display: flex;
      justify-content: center;
      align-items: center;
      overflow: hidden;
      position: relative;
      flex-direction: column;
      text-align: center;
      color: #6b7180;
    }

    body::before, body::after,
    .corner-top-right, .corner-bottom-left {
      content: "";
      position: fixed;
      width: 150px;
      height: 150px;
      background-image: url('https://i.ibb.co/HYVqmr8/flower-transparent.png');
      background-size: contain;
      background-repeat: no-repeat;
      opacity: 0.35;
      pointer-events: none;
      z-index: 0;
      filter: grayscale(40%) brightness(150%);
    }

    body::before { top: 0; left: 0; }
    body::after { top: 0; right: 0; transform: rotate(90deg); }
    .corner-bottom-left { bottom: 0; left: 0; transform: rotate(270deg); }
    .corner-top-right { bottom: 0; right: 0; transform: rotate(180deg); }

    .container {
      position: relative;
      z-index: 1;
      max-width: 360px;
      opacity: 0;
      transform: translateY(40px);
      animation: slideIn 0.1s ease-out forwards;
    }

    /* Masuk (slide dari bawah) */
    @keyframes slideIn {
      0% { opacity: 0; transform: translateY(40px); }
      100% { opacity: 1; transform: translateY(0); }
    }

    /* Keluar (slide ke atas) */
    @keyframes slideOut {
      0% { opacity: 1; transform: translateY(0); }
      100% { opacity: 0; transform: translateY(-60px); }
    }

    .slide-out {
      animation: slideOut 0.5s ease-in forwards;
    }

    .title {
      font-weight: 900;
      font-size: 18px;
      color: #fc81bd;
      letter-spacing: 2px;
      margin-bottom: 10px;
    }

    .assistant-image {
      max-width: 360px;
      width: 100%;
      height: auto;
      margin-bottom: 20px;
    }

    .subtitle {
      font-weight: 900;
      font-size: 24px;
      color: #6b7180;
      text-shadow: 1px 1px 2px rgba(0,0,0,0.1);
      user-select: none;
    }
  </style>
</head>

<body>

  <div class="corner-top-right"></div>
  <div class="corner-bottom-left"></div>

  <div class="container" id="mainBox">
    <div class="title">LIB-V</div>

    <img class="assistant-image" src="Pic/logo.png" alt="Virtual Assistant Illustration" />

    <div class="subtitle">YOUR VIRTUAL ASSISTANT</div>
  </div>

  <script>
    // Setelah animasi slide masuk selesai → tunggu sedikit → slide keluar → pindah ke page 3
    setTimeout(() => {
      document.getElementById("mainBox").classList.add("slide-out");

      // Setelah animasi keluar selesai → redirect page3.php
      setTimeout(() => {
        window.location.href = "page3.php";
      }, 700); // durasi slideOut
    }, 1200); // tunggu animasi slideIn selesai + jeda sedikit
  </script>

</body>
</html>
