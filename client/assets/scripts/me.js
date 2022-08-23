const content = document.getElementById("content");
const inputName = document.getElementById("inputName");
const inputEmail = document.getElementById("inputEmail");
const inputId = document.getElementById("inputId");
const inputBalance = document.getElementById("inputBalance");

async function me() {
    const raw = await fetch("http://localhost:7002/client/me", {
        method: "GET",
        headers: {
            Authorization: localStorage.getItem("@Authorization"),
        },
    });
    const res = await raw.json();
    let div = document.createElement("div");

    inputId.value = res.data._id;
    inputName.value = res.data.name;
    inputEmail.value = res.data.email;
    inputBalance.value = "R$" + res.data.balance + ",00";

    inputId.classList.add("hide");

    div.appendChild(inputId);
    div.appendChild(inputName);
    div.appendChild(inputEmail);
    div.appendChild(inputBalance);

    content.appendChild(div);
}

me();
