// Tohandle switching between text and file
const toggleVerifyTextBtn = document.getElementById("toggle-verify-text");
const toggleVerifyFileBtn = document.getElementById("toggle-verify-file");

const verifyTextContainer = document.getElementById("verify-text-container");
const verifyFileContainer = document.getElementById("verify-file-container");

// State flag tracking the verification sub-tab mode ('text' or 'file')
let currentVerifyMode = "text";

toggleVerifyTextBtn.addEventListener("click", () => {
  currentVerifyMode = "text";
  verifyTextContainer.classList.replace("hidden", "block");
  verifyFileContainer.classList.replace("block", "hidden");

  // Style button updates
  toggleVerifyTextBtn.className =
    "text-xs font-bold px-3 py-1 rounded-md bg-white text-blue-900 shadow-sm transition-all cursor-pointer";
  toggleVerifyFileBtn.className =
    "text-xs font-bold px-3 py-1 rounded-md text-slate-600 hover:text-slate-900 transition-all cursor-pointer";
});

toggleVerifyFileBtn.addEventListener("click", () => {
  currentVerifyMode = "file";
  verifyFileContainer.classList.replace("hidden", "block");
  verifyTextContainer.classList.replace("block", "hidden");

  // Style button updates
  toggleVerifyFileBtn.className =
    "text-xs font-bold px-3 py-1 rounded-md bg-white text-blue-900 shadow-sm transition-all cursor-pointer";
  toggleVerifyTextBtn.className =
    "text-xs font-bold px-3 py-1 rounded-md text-slate-600 hover:text-slate-900 transition-all cursor-pointer";
});
