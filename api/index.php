<?php

// Vercel Serverless Entry Point for Laravel 11

// Prepare temporary storage directory in /tmp (Vercel has read-only root FS)
$storageDirs = [
    '/tmp/storage/app/public',
    '/tmp/storage/framework/cache/data',
    '/tmp/storage/framework/sessions',
    '/tmp/storage/framework/views',
    '/tmp/storage/logs',
    '/tmp/views'
];

foreach ($storageDirs as $dir) {
    if (!is_dir($dir)) {
        mkdir($dir, 0755, true);
    }
}

// Forward to public/index.php
require __DIR__ . '/../public/index.php';
