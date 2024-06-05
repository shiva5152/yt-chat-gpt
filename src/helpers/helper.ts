export const isYouTubeVideoLink = (url: string) => {

    const youtubeRegex =
        /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be)\/(watch\?v=|embed\/|v\/|.+\?v=)?([^&=%\?]{11})/;
    return youtubeRegex.test(url);
}

export const extractYouTubeVideoID = (url: string) => {
    const patterns = [
        /youtu\.be\/([^\?&]+)/,
        /youtube\.com\/.*[?&]v=([^&]+)/,
        /youtube\.com\/embed\/([^&]+)/,
        /youtube\.com\/v\/([^&]+)/,
    ];

    for (const pattern of patterns) {
        const match = url.match(pattern);
        if (match && match[1]) {
            return match[1];
        }
    }
    return null;
}