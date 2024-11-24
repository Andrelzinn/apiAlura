import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMNI_KEY );
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

export default async function generateDescription(imageBuffer) {
    const prompt = "Generate a description in English for the following image";

    try {
        const image = {
            inlineData: {
                data: imageBuffer.toString("base64"),
                mimeType: "image/png", 
            },
        };
        const res = await model.generateContent([prompt, image]);
        return res.response.text() || "Alt-text not disponible.";
    } catch (error) {
        console.error("Error getting alt-text:", error.message, error);
        throw new Error("Error getting Gemini alt-text");
    }
}


