document.addEventListener("DOMContentLoaded", () => {
    isAuth();
})

const isAuth = () => {
    const auth = !!localStorage.getItem("raj:auth");
    if (!auth) {
        if (typeof window === 'undefined') return ;
        window.location.href = '/frontend/component/auth/signin.html';
    }
    return auth
}