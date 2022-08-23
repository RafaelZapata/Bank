async function login() {
    let emailInput = document.getElementById("inputEmail").value;
    let passwordInput = document.getElementById("inputPassword").value;

    let user = {
        email: emailInput,
        password: passwordInput,
    };

    const result = await fetch("http://localhost:7002/auth", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
    });
    const resultJson = await result.json();

    window.location.href = (function () {
        if (resultJson.status === true) {
            localStorage.setItem("@Authorization", resultJson.user.token);
            return resultJson.user.role + ".html";
        }
        return "pages/login.html";
    })();
}
