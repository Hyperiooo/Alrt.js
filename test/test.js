document.getElementById("alert").onclick = () => {
    alrt.log(Math.random(), {
        icon: "hi-undo-line"
    })
}
let alrt = new Alrt({
    position: "top-center",
    duration: 5000, //default duration
    theme: "bitshift-confirmation",
    behavior: "overwrite"
});