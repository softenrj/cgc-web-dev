document.addEventListener("DOMContentLoaded", () => {
    const form = document.querySelector(".formcont");
    const name = document.querySelector(".name");
    const email = document.querySelector(".email");
    const pass = document.querySelector(".pass");
    const tmc = document.querySelector("#tmc");

    const toast = document.querySelector("#rj-tost");

    form.addEventListener("submit", async (e) => {
        e.preventDefault();

        if (!tmc.checked) {
            console.log("please accept the t&c");
            return;
        }

        const user = {
            name: name.value,
            email: email.value,
            pass: pass.value
        };

        const res = await fetch("http://localhost:8080/signup", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(user)
        });

        const data = await res.json();

        if (data.success) {
            localStorage.setItem("raj:auth", true);
            useToast(0, data.message)
            setTimeout(() => window.location.href = "/frontend/index.html", 1200)
        } else {
            useToast(1, data.message)
            console.log("fail");
        }
    });


    const useToast = (mode, message) => {

        toast.innerHTML = "";

        const p = document.createElement("p");
        p.textContent = message;
        toast.appendChild(p);

        toast.style.background = mode ? "red" : "green";

        toast.classList.remove("close");
        toast.classList.add("show");

        setTimeout(() => {
            toast.classList.remove("show");
            toast.classList.add("close");
        }, 3000);

        
    }
});