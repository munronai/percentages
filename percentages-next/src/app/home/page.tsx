import StartGameButton from "@/components/StartGameButton";

export default function HomePage() {
    return (
        <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-8 space-y-8">
            <div className="text-center space-y-4">
                <h1 className="text-5xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-blue-500">
                    Welcome Home
                </h1>
                <p className="text-xl text-gray-400">Step right up to the game lobby.</p>
            </div>

            <div className="w-full max-w-sm pt-8">
                <StartGameButton />
            </div>
        </div>
    )
}
