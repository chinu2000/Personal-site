// /api/proxy.js

// This is the main function that runs when you visit "/api/proxy"
export default async function handler(req, res) {
  
  // 1. READ THE NOTE: Get the Google Drive link from the request.
  // Your React app will send it like this: /api/proxy?url=https://...
  const videoUrl = req.query.url;

  // If the note is empty, we can't do anything.
  if (!videoUrl) {
    return res.status(400).json({ error: 'Sorry, you need to tell me which URL to get.' });
  }

  try {
    // 2. GO TO THE CLUB: The proxy server fetches the video from Google Drive.
    // This happens on the server, so there is no CORS bouncer to stop it.
    const videoResponse = await fetch(videoUrl);

    // If Google didn't give us the video, report an error.
    if (!videoResponse.ok) {
      throw new Error(`Google Drive said no: ${videoResponse.statusText}`);
    }

    // Get the video data itself.
    const videoBlob = await videoResponse.blob();

    // 3. ADD A PERMISSION SLIP: Before sending the video back to your app,
    // we add this special "permission slip" header.
    // It tells the browser, "It's okay for any website to use this!"
    res.setHeader('Access-Control-Allow-Origin', '*');
    
    // Tell the browser what kind of file this is (e.g., 'video/mp4').
    res.setHeader('Content-Type', videoResponse.headers.get('Content-Type'));
    
    // 4. DELIVER THE VIDEO: Send the actual video data back to your React app.
    res.end(Buffer.from(await videoBlob.arrayBuffer()));

  } catch (error) {
    console.error('Proxy friend made a mistake:', error);
    res.status(500).json({ error: 'Oops, something went wrong when I tried to get the video.' });
  }
}