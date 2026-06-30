// This is for the file and text verification sector
document
  .getElementById("verify-trigger")
  .addEventListener("click", async () => {
    if (currentVerifyMode === "text") {
      const vti = document.getElementById("verify-text-input").value;
      const vhs = document.getElementById("verify-hash-signature").value.trim();
      const algorSel = document.getElementById("algorithm-select-s").value;
      const vso = document.getElementById("verify-status-output");

      // const aglo = ["sha-1", "SHA-1", "sha-256", "SHA-256", "md5", "MD5"];

      if (
        !vti ||
        !vhs ||
        algorSel === /*aglo.includes(algorSel.trim())*/ "NONE"
      ) {
        vso.innerHTML =
          '<span class="text-red-500">Provide a text, a hash signature, and a valid algorithm type.</span>';
        return;
      }

      vso.innerHTML =
        '<span class="text-slate-400 animate-pulse">Computing cryptographic hash locally...</span>';

      try {
        const res = await fetch("http://localhost:9000/api/verify", {
          method: "POST",

          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            text: vti,
            expectedHash: vhs,
            algorithmProvided: algorSel,
          }),
        });

        const data = await res.json();

        if (data.match === true) {
          vso.innerHTML = `<span class="text-emerald-600">✓ INTEGRITY MATCH: Local file matches signature perfectly!</span>`;
          return;
        } else {
          vso.innerHTML = `<span class="text-red-500">✗ WARNING: File has been tampered with or corrupted!</span>`;
          return;
        }
      } catch (error) {
        vso.innerHTML =
          '<span class="text-red-500">Internal Server Error, Our team are trying their best to get you what you need</span>';
        return console.error(error + "text error occured");
      }
      return;
    }

    if (currentVerifyMode === "file") {
      const vhs = document.getElementById("verify-hash-signature").value.trim();
      const algorSel = document.getElementById("algorithm-select-s").value;
      const vso = document.getElementById("verify-status-output");

      // const algo = ["none", "NONE"];

      if (!selectedFileContainer || !vhs || algorSel === "none") {
        vso.innerHTML =
          '<span class="text-red-500">Provide a file, a hash signature, and an algorithm type.</span>';
        return;
      }

      vso.innerHTML =
        '<span class="text-slate-400 animate-pulse">Computing cryptographic hash locally...</span>';

      try {
        // Read the file as an ArrayBuffer (raw binary bytes instead of text strings)
        const fileReader = new FileReader();
        fileReader.readAsArrayBuffer(selectedFileContainer);

        fileReader.onload = async (event) => {
          const arrayBuffer = event.target.result;

          // Map your selection to the standard Web Crypto names (e.g. SHA-256)
          let cryptoAlgoName = algorSel.toUpperCase(); // turns 'sha256' into 'SHA-256'
          if (cryptoAlgoName === "SHA256") cryptoAlgoName = "SHA-256";
          if (cryptoAlgoName === "SHA1") cryptoAlgoName = "SHA-1";

          // Note: Web Crypto doesn't support the legacy MD5 algorithm locally for security reasons!
          if (cryptoAlgoName === "MD5") {
            vso.innerHTML =
              '<span class="text-red-500">Web Crypto API does not support legacy MD5. Please select SHA-256 or SHA-1.</span>';
            return;
          }

          // 3. Compute the hash using the browser's native hardware engine
          const hashBuffer = await crypto.subtle.digest(
            cryptoAlgoName,
            arrayBuffer,
          );

          // 4. Convert the binary hash buffer into a readable hexadecimal string
          const hashArray = Array.from(new Uint8Array(hashBuffer));
          const computedLocalHash = hashArray
            .map((b) => b.toString(16).padStart(2, "0"))
            .join("");

          // 5. Compare the results directly on the frontend screen!
          if (computedLocalHash === vhs.toLowerCase()) {
            vso.innerHTML =
              '<span class="text-emerald-600 font-bold">✓ INTEGRITY MATCH: Local file matches signature perfectly!</span>';
          } else {
            vso.innerHTML =
              '<span class="text-red-500 font-bold">✗ WARNING: File has been tampered with or corrupted!</span>';
          }
        };
      } catch (error) {
        console.error("Local hashing error:", error);
        vso.innerHTML =
          '<span class="text-red-500">Failed to calculate file hash locally.</span>';
      }
      return;
    }
  });
