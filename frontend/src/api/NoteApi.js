export async function sendNoteData(noteData) {
    try {
        const response = await fetch("http://localhost:3000/note/addnote", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(noteData),
            credentials: "include"
        })

        if (!response.ok) {
            console.log("err while sending note", response)
        }
        console.log("Successfully data send",response)
        const data = await response.json()
        return { succes: true, data }
    } catch (err) {
        console.log("err while sending note :", err.message)
    }
}

export const fetchData = async () => {
    try {
        const response = await fetch("http://localhost:3000/note/fetchnote", {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            },
            credentials: 'include'
        })

        if (!response.ok) {
            console.log("response err while fetching data", response)
            return
        }

        console.log("Successfully fetched", response)
        const data = await response.json()
        console.log("Successfully fetched data :", data)
        return {data : data.note}
    } catch (err) {
        console.log("err while fetching", err.message)
    }
}

export const UpdateNoteData = async (updateNote) => {
    try {
        const response = await fetch("http://localhost:3000/note/updatenote", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body : JSON.stringify(updateNote),
            credentials: 'include'
        })

        if (!response.ok) {
            console.log("response err while updating data", response)
            return
        }

        console.log("Successfully updating", response)
        const data = await response.json()
        console.log("Successfully updating data :", data)
    } catch (err) {
        console.log("err while updating", err.message)
    }
}


