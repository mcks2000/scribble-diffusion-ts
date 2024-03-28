'use client'

import Link from "next/link"
import { setReplicateKey } from '@/app/lib/client_actions';
import { useFormState } from 'react-dom';


export default function Welcome({ setWelcomeOpen }: { setWelcomeOpen: (data: boolean) => void }) {

    const initialState = { message: "", errors: {} };
    const [state, dispatch] = useFormState(setReplicateKey, initialState);
    if (!state) {
        setWelcomeOpen(false);
    }


    return (
        <div className="landing-page container flex-column mx-auto mt-24">
            <div className="hero mx-auto">
                <div className="hero-text text-center max-w-3xl mx-auto">
                    <h1 className="text-4xl font-bold mb-4">
                        <a href="https://replicate.com?utm_source=project&utm_campaign=scribblediffusion">
                            涂鸦-利用人工智能将素描变成精致的图像
                        </a>
                    </h1>
                </div>

                <div className="mt-12 max-w-xl mx-auto text-center">
                    <p className="text-base text-gray-500">
                        使用前，请获取 {" "}
                        <Link
                            className="underline"
                            href="https://replicate.com/account/api-tokens?utm_campaign=scribblediffusion-diy&utm_source=project"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            Replicate API token
                        </Link>{" "}
                        并粘贴到此处：
                    </p>

                    <form action={dispatch} >
                        <label htmlFor="api-key" className="sr-only">
                            API token
                        </label>
                        <input
                            type="text"
                            name="apiKey"
                            id="api-key"
                            className="block mt-6 w-full p-3 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-xl"
                            placeholder="r8_..."
                            aria-describedby="key-error"
                        />
                        <div className="mt-5 sm:mt-6 sm:gap-3">
                            <button
                                type="submit"
                                className="inline-flex w-full justify-center rounded-md bg-black p-3 text-xl text-sm font-semibold text-white shadow-sm hover:bg-gray-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-600 sm:col-start-2"
                            >
                                开始涂鸦 &rarr;
                            </button>
                        </div>
                    </form>

                    <div id="key-error" aria-live="polite" aria-atomic="true">
                        {state.errors?.apiKey?.map((error: string) => (
                            <p className="mt-2 text-sm text-red-500" key={error}>
                                {error}
                            </p>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}