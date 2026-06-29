//file picker
let selectedCipherFile = null;

const fileEncryptBox = document.getElementById("view-file-encrypt");
const expectedClick = document.getElementById("cipher-hidden-file-input");

fileEncryptBox.addEventListener("click", () => expectedClick.click());

const fileDecryptBox = document.getElementById("view-file-decrypt");
fileDecryptBox.addEventListener("click", () => expectedClick.click());

// 1. Group your drop zones into a clean, workable array list
const dz = document.getElementById("view-file-decrypt");
const ez = document.getElementById("view-file-encrypt");
const dropZones = [ez, dz]; // Clean list of elements

expectedClick.addEventListener("change", (e) => {
  if (e.target.files.length > 0) {
    selectedCipherFile = e.target.files[0];
    handleFileSelection(e.target.files[0]);
  }
});

// 3. Prevent browser from opening files when dropped onto the window screen layout
["dragenter", "dragover", "dragleave", "drop"].forEach((eventName) => {
  window.addEventListener(eventName, (e) => e.preventDefault(), false);
});

// 4. Loop through the array to add hover styles to BOTH boxes smoothly
["dragenter", "dragover"].forEach((eventName) => {
  dropZones.forEach((zone) => {
    zone.addEventListener(
      eventName,
      () => {
        zone.className =
          "w-full border-2 border-dashed border-blue-900 rounded-xl p-8 bg-blue-50/50 transition-all flex flex-col items-center justify-center gap-2 cursor-pointer group";
      },
      false,
    );
  });
});

// 5. Restore normal gray border layout styles when drag leaves or drops
["dragleave", "drop"].forEach((eventName) => {
  dropZones.forEach((zone) => {
    zone.addEventListener(
      eventName,
      () => {
        zone.className =
          "w-full border-2 border-dashed border-slate-300 rounded-xl p-8 bg-white hover:bg-slate-50 hover:border-blue-900 transition-all flex flex-col items-center justify-center gap-2 cursor-pointer group";
      },
      false,
    );
  });
});

// 6. Capture the file dropping action event package data on both zones
dropZones.forEach((zone) => {
  zone.addEventListener("drop", (e) => {
    const dfs = e.dataTransfer.files;
    if (dfs.length > 0) {
      selectedCipherFile = dfs[0];
      handleFileSelection(dfs[0]);
    }
  });
});

// 7. Update the visual screen strings to show the filename and size
function handleFileSelection(file) {
  // Format the file size nicely into Kilobytes or Megabytes
  const sizeInMB = (file.size / (1024 * 1024)).toFixed(2);

  // FIXED: Born in the open air so the whole function can see it!
  let detailsBox;

  if (currentCipherMode === "encrypt") {
    detailsBox = document.getElementById("cipher-file-encrypt-details");
  } else {
    detailsBox = document.getElementById("cipher-file-decrypt-details");
  }

  // Display the real filename inside our dash border box
  detailsBox.innerText = `Selected File: ${file.name} (${sizeInMB} MB)`;
  detailsBox.className =
    "text-xs text-blue-950 font-bold text-center bg-blue-100 rounded px-2 py-1 mt-1";
}

let currentCipherPayload = "file"; // Tracks 'file' or 'text'
let currentCipherMode = "encrypt"; // Tracks 'encrypt' or 'decrypt'

// The Layer 1 Sub-Toggle Buttons
const toggleCipherFileBtn = document.getElementById("cipher-toggle-file");
const toggleCipherTextBtn = document.getElementById("cipher-toggle-text");

// The Master Containers we want to show/hide
const masterFileContainer = document.getElementById(
  "cipher-file-master-container",
);
const masterTextContainer = document.getElementById(
  "cipher-text-master-container",
);

// ─── WHEN USER CLICKS "TEXT INPUT" ───
toggleCipherTextBtn.addEventListener("click", () => {
  // 1. Update our code memory gauge
  currentCipherPayload = "text";

  // 2. Hide the file container, show the text container
  masterFileContainer.classList.replace("block", "hidden");
  masterTextContainer.classList.replace("hidden", "block");

  // 3. THE WIPE: Clear out any uploaded file tracking data safely
  // document.getElementById("cipher-hidden-file-input").value = "";
  // document.getElementById("cipher-text-encrypt-input").value = "";
  // document.getElementById("cipher-text-decrypt-input").value = "";
  document.getElementById("cipher-key-input").value = "";
  document.getElementById("cipher-output-display").innerHTML =
    "Standing by for credentials...";

  // 4. Visual Styles: Make the text button look dark blue and active
  toggleCipherTextBtn.className =
    "text-xs font-bold px-3 py-1.5 rounded-md bg-white text-blue-900 shadow-sm transition-all cursor-pointer";
  toggleCipherFileBtn.className =
    "text-xs font-bold px-3 py-1.5 rounded-md text-slate-600 hover:text-slate-900 transition-all cursor-pointer";
});

// ─── WHEN USER CLICKS "FILE INPUT" ───
toggleCipherFileBtn.addEventListener("click", () => {
  // 1. Update our code memory gauge
  currentCipherPayload = "file";

  // 2. Hide the text container, show the file container
  masterTextContainer.classList.replace("block", "hidden");
  masterFileContainer.classList.replace("hidden", "block");

  // 3. THE WIPE: Clear out the textareas completely
  document.getElementById("cipher-key-input").value = "";
  document.getElementById("cipher-output-display").innerHTML =
    "Standing by for credentials...";

  // 4. Visual Styles: Make the file button look dark blue and active
  toggleCipherFileBtn.className =
    "text-xs font-bold px-3 py-1.5 rounded-md bg-white text-blue-900 shadow-sm transition-all cursor-pointer";
  toggleCipherTextBtn.className =
    "text-xs font-bold px-3 py-1.5 rounded-md text-slate-600 hover:text-slate-900 transition-all cursor-pointer";
});

// Layer 2 Sub-Toggle Buttons
const toggleCipherEncryptBtn = document.getElementById("cipher-toggle-encrypt");
const toggleCipherDecryptBtn = document.getElementById("cipher-toggle-decrypt");

// The Four Inner View Containers
const viewFileEncrypt = document.getElementById("view-file-encrypt");
const viewFileDecrypt = document.getElementById("view-file-decrypt");
const viewTextEncrypt = document.getElementById("view-text-encrypt");
const viewTextDecrypt = document.getElementById("view-text-decrypt");

// ─── WHEN USER CLICKS "ENCRYPT MODE" ───
toggleCipherEncryptBtn.addEventListener("click", () => {
  // 1. Update our memory gauge state
  currentCipherMode = "encrypt";

  // 2. Conditional Check: Are we looking at Files or Text right now?
  if (currentCipherPayload === "file") {
    viewFileEncrypt.classList.replace("hidden", "block");
    viewFileDecrypt.classList.replace("block", "hidden");
  } else {
    viewTextEncrypt.classList.replace("hidden", "block");
    viewTextDecrypt.classList.replace("block", "hidden");
  }

  // 3. THE WIPE: Reset input fields and clear active tracking operations
  // document.getElementById("cipher-text-decrypt-input").value = "";
  document.getElementById("cipher-key-input").value = "";
  document.getElementById("cipher-output-display").innerHTML =
    "Standing by for credentials...";

  // 4. Visual Styles: Highlight the Encrypt button
  toggleCipherEncryptBtn.className =
    "text-xs font-bold px-3 py-1.5 rounded-md bg-white text-blue-900 shadow-sm transition-all cursor-pointer";
  toggleCipherDecryptBtn.className =
    "text-xs font-bold px-3 py-1.5 rounded-md text-slate-600 hover:text-slate-900 transition-all cursor-pointer";
});

// ─── WHEN USER CLICKS "DECRYPT MODE" ───
toggleCipherDecryptBtn.addEventListener("click", () => {
  // 1. Update our memory gauge state
  currentCipherMode = "decrypt";

  // 2. Conditional Check: Are we looking at Files or Text right now?
  if (currentCipherPayload === "file") {
    viewFileDecrypt.classList.replace("hidden", "block");
    viewFileEncrypt.classList.replace("block", "hidden");
  } else {
    viewTextDecrypt.classList.replace("hidden", "block");
    viewTextEncrypt.classList.replace("block", "hidden");
  }

  // 3. THE WIPE: Reset input fields and clear active tracking operations
  // document.getElementById("cipher-text-encrypt-input").value = "";
  document.getElementById("cipher-key-input").value = "";
  document.getElementById("cipher-output-display").innerHTML =
    "Standing by for credentials...";

  // 4. Visual Styles: Highlight the Decrypt button
  toggleCipherDecryptBtn.className =
    "text-xs font-bold px-3 py-1.5 rounded-md bg-white text-blue-900 shadow-sm transition-all cursor-pointer";
  toggleCipherEncryptBtn.className =
    "text-xs font-bold px-3 py-1.5 rounded-md text-slate-600 hover:text-slate-900 transition-all cursor-pointer";
});

document
  .getElementById("cipher-trigger")
  .addEventListener("click", async () => {
    // 1. Capture our secret password input value
    const keyInput = document.getElementById("cipher-key-input").value.trim();
    const outputDisplay = document.getElementById("cipher-output-display");

    // 2. Shared Security Guardrail: Every cipher mode requires a password!
    if (!keyInput) {
      outputDisplay.innerHTML =
        '<span class="text-red-500">Please provide a private secret key phrase to continue.</span>';
      return;
    }

    // 3. THE CONTROL TOWER ROUTER

    // ─── ROAD 1: FILE + ENCRYPT ───
    if (currentCipherPayload === "file" && currentCipherMode === "encrypt") {
      if (!selectedCipherFile) {
        return (outputDisplay.innerHTML =
          '<p class="text-red-500">Please Provide a file to encrypt</p>');
      }

      outputDisplay.innerHTML =
        '<span class="text-slate-400 animate-pulse">Processing file encryption lock...</span>';

      try {
        const reader = new FileReader();

        reader.onload = async (event) => {
          const rawFileBytes = event.target.result;

          const fileTextEncoder = new TextEncoder();
          const encodedKey = fileTextEncoder.encode(keyInput);

          const baseKey = await crypto.subtle.importKey(
            "raw",
            encodedKey,

            { name: "PBKDF2" },
            false,
            ["deriveKey"],
          );

          const salt = crypto.getRandomValues(new Uint8Array(16));

          const iv = crypto.getRandomValues(new Uint8Array(12));

          const aesKey = await crypto.subtle.deriveKey(
            {
              name: "PBKDF2",
              salt: salt,
              iterations: 100000,
              hash: "SHA-256",
            },
            baseKey,
            { name: "AES-GCM", length: 256 },
            false,
            ["encrypt"],
          );

          const fileEncryptedBuffer = await crypto.subtle.encrypt(
            { name: "AES-GCM", iv: iv },
            aesKey,
            rawFileBytes,
          );

          const fileTotalSize = 16 + 12 + fileEncryptedBuffer.byteLength;

          const totalFileByte = new Uint8Array(fileTotalSize);

          totalFileByte.set(salt, 0);
          totalFileByte.set(iv, 16);
          totalFileByte.set(new Uint8Array(fileEncryptedBuffer), 28);

          const blob = new Blob([totalFileByte], {
            type: "application/octet-stream",
          });

          const download = document.createElement("a");
          download.href = URL.createObjectURL(blob);
          download.download = selectedCipherFile.name + ".enc";

          download.click();

          URL.revokeObjectURL(download.href); // to remove things like cache and free up memry
        };

        reader.readAsArrayBuffer(selectedCipherFile);
      } catch (error) {
        outputDisplay.innerHTML = `An error occured at: ${error}`;
      }
    }

    // ─── ROAD 2: FILE + DECRYPT ───
    else if (
      currentCipherPayload === "file" &&
      currentCipherMode === "decrypt"
    ) {
      if (!selectedCipherFile) {
        return (outputDisplay.innerHTML =
          '<p class="text-red-500">Please Provide a file to decrypt</p>');
      }

      outputDisplay.innerHTML =
        '<span class="text-slate-400 animate-pulse">Unlocking encrypted file array...</span>';

      try {
        const reader = new FileReader();

        reader.onload = async (e) => {
          const encryptedFileBytes = e.target.result;

          const bytesDecoder = new TextDecoder();

          const theEcdKey = new TextEncoder().encode(keyInput);

          const actualStartingBytes = new Uint8Array(encryptedFileBytes);

          const salt = actualStartingBytes.slice(0, 16);

          const iv = actualStartingBytes.slice(16, 28);

          const actualEncryptedPayloadBytes = actualStartingBytes.slice(28);

          try {
            const baseKey = await crypto.subtle.importKey(
              "raw",
              theEcdKey,
              { name: "PBKDF2" },
              false,
              ["deriveKey"],
            );

            const aesKey = await crypto.subtle.deriveKey(
              {
                name: "PBKDF2",
                salt: salt,
                iterations: 100000,
                hash: "SHA-256",
              },

              baseKey,
              { name: "AES-GCM", length: 256 },
              false,
              ["decrypt"],
            );

            const decryptedFileBuffer = await crypto.subtle.decrypt(
              { name: "AES-GCM", iv: iv },
              aesKey,
              actualEncryptedPayloadBytes,
            );

            const blob = new Blob([decryptedFileBuffer], {
              type: "application/octet-stream",
            });

            const download = document.createElement("a");
            download.href = URL.createObjectURL(blob);
            download.download = selectedCipherFile.name.replace(/\.enc$/, "");

            download.click();

            URL.revokeObjectURL(download.href);
          } catch (error) {
            outputDisplay.innerHTML =
              '<span class="text-red-500 font-bold">✗ Decryption Failed: Invalid password key or corrupted file bundle.</span>';
          }
        };

        reader.readAsArrayBuffer(selectedCipherFile);
      } catch (error) {
        console.error(error);
        outputDisplay.innerHTML = `<span class="text-red-500 font-bold">An error occured: ${error.message}</span>`;
      }
    }

    // ─── ROAD 3: TEXT + ENCRYPT ───
    else if (
      currentCipherPayload === "text" &&
      currentCipherMode === "encrypt"
    ) {
      const rawText = document.getElementById(
        "cipher-text-encrypt-input",
      ).value;

      if (!rawText) {
        outputDisplay.innerHTML =
          '<span class="text-red-500">Please provide a text message to encrypt.</span>';
        return;
      }

      outputDisplay.innerHTML =
        '<span class="text-slate-400 animate-pulse">Scrambling text message payload...</span>';

      try {
        // 1. Text Encoder turns your string characters into a raw binary byte array
        const textEncoder = new TextEncoder();
        const encodedText = textEncoder.encode(rawText);
        const encodedKey = textEncoder.encode(keyInput);

        // 2. Import your raw text password to prepare it for stretching
        const baseKey = await crypto.subtle.importKey(
          "raw",
          encodedKey,
          { name: "PBKDF2" },
          false,
          ["deriveKey"],
        );

        // 3. Stretch your password into a highly secure 256-bit AES cryptographic key
        const aesKey = await crypto.subtle.deriveKey(
          {
            name: "PBKDF2",
            salt: textEncoder.encode("StaticSaltString"), // Salt standardizes string stretching lengths
            iterations: 100000,
            hash: "SHA-256",
          },
          baseKey,
          { name: "AES-GCM", length: 256 },
          false,
          ["encrypt"],
        );

        // 4. Generate a unique 12-byte random Initialisation Vector (IV) passcode
        const iv = crypto.getRandomValues(new Uint8Array(12));

        // 5. Execute the AES-GCM encryption math inside the browser hardware layer
        const encryptedBuffer = await crypto.subtle.encrypt(
          { name: "AES-GCM", iv: iv },
          aesKey,
          encodedText,
        );

        // 6. Convert the IV array and Encrypted content array into readable Hex strings
        const hexIV = bufferToHex(iv.buffer);
        const hexCiphertext = bufferToHex(encryptedBuffer);

        // 7. Combine them into one package! We stick the IV to the front so the Decryptor can read it later
        const finalSecureBundle = `${hexIV}:${hexCiphertext}`;

        // 8. Inject the final unreadable scrambled code block straight into the Tailwind screen
        outputDisplay.innerHTML = `
        <div class="flex flex-col gap-1 text-left w-full">
          <span class="text-xs font-bold text-blue-900 uppercase">Secure Ciphertext Bundle (Save This):</span>
          <span class="text-xs text-slate-800 break-all bg-slate-50 border p-2 rounded select-all font-mono">${finalSecureBundle}</span>
        </div>
      `;
      } catch (err) {
        console.error(err);
        outputDisplay.innerHTML =
          '<span class="text-red-500">Encryption sequence encountered an internal error.</span>';
      }
    }

    // ─── ROAD 4: TEXT + DECRYPT ───
    else if (
      currentCipherPayload === "text" &&
      currentCipherMode === "decrypt"
    ) {
      const ciphertextBundle = document
        .getElementById("cipher-text-decrypt-input")
        .value.trim();

      if (!ciphertextBundle) {
        outputDisplay.innerHTML =
          '<span class="text-red-500">Please provide a ciphertext bundle to decrypt.</span>';
        return;
      }

      // Basic structure check: Make sure a colon separates the IV and Ciphertext
      if (!ciphertextBundle.includes(":")) {
        outputDisplay.innerHTML =
          '<span class="text-red-500">Invalid bundle format. Make sure it contains a colon (:) separator.</span>';
        return;
      }

      outputDisplay.innerHTML =
        '<span class="text-slate-400 animate-pulse">Reversing text encryption matrix...</span>';

      try {
        // 1. Tear the bundle apart at the colon marker
        const parts = ciphertextBundle.split(":");
        const ivHex = parts[0];
        const ciphertextHex = parts[1];

        // 2. Translate the hex text characters back into raw computer binary buffers
        const ivBuffer = hexToBuffer(ivHex);
        const ciphertextBuffer = hexToBuffer(ciphertextHex);

        const textEncoder = new TextEncoder();
        const encodedKey = textEncoder.encode(keyInput);

        // 3. Re-import your raw password string to prepare for stretching
        const baseKey = await crypto.subtle.importKey(
          "raw",
          encodedKey,
          { name: "PBKDF2" },
          false,
          ["deriveKey"],
        );

        // 4. Regenerate the exact same 256-bit AES master key
        const aesKey = await crypto.subtle.deriveKey(
          {
            name: "PBKDF2",
            salt: textEncoder.encode("StaticSaltString"), // Salt must match encryption EXACTLY
            iterations: 100000,
            hash: "SHA-256",
          },
          baseKey,
          { name: "AES-GCM", length: 256 },
          false,
          ["decrypt"], // Notice this is now set to authorize decryption!
        );

        // 5. Execute the AES-GCM decryption math inside the hardware layer
        const decryptedBuffer = await crypto.subtle.decrypt(
          { name: "AES-GCM", iv: new Uint8Array(ivBuffer) },
          aesKey,
          ciphertextBuffer,
        );

        // 6. TextDecoder converts the clean binary byte arrays back into normal English text strings
        const textDecoder = new TextDecoder();
        const recoveredPlaintext = textDecoder.decode(decryptedBuffer);

        // 7. Render your recovered secret message beautifully on the screen!
        outputDisplay.innerHTML = `
        <div class="flex flex-col gap-1 text-left w-full">
          <span class="text-xs font-bold text-emerald-600 uppercase">✓ Decryption Successful:</span>
          <span class="text-sm text-slate-800 p-2 bg-emerald-50 border border-emerald-200 rounded font-sans select-all">${recoveredPlaintext}</span>
        </div>
      `;
      } catch (err) {
        console.error(err);
        // If the password is wrong, Web Crypto intentionally throws an error to hide information
        outputDisplay.innerHTML =
          '<span class="text-red-500 font-bold">✗ Decryption Failed: Invalid key password or corrupted payload bundle.</span>';
      }
    }
  });

// Universal helper to convert a raw binary ArrayBuffer into a readable Hexadecimal String
function bufferToHex(buffer) {
  return Array.from(new Uint8Array(buffer))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

// Universal helper to convert a Hexadecimal String back into a raw binary ArrayBuffer
function hexToBuffer(hexString) {
  const bytes = new Uint8Array(
    hexString.match(/.{1,2}/g).map((byte) => parseInt(byte, 16)),
  );
  return bytes.buffer;
}
