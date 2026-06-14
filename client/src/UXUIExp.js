const btnHash = document.getElementById("nav-hash");
const btnVerify = document.getElementById("nav-verify");

const viewHash = document.getElementById("panel-hash-workspace");
const viewVerify = document.getElementById("panel-verify-workspace");

// When user clicks the Verification sidebar item...
btnVerify.addEventListener("click", () => {
  // 1. Swap workspaces
  viewVerify.classList.replace("hidden", "block");
  viewHash.classList.replace("block", "hidden");

  // 2. Adjust button styling (make verification button look dark blue and active)
  btnVerify.className =
    "w-full text-left font-semibold text-sm px-4 py-3 rounded-lg bg-blue-900 text-white transition-colors cursor-pointer";
  btnHash.className =
    "w-full text-left font-semibold text-sm px-4 py-3 rounded-lg text-slate-600 hover:bg-slate-200 transition-colors cursor-pointer";
});

// When user clicks the Hashing sidebar item...
btnHash.addEventListener("click", () => {
  viewHash.classList.replace("hidden", "block");
  viewVerify.classList.replace("block", "hidden");

  btnHash.className =
    "w-full text-left font-semibold text-sm px-4 py-3 rounded-lg bg-blue-900 text-white transition-colors cursor-pointer";
  btnVerify.className =
    "w-full text-left font-semibold text-sm px-4 py-3 rounded-lg text-slate-600 hover:bg-slate-200 transition-colors cursor-pointer";
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
