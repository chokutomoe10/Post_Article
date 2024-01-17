import { IArticle } from "../interfaces/Article";
import { API } from "../lib/api";
import { useState } from "react";

export function handleArticle() {
    const [form, setForm] = useState<IArticle>(
        {
            title: "",
            content: "",
            category: "",
        }
    )

    const createData = async (event: React.FormEvent) => {
        event.preventDefault()

        const formData = new FormData()
        formData.append("title", form.title || "")
        formData.append("content", form.content || "")
        formData.append("category", form.category || "")

        try {
            const response = await API.post("/article", formData)
            console.log(response.data)
        } catch (error) {
            console.log('error post article', error)
        }
    }

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;

        setForm({
            ...form,
            [name]: value,
        })
    }

    return {handleChange, createData, setForm}
}