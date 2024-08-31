import { useRouter } from "next/router";

export function LanguageSwitcher() {
  const router = useRouter();
  const { pathname, asPath, query } = router;
  const currentLang = router.locale;

  const switchLanguage = (newLang: string) => {
    router.push({ pathname, query }, asPath, { locale: newLang });
  };

  return (
    <div>
      <button
        onClick={() => switchLanguage("en")}
        disabled={currentLang === "en"}
      >
        English
      </button>
      <button
        onClick={() => switchLanguage("id")}
        disabled={currentLang === "id"}
      >
        Indonesia
      </button>
    </div>
  );
}
