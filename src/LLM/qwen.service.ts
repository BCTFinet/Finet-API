import { Injectable } from '@nestjs/common';
import { OpenAI } from 'openai';

@Injectable()
export class QwenService {
// prompt = f"""
// Anda adalah komunikator AI, bukan kalkulator.
// Model Random Forest (RF) telah menganalisis data dan memprediksi bahwa dibutuhkan **{predicted_days:.2f} hari** untuk mencapai target tabungan.

// **Data yang Dianalisis:**
// - Histori tabungan:
// {history_str}
// - Tabungan harian terakhir: Rp{net_saving:,}
// - Total tabungan saat ini: Rp{cumulative_savings:,}
// - Target: Rp{goal_amount:,}
// {projection_str}

// **Tugas Anda:**
// 1. Jelaskan secara logis (tanpa menghitung manual) mengapa model RF dapat menghasilkan prediksi {predicted_days:.2f} hari.
// 2. Pertimbangkan hal-hal seperti pola non-linear, volatilitas, dan faktor tersembunyi.
// 3. Setelah menjelaskan secara rinci, buatlah ringkasan pendek (3–5 paragraf) yang merangkum inti penjelasan tersebut dengan bahasa yang mudah dipahami pengguna.

// Mulailah dengan penjelasan, lalu akhiri dengan bagian berjudul **"Ringkasan Singkat:"**.
// """

    async generateText(prompt: string): Promise<string> {
        console.log(process.env.HF_TOKEN);
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