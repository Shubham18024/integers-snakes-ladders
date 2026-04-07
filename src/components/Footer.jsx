import { GITHUB_PROFILE } from '../constants/gameConfig';

export default function Footer() {
  return (
    <footer className="w-full border-t border-white/10 bg-black/25 py-3 text-center text-sm text-slate-100 backdrop-blur-md">
      Game created by{' '}
      <a className="font-semibold text-indigo-300 underline hover:text-indigo-200" href={GITHUB_PROFILE} target="_blank" rel="noreferrer">
        Shubham
      </a>
      , made with ❤️
    </footer>
  );
}
