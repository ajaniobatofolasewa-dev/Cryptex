const sidebarTggle = document.getElementById("sidebar-toggle");
sidebarTggle.addEventListener("click", () => {
  const sidebar = document.getElementById("sidebar");
  sidebar.classList.toggle("hidden");
  sidebar.classList.toggle("block");
});

// for the cipher button and display
const navCipherBtn = document.getElementById("nav-cipher");
const viewCipher = document.getElementById("panel-cipher-workspace");

navCipherBtn.addEventListener("click", async () => {
  viewHash.classList.replace("block", "hidden");
  viewVerify.classList.replace("block", "hidden");
  viewCipher.classList.replace("hidden", "block");

  navCipherBtn.className =
    "w-full text-left font-semibold text-sm px-4 py-3 rounded-lg bg-blue-900 text-white transition-colours cursor-pointer";
  btnHash.className =
    "w-full text-left font-semibold text-sm px-4 py-3 rounded-lg text-slate-600 hover:bg-slate-200 transition-colors cursor-pointer";
  btnVerify.className =
    "w-full text-left font-semibold text-sm px-4 py-3 rounded-lg text-slate-600 hover:bg-slate-200 transition-colors cursor-pointer";

  // to reload the output for all tabs
  document.getElementById("text-output").innerText = ""; // works
  document.getElementById("verify-status-output").innerText = ""; //works
  document.getElementById("cipher-output-display").innerText = ""; // works
});

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

  document.getElementById("verify-status-output").innerText = ""; //works
  document.getElementById("verify-hash-signature").value = ""; //works
  document.getElementById("init").selected = true; //works
});

toggleVerifyFileBtn.addEventListener("click", () => {
  currentVerifyMode = "file";

  verifyFileContainer.classList.replace("hidden", "block");
  verifyTextContainer.classList.replace("block", "hidden");

  document.getElementById("verify-status-output").innerText = ""; //works
  document.getElementById("verify-hash-signature").value = ""; //works
  document.getElementById("init").selected = true; //works

  // Style button updates
  toggleVerifyFileBtn.className =
    "text-xs font-bold px-3 py-1 rounded-md bg-white text-blue-900 shadow-sm transition-all cursor-pointer";
  toggleVerifyTextBtn.className =
    "text-xs font-bold px-3 py-1 rounded-md text-slate-600 hover:text-slate-900 transition-all cursor-pointer";
});

const btnHash = document.getElementById("nav-hash");
const btnVerify = document.getElementById("nav-verify");

const viewHash = document.getElementById("panel-hash-workspace");
const viewVerify = document.getElementById("panel-verify-workspace");

// When user clicks the Verification sidebar item...
btnVerify.addEventListener("click", () => {
  // 1. Swap workspaces
  viewVerify.classList.replace("hidden", "block");
  viewHash.classList.replace("block", "hidden");
  viewCipher.classList.replace("block", "hidden");

  // 2. Adjust button styling (make verification button look dark blue and active)
  btnVerify.className =
    "w-full text-left font-semibold text-sm px-4 py-3 rounded-lg bg-blue-900 text-white transition-colors cursor-pointer";
  navCipherBtn.className =
    "w-full text-left font-semibold text-sm px-4 py-3 rounded-lg text-slate-600 hover:bg-slate-200 transition-colors cursor-pointer";
  btnHash.className =
    "w-full text-left font-semibold text-sm px-4 py-3 rounded-lg text-slate-600 hover:bg-slate-200 transition-colors cursor-pointer";

  // to reload the output for all tabs
  document.getElementById("text-output").innerText = ""; // works
  document.getElementById("verify-status-output").innerText = ""; //works
  document.getElementById("cipher-output-display").innerText = ""; // works
});

// When user clicks the Hashing sidebar item...
btnHash.addEventListener("click", () => {
  viewHash.classList.replace("hidden", "block");
  viewVerify.classList.replace("block", "hidden");
  viewCipher.classList.replace("block", "hidden");

  btnHash.className =
    "w-full text-left font-semibold text-sm px-4 py-3 rounded-lg bg-blue-900 text-white transition-colors cursor-pointer";
  btnVerify.className =
    "w-full text-left font-semibold text-sm px-4 py-3 rounded-lg text-slate-600 hover:bg-slate-200 transition-colors cursor-pointer";
  navCipherBtn.className =
    "w-full text-left font-semibold text-sm px-4 py-3 rounded-lg text-slate-600 hover:bg-slate-200 transition-colors cursor-pointer";

  document.getElementById("text-output").innerText = ""; // works
  document.getElementById("verify-status-output").innerText = ""; //works
  document.getElementById("cipher-output-display").innerText = ""; // works
});

const dropZone = document.getElementById("drop-zone");
const fileInput = document.getElementById("hidden-file-input");
const fileDetails = document.getElementById("file-details");

// Variable to store our raw file memory bundle globally once uploaded
let selectedFileContainer = null;

// 1. Make the whole box clickable to open the native system browse finder window
dropZone.addEventListener("click", () => fileInput.click());

// 2. Capture when a user selects a file via browsing
fileInput.addEventListener("change", (e) => {
  if (e.target.files.length > 0) {
    handleFileSelection(e.target.files[0]);
  }
});

// 3. Prevent browser from opening files when dropped onto the window screen layout
["dragenter", "dragover", "dragleave", "drop"].forEach((eventName) => {
  window.addEventListener(eventName, (e) => e.preventDefault(), false);
});

// 4. Change styles to dark blue borders when hovering a file over our container box
["dragenter", "dragover"].forEach((eventName) => {
  dropZone.addEventListener(
    eventName,
    () => {
      dropZone.className =
        "w-full border-2 border-dashed border-blue-900 rounded-xl p-8 bg-blue-50/50 transition-all flex flex-col items-center justify-center gap-2 cursor-pointer group";
    },
    false,
  );
});

// 5. Restore normal gray border layout styles when drag leaves or drops
["dragleave", "drop"].forEach((eventName) => {
  dropZone.addEventListener(
    eventName,
    () => {
      dropZone.className =
        "w-full border-2 border-dashed border-slate-300 rounded-xl p-8 bg-white hover:bg-slate-50 hover:border-blue-900 transition-all flex flex-col items-center justify-center gap-2 cursor-pointer group";
    },
    false,
  );
});

// 6. Capture the file dropping action event package data
dropZone.addEventListener("drop", (e) => {
  const droppedFiles = e.dataTransfer.files;
  if (droppedFiles.length > 0) {
    handleFileSelection(droppedFiles[0]);
  }
});

// 7. Update the visual screen strings to show the filename and size
function handleFileSelection(file) {
  selectedFileContainer = file; // Save to our file memory bucket variable

  // Format the file size nicely into Kilobytes or Megabytes
  const sizeInMB = (file.size / (1024 * 1024)).toFixed(2);

  // Display the real filename inside our dash border box
  fileDetails.innerText = `Selected File: ${file.name} (${sizeInMB} MB)`;
  fileDetails.className =
    "text-xs text-blue-950 font-bold text-center bg-blue-100 rounded px-2 py-1 mt-1";
}
