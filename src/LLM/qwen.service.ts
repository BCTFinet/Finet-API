import { Injectable } from '@nestjs/common';
import { OpenAI } from 'openai';

@Injectable()
export class QwenService {
    async generateText(goal : number, savings: number, target_date: number, extra_prompt: string): Promise<string> {
        const prompt = `
            Anda adalah komunikator AI, bukan kalkulator.
            Model Random Forest (RF) telah menganalisis data dan memprediksi bahwa dibutuhkan 30 hari untuk mencapai target tabungan di ${target_date}.

            Data yang Dianalisis
            - Total tabungan saat ini: Rp ${savings}
            - Target: Rp ${goal}

            **Tugas Anda:**
            1. Jelaskan secara logis (tanpa menghitung manual) mengapa model RF dapat menghasilkan prediksi 30 hari.
            2. Pertimbangkan hal-hal seperti pola non-linear, volatilitas, dan faktor tersembunyi.
            3. Setelah menjelaskan secara rinci, buatlah ringkasan pendek (3-5 paragraf) yang merangkum inti penjelasan tersebut dengan bahasa yang mudah dipahami pengguna.

            Mulailah dengan penjelasan, lalu akhiri dengan bagian berjudul "Ringkasan Singkat".

            dan tambahkan instruksi tambahan berikut ke dalam penjelasan Anda:
            ${extra_prompt}
        `;

        const client = new OpenAI({
            baseURL: "https://router.huggingface.co/v1",
            apiKey: process.env.HF_TOKEN,
        });


        const response = await client.chat.completions.create({
            model: "Qwen/Qwen2.5-7B-Instruct",
            messages: [
                {
                    role: "user",
                    content: prompt,
                },
            ],
        });

        if (!response.choices || response.choices.length === 0) {
            throw new Error('No response from Qwen model');
        }
        
        return response.choices[0].message.content ?? '';
    }
}