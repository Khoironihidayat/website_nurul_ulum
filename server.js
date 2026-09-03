const http = require('http');
const fs = require('fs');
const path = require('path');
const https = require('https');

const PORT = 8080;
const YOUTUBE_CHANNEL_ID = 'UCdE5bScuzqczoSrhB2IdYJQ';
const YOUTUBE_API_KEY = process.env.YOUTUBE_API_KEY || '';
const YOUTUBE_FEED_URL = `https://www.youtube.com/feeds/videos.xml?channel_id=${YOUTUBE_CHANNEL_ID}`;
const YOUTUBE_API_BASE = 'https://www.googleapis.com/youtube/v3';
const MIME_TYPES = {
    '.html': 'text/html; charset=UTF-8',
    '.js': 'text/javascript; charset=UTF-8',
    '.css': 'text/css; charset=UTF-8',
    '.json': 'application/json',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.gif': 'image/gif',
    '.svg': 'image/svg+xml',
    '.ico': 'image/x-icon',
    '.mp4': 'video/mp4',
    '.webm': 'video/webm',
    '.ogg': 'video/ogg',
    '.txt': 'text/plain; charset=UTF-8'
};

function parseYoutubeFeed(xmlText) {
    const items = [];
    const entryRegex = /<entry[\s\S]*?<\/entry>/g;
    const matches = xmlText.match(entryRegex) || [];

    matches.forEach((entryXml) => {
        const titleMatch = entryXml.match(/<title[^>]*>([\s\S]*?)<\/title>/i);
        const videoIdMatch = entryXml.match(/<yt:videoId[^>]*>([\s\S]*?)<\/yt:videoId>/i);
        const publishedMatch = entryXml.match(/<published[^>]*>([\s\S]*?)<\/published>/i);
        const thumbnailMatch = entryXml.match(/<media:thumbnail[^>]*url="([^"]+)"/i);
        const linkMatch = entryXml.match(/<link[^>]*href="([^"]+)"/i);

        const title = titleMatch ? titleMatch[1].replace(/<[^>]+>/g, '').trim() : '';
        const videoId = videoIdMatch ? videoIdMatch[1].trim() : '';
        const published = publishedMatch ? publishedMatch[1].trim() : '';
        const thumbnail = thumbnailMatch ? thumbnailMatch[1].trim() : '';
        const link = linkMatch ? linkMatch[1].trim() : (videoId ? `https://www.youtube.com/watch?v=${videoId}` : '');

        if (title && videoId) {
            items.push({
                title,
                videoId,
                published,
                thumbnail: thumbnail || `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`,
                link
            });
        }
    });

    return items;
}

function normalizeApiVideo(item) {
    const snippet = item.snippet || {};
    const videoId = item.id && (item.id.videoId || item.id);
    const thumbnail = snippet.thumbnails?.high?.url ||
        snippet.thumbnails?.medium?.url ||
        snippet.thumbnails?.default?.url ||
        '';

    return {
        title: snippet.title || 'Video Nurul Ulum',
        videoId: videoId || '',
        published: snippet.publishedAt || '',
        thumbnail: thumbnail || `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`,
        link: videoId ? `https://www.youtube.com/watch?v=${videoId}` : (snippet.link || '')
    };
}

function fetchYoutubeVideosFromApi(limit = 50) {
    if (!YOUTUBE_API_KEY) {
        return Promise.resolve([]);
    }

    return new Promise((resolve) => {
        const videos = [];

        function fetchPage(pageToken = '') {
            const params = new URLSearchParams({
                part: 'snippet',
                channelId: YOUTUBE_CHANNEL_ID,
                order: 'date',
                type: 'video',
                maxResults: '50',
                key: YOUTUBE_API_KEY
            });

            if (pageToken) {
                params.set('pageToken', pageToken);
            }

            const apiUrl = `${YOUTUBE_API_BASE}/search?${params.toString()}`;

            https.get(apiUrl, (res) => {
                let data = '';

                res.on('data', (chunk) => {
                    data += chunk;
                });

                res.on('end', () => {
                    if (res.statusCode !== 200) {
                        resolve(videos.slice(0, Number(limit) || 50));
                        return;
                    }

                    try {
                        const json = JSON.parse(data);
                        const items = Array.isArray(json.items) ? json.items : [];

                        items.forEach((item) => {
                            if (videos.length >= (Number(limit) || 50)) return;
                            const normalized = normalizeApiVideo(item);
                            if (normalized.videoId) {
                                videos.push(normalized);
                            }
                        });

                        if (videos.length >= (Number(limit) || 50) || !json.nextPageToken) {
                            resolve(videos.slice(0, Number(limit) || 50));
                            return;
                        }

                        fetchPage(json.nextPageToken);
                    } catch (error) {
                        resolve(videos.slice(0, Number(limit) || 50));
                    }
                });
            }).on('error', () => {
                resolve(videos.slice(0, Number(limit) || 50));
            });
        }

        fetchPage();
    });
}

function fetchYoutubeVideos(limit = 6) {
    const max = Number(limit) || 6;

    if (YOUTUBE_API_KEY) {
        return fetchYoutubeVideosFromApi(max);
    }

    return new Promise((resolve) => {
        https.get(YOUTUBE_FEED_URL, (res) => {
            let data = '';

            res.on('data', (chunk) => {
                data += chunk;
            });

            res.on('end', () => {
                if (res.statusCode !== 200) {
                    resolve([]);
                    return;
                }

                const videos = parseYoutubeFeed(data).slice(0, max);
                resolve(videos);
            });
        }).on('error', () => {
            resolve([]);
        });
    });
}

const server = http.createServer(async (req, res) => {
    const url = new URL(req.url, `http://${req.headers.host}`);

    if (url.pathname === '/api/youtube-videos') {
        const videos = await fetchYoutubeVideos(url.searchParams.get('limit') || '6');
        res.writeHead(200, {
            'Content-Type': 'application/json; charset=UTF-8',
            'Access-Control-Allow-Origin': '*',
            'Cache-Control': 'no-store'
        });
        res.end(JSON.stringify(videos));
        return;
    }

    let reqUrl = url.pathname;
    if (reqUrl === '/') reqUrl = '/index.html';

    const safePath = path.normalize(decodeURIComponent(reqUrl)).replace(/^((\.\.)|\.)+[\\/]/, '');
    const filePath = path.join(__dirname, safePath);

    fs.stat(filePath, (err, stats) => {
        if (err || !stats.isFile()) {
            res.writeHead(404, { 'Content-Type': 'text/html; charset=UTF-8' });
            res.end('<h1>404 Not Found</h1><p><a href="/">Kembali ke Beranda</a></p>');
            return;
        }

        const ext = path.extname(filePath).toLowerCase();
        const contentType = MIME_TYPES[ext] || 'application/octet-stream';
        const totalSize = stats.size;
        const range = req.headers.range;

        if (range && (ext === '.mp4' || ext === '.webm' || ext === '.ogg')) {
            const parts = range.replace(/bytes=/, '').split('-');
            const start = parseInt(parts[0], 10);
            const end = parts[1] ? parseInt(parts[1], 10) : totalSize - 1;
            const chunkSize = (end - start) + 1;
            const fileStream = fs.createReadStream(filePath, { start, end });

            res.writeHead(206, {
                'Content-Range': `bytes ${start}-${end}/${totalSize}`,
                'Accept-Ranges': 'bytes',
                'Content-Length': chunkSize,
                'Content-Type': contentType
            });
            fileStream.pipe(res);
        } else {
            res.writeHead(200, {
                'Content-Length': totalSize,
                'Content-Type': contentType,
                'Accept-Ranges': 'bytes',
                'Cache-Control': 'no-cache'
            });
            fs.createReadStream(filePath).pipe(res);
        }
    });
});

server.listen(PORT, () => {
    console.log(`Server berjalan di http://localhost:${PORT}`);
});
