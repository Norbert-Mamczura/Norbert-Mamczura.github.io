# IT

## Stack Technologiczny

**Web i Backend**
Django, Django REST Framework (DRF), HTMX, Celery, Redis, WordPress, HTML, CSS, JS, Google App Script

**AI i Machine Learning**
LLM (RAG), Prompt Engineering, LangChain, ChromaDB, Whisper API, HuggingFace Transformers, PyTorch, LoRA, Structured Output, tłumaczenia głosowe w czasie rzeczywistym (Realtime AI)

**Dane i DevOps**
SQL, Excel / CSV, podstawy DevOps, Google Cloud Platform (Text-to-Speech API)

**Pozostałe**
Corel Draw, obsługa ploterów tnących i drukujących

## Sanmarks sp. z o.o. - Informatyka

Od 2023 do 2026 pracowałem w Sanmarks sp. z o.o. oraz Tele-centrum sp. z o.o., obecnie wykonuję dla nich i innych firm zlecenia programistyczne i prawne.

- Optymalizacja działania zastanych systemów
- Obróbka głównej bazy firmowej oraz zwiększenie jej wartości poprzez połączenie baz z 3 różnych źródeł (łącznie 2,5 mln rekordów) do znormalizowanej formy bez duplikatów
- Sprzedaż i zakup baz danych od firm trzecich
- Identyfikacja numerów telefonów jako kluczowego zasobu (*optymalizacja* względem systemów antyspamowych Google)
- Tworzenie baz danych przy użyciu botów i agentów AI. Tworzenie dedykowanych aplikacji i pluginów do przeglądarek ułatwiających ręczne pobieranie danych

## Projekty komercyjne

**System zarządzania eventami**
*Django, HTMX*
Rozbudowany system CRM napisany w Django do zarządzania pracownikami i firmami na wielu eventach jednocześnie. Aplikacja pozwala organizatorom m.in. agregować dane o podwykonawcach, zarządzać dostępami i opaskami, a ochronie identyfikować pracowników przez system kodów QR.
System został wykorzystany podczas dużych imprez masowych, w tym koncertu Eda Sheerana we Wrocławiu oraz Drift Masters na Stadionie Narodowym w Warszawie.

**System analizy rozmów dla call center**
*Whisper API, LLM (RAG), Django, Celery, Redis*
Aplikacja zaprojektowana do analizy rozmów call center oraz oceny pracy konsultantów na podstawie transkrypcji nagrań audio i ocen generowanych przez LLM. Początkowo rozwijana jako wewnętrzny projekt startupowy, następnie sprzedany.

Ostatnio napisałem wersję 2.0 tego systemu wykorzystującą nowe osiągnięcia w dziedzinie AI, które nie były wcześniej dostępne - Structured Output oraz diaryzację dla języka polskiego. Dla zmniejszenia zależności zrezygnowałem również z Redis i Celery i zastąpiłem je własnymi implementacjami.

**Aplikacja do zamiany tekstu na mowę dla Centrum Zarządzania Kryzysowego**
*Text-to-speech GCP, Django*
System używany do wysyłania komunikatów głosowych do mieszkańców (Voice Mailing). Głos jest generowany przez API Google Cloud Platform. Moim zadaniem było napisanie tego komponentu i integracja z istniejącymi systemami firmowymi.

**Strona do sprzedaży baz danych**
*Django + DRF*
Strona sprzedażowa z kilkoma ciekawymi sposobami prezentacji danych. Jednak najciekawszą rzeczą jest rozbicie strony serwerowej i frontu na dwa różne serwery (PythonAnywhere oraz nazwa.pl) i spięcie ich po API. Dzięki temu klient ma dostęp do współczesnych technologii, a jednocześnie unika komplikowania struktury przekierowań CNAME.

**Zarządzanie stronami firmowymi**
*Wordpress, HTML, CSS, JS*
Tworzyłem, wprowadzałem zmiany i zarządzałem stronami napisanymi zarówno w Wordpress, Django, czy klasycznym kodzie.

**Strona internetowa festiwalu Folkowisko**
Stworzenie systemu do informowania o warsztatach (Wordpress, Google App Script) oraz wyświetlanie ich uczestnikom festiwalu przez Starlinka (działanie w warunkach braku zasięgu sieci).

## Projekty niekomercyjne

**Symulatory postaci literackich**
*LangChain, ChromaDB, Django*
Różnego rodzaju symulatory postaci, takich jak Geralt z Rivii czy Jakub Wędrowycz.

**Aplikacje badawcze dla studentów UMCS**
*Django plus różne technologie*
Aplikacje pisane na potrzeby konkretnych krótkich tematów badawczych studentów kognitywistyki. Od badań na temat "torowania" - ukierunkowywania osób na podświadome myślenie na temat określonych rzeczy, po testy w rozpoznawaniu, czy tekst był napisany przez AI czy nie.

**Uruchamianie modeli AI lokalnie**
*Huggingface, PyTorch, LoRA weights*
Lubię uruchamiać modele w architekturze transformers lokalnie, między innymi: Whisper (różne rodzaje), różne LLM, modele generujące grafikę (text-to-image, image-text-to-image), również prostsze modele, jak klasyfikatory czy embeddingi.

**Tłumaczenia głosowe w czasie rzeczywistym**
*AI realtime*
Systemy do automatycznego tłumaczenia głosu w czasie rzeczywistym, umożliwiające konwersację w nieznanych językach. Projekt aktualnie rozwijany.
