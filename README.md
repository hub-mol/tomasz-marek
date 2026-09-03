# Tomasz Marek — strona pracowni

Statyczna strona Astro z treścią zarządzaną w Sanity i wdrażana jako Cloudflare Worker z zasobami statycznymi.

## Praca lokalna

Wymagany jest Node.js 22.12 lub nowszy.

```sh
npm install
npm run dev -- --background
```

Serwer w tle można sprawdzić i zatrzymać poleceniami:

```sh
npm run astro -- dev status
npm run astro -- dev logs
npm run astro -- dev stop
```

Panel Sanity jest dostępny lokalnie oraz po wdrożeniu pod `/admin`.

## Publikacje: blog i oferta

W Sanity wybierz **Blog i oferta**, utwórz publikację i ustaw pole **Rodzaj strony**:

- **Artykuł blogowy** generuje `/blog/[slug]` i pojawia się na liście `/blog`.
- **Strona oferty** generuje `/oferta/[slug]` i nie pojawia się na liście bloga.

Publikacje są sortowane od najnowszej daty `publishedAt`. Data w przyszłości ukrywa publikację aż do kolejnego buildu wykonanego po tej dacie.

## Portfolio

Pole **Treść projektu** jest listą bloków, które można przeciągać w Sanity. Dostępne są:

- blok tekstowy z opcjonalnym tagline i wielkością H3/H4,
- blok zdjęciowy z układem 1, 2, 3 albo 4 kolumn.

Na telefonach każdy blok zdjęciowy przechodzi do jednej kolumny.

## Walidacja i build

```sh
npm run cms:validate
npm run build
```

Build pobiera opublikowane dane z Sanity, dlatego wymaga dostępu do sieci. Wynik trafia do `dist/`.

## Automatyczny deploy po publikacji w Sanity

Strona jest statyczna: samo opublikowanie dokumentu w Sanity nie zmienia istniejących plików HTML. Webhook powinien uruchomić nowy build na Cloudflare:

1. Worker `tomasz-marek` musi być połączony z repozytorium GitHub i branch `main` w Cloudflare Workers Builds.
2. W Cloudflare otwórz **Workers & Pages → tomasz-marek → Settings → Builds → Deploy Hooks**.
3. Utwórz hook np. `Sanity production`, wybierz branch `main` i skopiuj jego URL.
4. W `sanity.io/manage` otwórz projekt `o8oniqgy`, następnie **API → Webhooks → Create webhook**.
5. Wklej URL hooka, wybierz dataset `production`, metodę `POST` i zdarzenia create/update/delete.
6. Ustaw filtr `_type in ["blogPost", "project", "homePage", "siteSettings"]` oraz pozostaw wyłączone wyzwalanie dla draftów i wersji.
7. Opublikuj testową zmianę i sprawdź build oznaczony jako `deploy hook` w historii Cloudflare.

URL Deploy Hooka jest sekretem: nie należy zapisywać go w repozytorium ani udostępniać publicznie.
