<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Deara Beauty Salon - Official Price List & Reservasi</title>
    <meta name="description" content="Katalog resmi layanan hair styling, haircut by owner, hair treatment, smoothing, dan hair colouring Deara Beauty Salon Yogyakarta dengan reservasi instan WhatsApp.">
    <meta property="og:title" content="Deara Beauty Salon - Official Price List & Reservasi">
    <meta property="og:description" content="Katalog resmi layanan hair styling, haircut by owner, hair treatment, smoothing, dan hair colouring Deara Beauty Salon Yogyakarta dengan reservasi instan WhatsApp.">
    <meta property="og:type" content="website">
    <link rel="icon" type="image/svg+xml" href="/logo.svg">
    
    <!-- Google Fonts -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;0,700;1,400&family=Plus+Jakarta+Sans:wght@300;400;500;600;700&display=swap" rel="stylesheet">

    @if (file_exists(public_path('build/manifest.json')))
        @php
            $manifest = json_decode(file_get_contents(public_path('build/manifest.json')), true);
            $entry = $manifest['resources/js/app.tsx'] ?? $manifest['src/main.tsx'] ?? null;
        @endphp
        @if ($entry)
            @if (!empty($entry['css']))
                @foreach ($entry['css'] as $css)
                    <link rel="stylesheet" href="/build/{{ $css }}">
                @endforeach
            @endif
            <script type="module" src="/build/{{ $entry['file'] }}"></script>
        @endif
    @elseif (app()->isLocal())
        <!-- Local Vite Dev Server -->
        <script type="module">
            import RefreshRuntime from 'http://localhost:5173/@react-refresh'
            RefreshRuntime.injectIntoGlobalHook(window)
            window.$RefreshReg$ = () => {}
            window.$RefreshSig$ = () => (type) => type
            window.__vite_plugin_react_preamble_installed__ = true
        </script>
        <script type="module" src="http://localhost:5173/@vite/client"></script>
        <script type="module" src="http://localhost:5173/resources/js/app.tsx"></script>
    @else
        <!-- Fallback to compiled dist bundle -->
        <script type="module" src="/dist/assets/index.js"></script>
        <link rel="stylesheet" href="/dist/assets/index.css">
    @endif
</head>
<body class="bg-[#FAF8F5] dark:bg-[#121110] text-[#242120] dark:text-[#EAE5DF] antialiased selection:bg-[#D4A373]/20 selection:text-[#242120]">
    <div id="root"></div>
</body>
</html>
