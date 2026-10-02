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


// Gör om mappnamn till snygga visningsnamn
//
// Exempel:
// Diving_Dalarö
//        ↓
// Diving Dalarö
function formatName($name) {

    return ucwords(
        str_replace(['_', '-'], ' ', $name)
    );

}


// Skapar en URL-vänlig slug.
//
// Exempel:
// Diving_Dalarö
//        ↓
// Diving-Dalaro
function createSlug($name) {

    // Byt ut svenska tecken
    $name = str_replace(
        ['å', 'ä', 'ö', 'Å', 'Ä', 'Ö'],
        ['a', 'a', 'o', 'A', 'A', 'O'],
        $name
    );

    // Underscore blir bindestreck
    $name = str_replace('_', '-', $name);

    // Mellanslag blir bindestreck
    $name = preg_replace('/\s+/', '-', $name);

    // Ta bort övriga tecken som inte passar i slug
    $name = preg_replace('/[^a-zA-Z0-9-]/', '', $name);

    // Om flera bindestreck hamnar efter varandra
    $name = preg_replace('/-+/', '-', $name);

    // Ta bort bindestreck i början/slutet
    return trim($name, '-');
}


// Kontrollera om en fil är en tillåten bild
function isAllowedImage($filename, $allowedExtensions) {

    $extension = strtolower(
        pathinfo($filename, PATHINFO_EXTENSION)
    );

    return in_array(
        $extension,
        $allowedExtensions,
        true
    );
}


// Hämtar alla bilder från ett album
function getImages(
    $thumbnailPath,
    $largePath,
    $category,
    $albumFolder,
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
                "/public/$category/$albumFolder/images/thumbnails/$image",

            'large' =>
                "/public/$category/$albumFolder/images/large/$image"
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
        $albums = [];


        /*
        |--------------------------------------------------------------------------
        | Hämta album i kategorin
        |--------------------------------------------------------------------------
        */

        foreach (scandir($categoryPath) as $albumName) {

            if ($albumName === '.' || $albumName === '..') {
                continue;
            }


            $albumPath = $categoryPath . '/' . $albumName;


            // Bara mappar räknas som album
            if (!is_dir($albumPath)) {
                continue;
            }


            $thumbnailPath =
                $albumPath . '/images/thumbnails';

            $largePath =
                $albumPath . '/images/large';


            // Albumet måste ha båda bildmapparna
            if (
                !is_dir($thumbnailPath) ||
                !is_dir($largePath)
            ) {
                continue;
            }


            /*
            |--------------------------------------------------------------------------
            | Hämta bilder
            |--------------------------------------------------------------------------
            */

            $images = getImages(
                $thumbnailPath,
                $largePath,
                $categoryName,
                $albumName,
                $allowedExtensions
            );


            /*
            |--------------------------------------------------------------------------
            | Hoppa över tomma album
            |--------------------------------------------------------------------------
            */

            if (count($images) === 0) {
                continue;
            }


            /*
            |--------------------------------------------------------------------------
            | Lägg till albumet
            |--------------------------------------------------------------------------
            */

            $albums[] = [

                // Det användaren ser
                'name' => formatName($albumName),

                // URL-vänligt namn
                'slug' => createSlug($albumName),

                // Faktiska mappnamnet
                'folder' => $albumName
            ];


            /*
            |--------------------------------------------------------------------------
            | Lägg till max 4 bilder som category covers
            |--------------------------------------------------------------------------
            */

            if (count($covers) < 4) {

                foreach (
                    array_slice(
                        $images,
                        0,
                        4 - count($covers)
                    ) as $image
                ) {

                    $covers[] = [

                        'name' =>
                            $image['name'],

                        'thumbnail' =>
                            $image['thumbnail']
                    ];
                }
            }
        }


        /*
        |--------------------------------------------------------------------------
        | Lägg till kategorin
        |--------------------------------------------------------------------------
        */

        $categories[] = [

            'name' =>
                formatName($categoryName),

            'slug' =>
                $categoryName,

            'albums' =>
                $albums,

            'covers' =>
                $covers
        ];
    }


    echo json_encode(
        $categories,
        JSON_UNESCAPED_UNICODE |
        JSON_PRETTY_PRINT
    );

    exit;
}


/*
|--------------------------------------------------------------------------
| Kontrollera att kategorin finns
|--------------------------------------------------------------------------
*/

$categoryPath =
    $publicPath . '/' . $category;


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

        if (
            $albumName === '.' ||
            $albumName === '..'
        ) {
            continue;
        }


        $albumPath =
            $categoryPath . '/' . $albumName;


        // Bara mappar räknas som album
        if (!is_dir($albumPath)) {
            continue;
        }


        $imagesPath =
            $albumPath . '/images';


        // Albumet måste ha en images-mapp
        if (!is_dir($imagesPath)) {
            continue;
        }


        $thumbnailPath =
            $imagesPath . '/thumbnails';

        $largePath =
            $imagesPath . '/large';


        // Båda mapparna måste finnas
        if (
            !is_dir($thumbnailPath) ||
            !is_dir($largePath)
        ) {
            continue;
        }


        /*
        |--------------------------------------------------------------------------
        | Hämta bilder
        |--------------------------------------------------------------------------
        */

        $images = getImages(
            $thumbnailPath,
            $largePath,
            $category,
            $albumName,
            $allowedExtensions
        );


        /*
        |--------------------------------------------------------------------------
        | Hoppa över tomma album
        |--------------------------------------------------------------------------
        */

        if (count($images) === 0) {
            continue;
        }


        /*
        |--------------------------------------------------------------------------
        | Skapa covers
        |--------------------------------------------------------------------------
        */

        $covers = [];


        foreach (
            array_slice($images, 0, 4)
            as $image
        ) {

            $covers[] = [

                'name' =>
                    $image['name'],

                'thumbnail' =>
                    $image['thumbnail']
            ];
        }


        /*
        |--------------------------------------------------------------------------
        | Lägg till album
        |--------------------------------------------------------------------------
        */

        $albums[] = [

            // Visningsnamn
            'name' =>
                formatName($albumName),

            // URL
            'slug' =>
                createSlug($albumName),

            // Faktiskt mappnamn
            'folder' =>
                $albumName,

            // Covers
            'covers' =>
                $covers
        ];
    }


    echo json_encode(
        [

            'name' =>
                formatName($category),

            'slug' =>
                $category,

            'albums' =>
                $albums
        ],
        JSON_UNESCAPED_UNICODE |
        JSON_PRETTY_PRINT
    );

    exit;
}


/*
|--------------------------------------------------------------------------
| 3. GET /gallery-api/?category=Diving&album=Diving-Dalaro
|
| Returnerar alla bilder i albumet
|--------------------------------------------------------------------------
|
| $album är nu en SLUG.
|
| Exempel:
|
| URL:
| Diving-Dalaro
|
| Faktisk mapp:
| Diving_Dalarö
|
| Vi letar därför igenom kategorins mappar
| och hittar den vars slug matchar URL:en.
|--------------------------------------------------------------------------
*/


$albumPath = null;
$albumFolder = null;


foreach (scandir($categoryPath) as $folderName) {

    if (
        $folderName === '.' ||
        $folderName === '..'
    ) {
        continue;
    }


    $folderPath =
        $categoryPath . '/' . $folderName;


    // Bara mappar räknas
    if (!is_dir($folderPath)) {
        continue;
    }


    // Kontrollera om mappens slug matchar URL-sluggen
    if (createSlug($folderName) === $album) {

        $albumPath =
            $folderPath;

        $albumFolder =
            $folderName;

        break;
    }
}


/*
|--------------------------------------------------------------------------
| Albumet hittades inte
|--------------------------------------------------------------------------
*/

if ($albumPath === null) {

    http_response_code(404);

    echo json_encode([
        'error' => 'Album not found'
    ]);

    exit;
}


/*
|--------------------------------------------------------------------------
| Bildmappar
|--------------------------------------------------------------------------
*/

$imagesPath =
    $albumPath . '/images';

$thumbnailPath =
    $imagesPath . '/thumbnails';

$largePath =
    $imagesPath . '/large';


if (
    !is_dir($thumbnailPath) ||
    !is_dir($largePath)
) {

    http_response_code(404);

    echo json_encode([
        'error' => 'Image folders not found'
    ]);

    exit;
}


/*
|--------------------------------------------------------------------------
| Hämta bilder
|--------------------------------------------------------------------------
*/

$images = getImages(
    $thumbnailPath,
    $largePath,
    $category,
    $albumFolder,
    $allowedExtensions
);


/*
|--------------------------------------------------------------------------
| Returnera albumet
|--------------------------------------------------------------------------
*/

echo json_encode(
    [

        // Det användaren ser
        'name' =>
            formatName($albumFolder),

        // URL-slug
        'slug' =>
            createSlug($albumFolder),

        // Faktiska mappen
        'folder' =>
            $albumFolder,

        // Kategori
        'category' =>
            $category,

        // Bilder
        'images' =>
            $images
    ],
    JSON_UNESCAPED_UNICODE |
    JSON_PRETTY_PRINT
);