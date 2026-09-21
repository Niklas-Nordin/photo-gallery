<?php

header('Access-Control-Allow-Origin: http://localhost:3000');
header('Content-Type: application/json; charset=utf-8');

$publicPath = __DIR__ . '/public';

$allowedExtensions = [
    'jpg',
    'jpeg',
    'png',
    'webp',
    'gif'
];


/*
|--------------------------------------------------------------------------
| Hjälpfunktioner
|--------------------------------------------------------------------------
*/

// Gör om mapp-/filnamn till snygga visningsnamn
function formatName($name) {

    return ucwords(str_replace(['_', '-'], ' ', $name));

}


// Kontrollera om en fil är en tillåten bild
function isAllowedImage($filename, $allowedExtensions) {

    $extension = strtolower(
        pathinfo($filename, PATHINFO_EXTENSION)
    );

    return in_array($extension, $allowedExtensions, true);
}


// Hämtar alla bilder från ett album
function getImages(
    $thumbnailPath,
    $largePath,
    $category,
    $album,
    $allowedExtensions
) {

    $images = [];

    foreach (scandir($thumbnailPath) as $image) {

        if ($image === '.' || $image === '..') {
            continue;
        }

        // Bara tillåtna bildformat
        if (!isAllowedImage($image, $allowedExtensions)) {
            continue;
        }

        $largeImagePath = $largePath . '/' . $image;

        // Large-bilden måste finnas
        if (!is_file($largeImagePath)) {
            continue;
        }

        $images[] = [
            'name' => $image,

            'thumbnail' =>
                "/public/$category/$album/images/thumbnails/$image",

            'large' =>
                "/public/$category/$album/images/large/$image"
        ];
    }

    return $images;
}


/*
|--------------------------------------------------------------------------
| Läs query-parametrar
|--------------------------------------------------------------------------
*/

$category = $_GET['category'] ?? null;
$album = $_GET['album'] ?? null;


/*
|--------------------------------------------------------------------------
| 1. GET /gallery-api/
|
| Returnerar alla kategorier
|--------------------------------------------------------------------------
*/

if ($category === null) {

    $categories = [];

    foreach (scandir($publicPath) as $categoryName) {

        if ($categoryName === '.' || $categoryName === '..') {
            continue;
        }

        $categoryPath = $publicPath . '/' . $categoryName;

        // Bara mappar räknas som kategorier
        if (!is_dir($categoryPath)) {
            continue;
        }

        $covers = [];

        // Hämta album
        foreach (scandir($categoryPath) as $albumName) {

            if ($albumName === '.' || $albumName === '..') {
                continue;
            }

            $albumPath = $categoryPath . '/' . $albumName;

            if (!is_dir($albumPath)) {
                continue;
            }

            $thumbnailPath = $albumPath . '/images/thumbnails';
            $largePath = $albumPath . '/images/large';

            if (!is_dir($thumbnailPath) || !is_dir($largePath)) {
                continue;
            }

            $images = getImages(
                $thumbnailPath,
                $largePath,
                $categoryName,
                $albumName,
                $allowedExtensions
            );

            // Lägg till max 4 thumbnails som covers
            foreach (array_slice($images, 0, 4) as $image) {

                $covers[] = [
                    'name' => $image['name'],
                    'thumbnail' => $image['thumbnail']
                ];

                if (count($covers) >= 4) {
                    break;
                }
            }

            if (count($covers) >= 4) {
                break;
            }
        }

        $categories[] = [
            'name' => formatName($categoryName),
            'slug' => $categoryName,
            'covers' => $covers
        ];
    }

    echo json_encode(
        $categories,
        JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT
    );

    exit;
}


/*
|--------------------------------------------------------------------------
| Kontrollera att kategorin finns
|--------------------------------------------------------------------------
*/

$categoryPath = $publicPath . '/' . $category;

if (!is_dir($categoryPath)) {

    http_response_code(404);

    echo json_encode([
        'error' => 'Category not found'
    ]);

    exit;
}


/*
|--------------------------------------------------------------------------
| 2. GET /gallery-api/?category=Diving
|
| Returnerar alla album i kategorin
|--------------------------------------------------------------------------
*/

if ($album === null) {

    $albums = [];

    foreach (scandir($categoryPath) as $albumName) {

        if ($albumName === '.' || $albumName === '..') {
            continue;
        }

        $albumPath = $categoryPath . '/' . $albumName;

        // Bara mappar räknas som album
        if (!is_dir($albumPath)) {
            continue;
        }

        $imagesPath = $albumPath . '/images';

        // Albumet måste ha en images-mapp
        if (!is_dir($imagesPath)) {
            continue;
        }

        $thumbnailPath = $imagesPath . '/thumbnails';
        $largePath = $imagesPath . '/large';

        // Båda mapparna måste finnas
        if (!is_dir($thumbnailPath) || !is_dir($largePath)) {
            continue;
        }

        $images = getImages(
            $thumbnailPath,
            $largePath,
            $category,
            $albumName,
            $allowedExtensions
        );

        $covers = [];

        // Max 4 thumbnails
        foreach (array_slice($images, 0, 4) as $image) {

            $covers[] = [
                'name' => $image['name'],
                'thumbnail' => $image['thumbnail']
            ];
        }

        $albums[] = [
            'name' => formatName($albumName),
            'slug' => $albumName,
            'covers' => $covers
        ];
    }

    echo json_encode(
        [
            'name' => formatName($category),
            'slug' => $category,
            'albums' => $albums
        ],
        JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT
    );

    exit;
}


/*
|--------------------------------------------------------------------------
| 3. GET /gallery-api/?category=Diving&album=Diving_Dalaro
|
| Returnerar alla bilder i albumet
|--------------------------------------------------------------------------
*/

$albumPath = $categoryPath . '/' . $album;

if (!is_dir($albumPath)) {

    http_response_code(404);

    echo json_encode([
        'error' => 'Album not found'
    ]);

    exit;
}


$imagesPath = $albumPath . '/images';

$thumbnailPath = $imagesPath . '/thumbnails';
$largePath = $imagesPath . '/large';


if (!is_dir($thumbnailPath) || !is_dir($largePath)) {

    http_response_code(404);

    echo json_encode([
        'error' => 'Image folders not found'
    ]);

    exit;
}


$images = getImages(
    $thumbnailPath,
    $largePath,
    $category,
    $album,
    $allowedExtensions
);


echo json_encode(
    [
        'name' => formatName($album),
        'slug' => $album,
        'category' => $category,
        'images' => $images
    ],
    JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT
);
