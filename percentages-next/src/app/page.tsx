import SignupForm from '@/components/SignupForm';
import AutoResume from '@/components/AutoResume';

export default function Home() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-purple-900 to-violet-900 p-4">
      <AutoResume />
      <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]"></div>
      <div className="relative z-10 w-full flex justify-center">
        <SignupForm />
      </div>
    </main>
  );
}
