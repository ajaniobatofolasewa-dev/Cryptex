const toggleTextBtn = document.getElementById("toggle-input-text");
const toggleFileBtn = document.getElementById("toggle-input-file");

const hashTextContainer = document.getElementById("hash-text-container");
const hashFileContainer = document.getElementById("hash-file-container");

// State flag: keeps track of what the user currently has selected ('text' or 'file')
let currentHashMode = "text";

toggleTextBtn.addEventListener("click", () => {
  currentHashMode = "text";
  hashTextContainer.classList.replace("hidden", "block");
  hashFileContainer.classList.replace("block", "hidden");

  // Style toggles
  toggleTextBtn.className =
    "text-xs font-bold px-3 py-1.5 rounded-md bg-white text-blue-900 shadow-sm transition-all cursor-pointer";
  toggleFileBtn.className =
    "text-xs font-bold px-3 py-1.5 rounded-md text-slate-600 hover:text-slate-900 transition-all cursor-pointer";
});

toggleFileBtn.addEventListener("click", () => {
  currentHashMode = "file";
  hashFileContainer.classList.replace("hidden", "block");
  hashTextContainer.classList.replace("block", "hidden");

  // Style toggles
  toggleFileBtn.className =
    "text-xs font-bold px-3 py-1.5 rounded-md bg-white text-blue-900 shadow-sm transition-all cursor-pointer";
  toggleTextBtn.className =
    "text-xs font-bold px-3 py-1.5 rounded-md text-slate-600 hover:text-slate-900 transition-all cursor-pointer";
});

const hashDropZone = document.getElementById("hash-drop-zone");
const hashHiddenInput = document.getElementById("hash-hidden-file-input");
const hashFileDetails = document.getElementById("hash-file-details");

let selectedGeneratorFile = null;

// Click to browse files natively
hashDropZone.addEventListener("click", () => hashHiddenInput.click());
hashHiddenInput.addEventListener("change", (e) => {
  if (e.target.files.length > 0) handleGeneratorFile(e.target.files[0]);
});

// Drag over style alterations
["dragenter", "dragover"].forEach((name) => {
  hashDropZone.addEventListener(name, () => {
    hashDropZone.className =
      "w-full border-2 border-dashed border-blue-900 rounded-xl p-8 bg-blue-50/50 transition-all flex flex-col items-center justify-center gap-2 cursor-pointer group";
  });
});

["dragleave", "drop"].forEach((name) => {
  hashDropZone.addEventListener(name, () => {
    hashDropZone.className =
      "w-full border-2 border-dashed border-slate-300 rounded-xl p-8 bg-white hover:bg-slate-50 hover:border-blue-900 transition-all flex flex-col items-center justify-center gap-2 cursor-pointer group";
  });
});

hashDropZone.addEventListener("drop", (e) => {
  if (e.dataTransfer.files.length > 0)
    handleGeneratorFile(e.dataTransfer.files[0]);
});

function handleGeneratorFile(file) {
  selectedGeneratorFile = file;
  const sizeInMB = (file.size / (1024 * 1024)).toFixed(2);
  hashFileDetails.innerText = `Selected: ${file.name} (${sizeInMB} MB)`;
  hashFileDetails.className =
    "text-xs text-blue-950 font-bold text-center bg-blue-100 rounded px-2 py-1 mt-1";
}
