document.getElementById("hash-trigger").addEventListener("click", async () => {
  const algo = document.getElementById("algorithm-select").value;
  const outputBox = document.getElementById("text-output");

  // 1. Unified Algorithm Check
  if (algo === "none") {
    outputBox.innerHTML =
      '<span class="text-red-500">Please select an algorithm type.</span>';
    return;
  }

  // ─── BRANCH A: USER SELECTION IS IN TEXT INPUT MODE ───
  if (currentHashMode === "text") {
    const inputVal = document.getElementById("text-input").value;

    // Check text input validation
    if (!inputVal) {
      outputBox.innerHTML =
        '<span class="text-red-500">Please provide a text input.</span>';
      return;
    }

    outputBox.innerHTML =
      '<span class="text-slate-400 animate-pulse">Contacting backend engine...</span>';

    try {
      const res = await fetch("/api/hash", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: inputVal, algorithm: algo }),
      });
      const data = await res.json();
      if (res.ok) {
        outputBox.innerHTML = `<span class="text-blue-900 font-bold break-all">${data.hash}</span>`;
      } else {
        outputBox.innerHTML = `<span class="text-red-500">Backend Error: ${data.error}</span>`;
      }
    } catch (err) {
      outputBox.innerHTML =
        '<span class="text-red-500">Connection Failed: Server offline!</span>';
    }
  }

  // ─── BRANCH B: USER SELECTION IS IN FILE INPUT MODE ───
  else if (currentHashMode === "file") {
    // Check file input validation instead of text!
    if (!selectedGeneratorFile) {
      outputBox.innerHTML =
        '<span class="text-red-500">Please select or drop a file first.</span>';
      return;
    }

    outputBox.innerHTML =
      '<span class="text-slate-400 animate-pulse">Computing hash locally...</span>';

    try {
      let cryptoAlgoName = algo.toUpperCase();
      if (cryptoAlgoName === "SHA256") cryptoAlgoName = "SHA-256";
      if (cryptoAlgoName === "SHA1") cryptoAlgoName = "SHA-1";

      // Safety fallback check for Web Crypto MD5 limitations
      if (cryptoAlgoName === "MD5") {
        outputBox.innerHTML =
          '<span class="text-red-500">Web Crypto API does not support legacy MD5 file calculations. Please select SHA-256 or SHA-1.</span>';
        return;
      }

      const fileReader = new FileReader();

      // Look here: We extract the raw file object from our saved array container
      const fileToProcess = selectedGeneratorFile[0] || selectedGeneratorFile;
      fileReader.readAsArrayBuffer(fileToProcess);

      fileReader.onload = async (event) => {
        const hashBuffer = await crypto.subtle.digest(
          cryptoAlgoName,
          event.target.result,
        );
        const hashArray = Array.from(new Uint8Array(hashBuffer));
        const hexResult = hashArray
          .map((b) => b.toString(16).padStart(2, "0"))
          .join("");

        outputBox.innerHTML = `<span class="text-blue-900 font-bold break-all">${hexResult}</span>`;
      };
    } catch (err) {
      console.error(err);
      outputBox.innerHTML =
        '<span class="text-red-500">Local hashing engine failed.</span>';
    }
  }
});
