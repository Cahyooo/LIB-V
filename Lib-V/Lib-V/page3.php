<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>LIB-V Virtual Librarian Chatbot</title>
    <style href="style.css"></style>
</head>
<body>

    <div class="app-container">
        <button class="back-button" aria-label="Kembali">
            &lt;
        </button>

        <header class="chat-header">
            <div class="illustration-area">
                </div>
            <div class="header-content">
                <h1 class="welcome-text">
                    LIB–V Virtual Librarian
                </h1>
            </div>
        </header>

        <div class="chat-log" id="chat-log">
            <div class="message bot">
                <div class="message-bubble">Halo! Saya LIB-V, asisten perpustakaan virtual Anda. Apa yang bisa saya bantu hari ini?</div>
            </div>
        </div>

        <div class="input-area">
            <textarea id="user-input" placeholder="Ketik pesan Anda di sini..."></textarea>
            <button class="send-button" id="send-button" aria-label="Kirim Pesan">
                <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/>
                </svg>
            </button>
        </div>
    </div>

    <script>
        const chatLog = document.getElementById('chat-log');
        const userInput = document.getElementById('user-input');
        const sendButton = document.getElementById('send-button');
        const backButton = document.querySelector('.back-button');

        // Konstanta Teks (Menggantikan languageData)
        const INITIAL_GREETING = 'Halo! Saya LIB-V, asisten perpustakaan virtual Anda. Apa yang bisa saya bantu hari ini?';
        const BOT_RESPONSE_PREFIX = 'Saya menerima pertanyaan Anda:';
        const BOT_RESPONSE_SUFFIX = '. Mencari jawaban...';


        // Fungsi Tombol Kembali (ke page1.php)
        if (backButton) {
            backButton.addEventListener('click', function() {
                window.location.href = 'page1.php'; 
            });
        }
        
        // Fungsi untuk menambahkan pesan ke DOM
        function addMessage(text, sender) {
            const messageDiv = document.createElement('div');
            messageDiv.classList.add('message', sender, 'fade-in-start'); 
            
            const bubbleDiv = document.createElement('div');
            bubbleDiv.classList.add('message-bubble');
            bubbleDiv.textContent = text;
            
            messageDiv.appendChild(bubbleDiv);
            chatLog.appendChild(messageDiv);
            
            chatLog.scrollTop = chatLog.scrollHeight;
            
            // Pemicu Animasi Fade-in
            setTimeout(() => {
                messageDiv.classList.remove('fade-in-start');
            }, 50); 
        }

        // Fungsi untuk membuat dan menampilkan typing indicator
        function addTypingIndicator() {
            const messageDiv = document.createElement('div');
            messageDiv.classList.add('message', 'typing-indicator');
            messageDiv.id = 'typing-indicator'; 
            messageDiv.classList.add('fade-in-start'); 

            const bubbleDiv = document.createElement('div');
            bubbleDiv.classList.add('message-bubble');
            
            // Tambahkan 3 titik (dots)
            bubbleDiv.innerHTML = '<div class="dot"></div><div class="dot"></div><div class="dot"></div>';
            
            messageDiv.appendChild(bubbleDiv);
            chatLog.appendChild(messageDiv);
            chatLog.scrollTop = chatLog.scrollHeight;
            
            // Pemicu Animasi Fade-in Indicator
            setTimeout(() => {
                messageDiv.classList.remove('fade-in-start');
            }, 50); 
        }

        // Fungsi untuk menghapus typing indicator
        function removeTypingIndicator() {
            const indicator = document.getElementById('typing-indicator');
            if (indicator) {
                indicator.remove();
            }
        }
        
        // Fungsi Kirim Pesan
        function handleSendMessage() {
            const text = userInput.value.trim();
            if (text === '') return;

            addMessage(text, 'user');
            userInput.value = '';

            addTypingIndicator(); 
            
            setTimeout(() => {
                removeTypingIndicator(); 
                
                // Gunakan konstanta teks
                const botResponse = `${BOT_RESPONSE_PREFIX} "${text}"${BOT_RESPONSE_SUFFIX}`;
                addMessage(botResponse, 'bot');
            }, 1500); 
        }

        // Event Listeners
        sendButton.addEventListener('click', handleSendMessage);

        userInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleSendMessage();
            }
        });
    </script>

</body>
</html>