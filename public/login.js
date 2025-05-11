document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('loginForm');
    const message = document.getElementById('message');

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const email = form.email.value;
        const password = form.password.value;

        try {
            const res = await fetch('/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: new URLSearchParams({ email, password })
            });

            if (res.redirected) {
                window.location.href = res.url;
            } else {
                const text = await res.text();
                message.textContent = text;
            }
        } catch (err) {
            message.textContent = 'Błąd połączenia z serwerem.';
        }
    });

    document.getElementById('exitButton').addEventListener('click', () => {
        window.location.href = '/';
    });
});
