document.getElementById("alert").onclick = () => {
    alrt.log("asdf", {
        subtext: "axd",
        duration: 20000,
        closeBtn: Math.random() >= 0.5
    })
}
let alrt = new Alrt({
    position: "bottom-left"
});
