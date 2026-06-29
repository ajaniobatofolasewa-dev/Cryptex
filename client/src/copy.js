const allCopyBtns = ["hash-copy-button", "cipher-copy-btn"];
const textElements = ["text-output", "cipher-output-display"];
const orignlSVG = ["hashSVG", "cipherSVG"];

// const hashCopyButton = document.getElementById("hash-copy-button");
// const hashFileCopyBtn = document.getElementById("hash-file-copy-button");

const copyBtns = allCopyBtns.map((btnId) => document.getElementById(btnId));
const textValues = textElements.map((txtVal) =>
  document.getElementById(txtVal),
);
const realSVGs = orignlSVG.map((svg) => {
  const el = document.getElementById(svg);
  return el ? el.outerHTML : "";
});

const copyText = async (text) => {
  try {
    navigator.clipboard.writeText(text);
    return true;
  } catch (error) {
    return false;
  }
};

// textValues.forEach((0, 1) => {
// })

copyBtns.forEach((button, i) => {
  button.addEventListener("click", async () => {
    // let freedtxt = "";
    textValues.forEach(async (txt, index) => {
      if (index === i) {
        const freedtxt = txt.innerText;

        const copied = await copyText(freedtxt);

        if (copied) {
          // realSVGs.forEach((svgs, numb) => {

          //     // svgs.innerHTML =

          // })
          button.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="green" class="bi bi-clipboard-check" viewBox="0 0 16 16">
  <path fill-rule="evenodd" d="M10.854 7.146a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 1 1 .708-.708L7.5 9.793l2.646-2.647a.5.5 0 0 1 .708 0"/>
  <path d="M4 1.5H3a2 2 0 0 0-2 2V14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V3.5a2 2 0 0 0-2-2h-1v1h1a1 1 0 0 1 1 1V14a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V3.5a1 1 0 0 1 1-1h1z"/>
  <path d="M9.5 1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5zm-3-1A1.5 1.5 0 0 0 5 1.5v1A1.5 1.5 0 0 0 6.5 4h3A1.5 1.5 0 0 0 11 2.5v-1A1.5 1.5 0 0 0 9.5 0z"/>
</svg>`;

          setTimeout(() => {
            button.innerHTML = realSVGs[i];
          }, 3000);
        } else {
          console.log("Couln't copy probably due to system restrictions");
        }
      }
    });
  });
});

// function textCopy() {
//   navigator.clipboard.writeText(textValues);
// }
