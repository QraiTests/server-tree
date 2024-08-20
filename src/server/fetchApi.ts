export async function fetchApi(url: string, init?: RequestInit) {
    try {
        const resp = await fetch(`https://test.vmarmysh.com${url}`, {
            ...init,
            mode: "cors",
        });

        return await resp.json();
    } catch {
        return null;
    }
}
