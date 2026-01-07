# Sanity Content Seeding Scripts

Disse skriptene fyller opp Sanity med eksempelinnhold for FLYT Idrett-plattformen.

## Forutsetninger

1. **Miljøvariabler**: Sørg for at `.env.local` eller `.env` inneholder:
   - `SANITY_STUDIO_PROJECT_ID` eller `NEXT_PUBLIC_SANITY_PROJECT_ID`
   - `SANITY_STUDIO_DATASET` eller `NEXT_PUBLIC_SANITY_DATASET` (standard: "production")
   - `SANITY_STUDIO_API_TOKEN` eller `SANITY_READ_TOKEN` (må være en **write token** med Editor eller Admin-rettigheter)

   **Viktig**: Du må opprette en write token i Sanity:
   - Gå til https://sanity.io/manage
   - Velg ditt prosjekt
   - Gå til API → Tokens
   - Klikk "Add API token"
   - Velg "Editor" eller "Admin" (ikke "Viewer")
   - Kopier tokenet og legg det i `.env.local` som `SANITY_STUDIO_API_TOKEN`

2. **Write Token**: Du trenger en write token fra Sanity for å kunne opprette dokumenter.
   - Gå til https://sanity.io/manage
   - Velg ditt prosjekt
   - Gå til API → Tokens
   - Opprett en ny token med "Editor" eller "Admin" rettigheter

## Bruk

### Kjøre alle seeding-skriptene:

```bash
cd apps/sanity-studio
pnpm seed
```

### Kjøre individuelle skript:

```bash
# Bare site settings
pnpm tsx scripts/seedSiteSettings.ts

# Bare seksjoner
pnpm tsx scripts/seedSections.ts

# Bare leksjoner
pnpm tsx scripts/seedLessons.ts

# Bare aktiviteter
pnpm tsx scripts/seedActivities.ts

# Bare leker
pnpm tsx scripts/seedGames.ts

# Bare videoer
pnpm tsx scripts/seedVideos.ts

# Bare FAQs
pnpm tsx scripts/seedFAQs.ts
```

## Hva skriptene gjør

1. **seedSiteSettings.ts**: Oppretter nettstedsinnstillinger (singleton)
2. **seedSections.ts**: Oppretter hovedseksjoner (Trenerhanda, Håndboka, Metodikk, Foreldre)
3. **seedLessons.ts**: Oppretter leksjoner for Trenerhanda (Oppstart, Vi hilser, Vi heier, etc.)
4. **seedActivities.ts**: Oppretter aktiviteter kategorisert under Handboka
5. **seedGames.ts**: Oppretter leker for Lekebank
6. **seedVideos.ts**: Oppretter videoer for Filmer-seksjonen
7. **seedFAQs.ts**: Oppretter spørsmål og svar

## Viktig

- Skriptene bruker `findOrCreateDocument` som sjekker om dokumentet allerede eksisterer før det opprettes
- Dette betyr at du kan kjøre skriptene flere ganger uten å få duplikater
- Eksisterende dokumenter vil ikke bli overskrevet

## Oppdatere innhold

Etter at innholdet er seedet, kan du:
- Oppdatere video-URLer med faktiske YouTube-lenker
- Legge til flere aktiviteter, leker, videoer eller FAQs
- Redigere innholdet direkte i Sanity Studio

