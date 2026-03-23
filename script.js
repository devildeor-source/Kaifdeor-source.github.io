const input = document.getElementById("message");
const hello = document.getElementById("hello");
const micBtn = document.getElementById("micBtn");
const sendBtn = document.getElementById("sendBtn");

/* 1. Hide/Show Hello Text based on Input */
input.addEventListener("input", () => {
    // If the input is NOT empty
    if (input.value.trim() !== "") {
        hello.style.opacity = "0";
        hello.style.transform = "translate(-50%, -60%)"; // Slight upward movement as it fades
    } else {
        // If the input IS empty
        hello.style.opacity = "1";
        hello.style.transform = "translate(-50%, -50%)"; // Returns to original center
    }
});

/* 2. Voice Recognition */
let recognition;

if ("webkitSpeechRecognition" in window || "SpeechRecognition" in window) {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    recognition = new SpeechRecognition();
    
    recognition.continuous = false;
    recognition.lang = "en-US";

    micBtn.onclick = () => {
        // Optional: Add a visual cue to the button when recording
        micBtn.style.boxShadow = "0 0 20px #ff0055"; 
        recognition.start();
    };

    recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        input.value = transcript;
        
        // Trigger the "Hello" fade since we just added text via voice
        hello.style.opacity = "0";
    };

    recognition.onend = () => {
        micBtn.style.boxShadow = "0 0 10px #00f7ff"; // Reset glow
    };
}

/* 3. Send Button Logic */
const handleSend = () => {
    let question = input.value.trim();
    if (question === "") return;

    console.log("Searching Physics for:", question);

    /* This is where you will eventually add:
       fetch('/get_dimension?query=' + question)
    */
    
    // Optional: Clear input after sending
    // input.value = "";
    // hello.style.opacity = "1";
};

sendBtn.onclick = handleSend;

/* 4. Support Enter Key */
input.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
        handleSend();
    }
});
