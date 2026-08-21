export type Theme = "light" | "dark";

export const THEME_BOOTSTRAP_SCRIPT = `(function(){try{var t=localStorage.getItem('theme');var s=t==='light'||t==='dark'?t:null;var d=s?s==='dark':matchMedia('(prefers-color-scheme: dark)').matches;document.documentElement.classList.toggle('dark',d);document.documentElement.style.colorScheme=d?'dark':'light'}catch(e){}})()`;

export function resolveTheme(savedTheme: string | null, prefersDark: boolean): Theme {
  if (savedTheme === "light" || savedTheme === "dark") return savedTheme;
  return prefersDark ? "dark" : "light";
}

export function applyTheme(theme: Theme) {
  document.documentElement.classList.toggle("dark", theme === "dark");
  document.documentElement.style.colorScheme = theme;
}
