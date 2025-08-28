const information = document.getElementById("information");
information.innerText = `This app is using Chrome (v${window.versions.chrome()}), Node.js (v${window.versions.node()}), Electron (v${window.versions.electron()}), with platform ${window.versions.platform()}  .`;
