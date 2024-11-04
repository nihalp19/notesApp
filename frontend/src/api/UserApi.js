
export async function UserApiRegister(userData) {
    try {
        const response = await fetch("http://localhost:3000/user/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(userData)
        })

        if (!response.ok) {
            throw new Error("error in registration")
        }
        else {
            console.log("SuccessFully User is registed")
        }
        
        const UserData = await response.json()
        return true
    } catch (err) {
        console.log("err while registartion", err.message);
    }
}

export async function UserApiLogin(userData) {
    try {
        const response = await fetch("http://localhost:3000/user/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(userData)
        })

        if (!response.ok) {
            throw new Error("error in Login")
        }
        else {
            console.log("SuccessFully User is login")
        }

        const UserData = await response.json()
        return {success : true,data : UserData}
    } catch (err) {
        console.log("err while Login", err.message);
    }
}
