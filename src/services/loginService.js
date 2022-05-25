export { LoginService };

class LoginService {
    constructor() {
        this.url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyD8hfH8YVdrzF4LkhLi4q5lKhVludOeG_k';
        this.user = "";
    }

    login(user) {
        fetch(
                this.url, {
                    method: "post",
                    headers: {
                        "Content-type": "application/json; charset=UTF-8",
                    },
                    body: datos,
                }
            )
            .then((response) => {
                if (response.ok) {

                    pages.toast.init();
                    pages.toast.show('Logeado con exito', 'success');
                    setTimeout(() => {
                        window.location.reload();
                    }, 1000);

                    return response.json();

                } else {
                    /*  pages.toast.init();
                     pages.toast.show('Compruebe sus datos e intentelo de nuevo', 'error'); */
                    /*   setTimeout(() => {
                          window.location.reload();
                      }, 998); */
                    return response.json().then((text) => {
                        console.log(text);
                        throw new Error(text.error.message);
                    });
                }
            })
            .then((datos) => {

                localStorage.setItem("idToken", datos.idToken);
                localStorage.setItem("email", datos.email);

                console.log(datos);
            })
            .catch((error) => {
                console.error("Error;", error);

            });
    }
}