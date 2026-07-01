const https = require('https');
const fs = require('fs');
const path = require('path');

const imagesToDownload = [
    // Cleaning
    { name: "cleaning-1.jpg", prompt: "Professional deep cleaning of modern commercial office space, photorealistic, 8k, well lit" },
    { name: "cleaning-2.jpg", prompt: "Janitor cleaning a bright modern corporate hallway, high quality, professional" },
    { name: "cleaning-3.jpg", prompt: "Professional window cleaner washing exterior glass of a skyscraper, clear sky, sunny" },
    { name: "cleaning-4.jpg", prompt: "Professional carpet cleaning machine restoring office carpet, close up, high detail" },
    { name: "cleaning-5.jpg", prompt: "Industrial cleaning in a large bright warehouse, professional sanitation workers in uniform" },
    { name: "cleaning-6.jpg", prompt: "Clean up crew working in a newly constructed modern office, removing dust, bright" },

    // Maintenance
    { name: "maintenance-1.jpg", prompt: "Engineer inspecting industrial facility equipment with tablet, professional maintenance, hardhat" },
    { name: "maintenance-2.jpg", prompt: "Professional HVAC technician repairing modern air conditioning unit on building rooftop" },
    { name: "maintenance-3.jpg", prompt: "Certified electrician working on complex electrical panel, safety gear, high quality, bright" },
    { name: "maintenance-4.jpg", prompt: "Professional plumber inspecting modern commercial plumbing pipes, clean environment" },
    { name: "maintenance-5.jpg", prompt: "Technician inspecting elevator shaft mechanism, bright lighting, professional engineering" },
    { name: "maintenance-6.jpg", prompt: "Maintenance engineer fixing industrial equipment quickly, professional emergency repair" },

    // Landscaping
    { name: "landscaping-1.jpg", prompt: "Beautiful modern corporate landscape design with manicured lawns and pathways, sunny" },
    { name: "landscaping-2.jpg", prompt: "Professional landscaper mowing lush green lawn at commercial property, sunny day" },
    { name: "landscaping-3.jpg", prompt: "Modern automatic sprinkler irrigation system watering green garden, water drops, 8k" },
    { name: "landscaping-4.jpg", prompt: "Elegant stone pathway hardscaping in a corporate courtyard, sunny day, beautiful plants" },
    { name: "landscaping-5.jpg", prompt: "Professional arborist trimming large tree in a beautiful park, safety gear, high quality" },
    { name: "landscaping-6.jpg", prompt: "Vibrant colorful seasonal flower beds in front of a luxury building, beautiful landscaping" },

    // Support
    { name: "support-1.jpg", prompt: "Professional welcoming receptionist at modern luxury office front desk, smiling, 8k" },
    { name: "support-2.jpg", prompt: "Organized corporate mailroom with staff sorting packages, modern office logistics" },
    { name: "support-3.jpg", prompt: "Professional office manager organizing tasks in a bright modern workspace, corporate" },
    { name: "support-4.jpg", prompt: "Professional security guard in uniform standing confidently in modern building lobby" },
    { name: "support-5.jpg", prompt: "Professional pest control technician spraying safely in clean commercial warehouse" },
    { name: "support-6.jpg", prompt: "Modern eco-friendly waste management and recycling sorting facility, clean, professional" }
];

const outDir = path.join(__dirname, 'src', 'assets', 'bood-design', 'images', 'services');

if (!fs.existsSync(outDir)) {
    fs.mkdirSync(outDir, { recursive: true });
}

function downloadFile(url, dest) {
    return new Promise((resolve, reject) => {
        const req = https.get(url, { timeout: 60000 }, (res) => {
            if (res.statusCode === 301 || res.statusCode === 302) {
                return downloadFile(res.headers.location, dest).then(resolve).catch(reject);
            }
            if (res.statusCode !== 200) {
                return reject(new Error('Status ' + res.statusCode));
            }
            const file = fs.createWriteStream(dest);
            res.pipe(file);
            file.on('finish', () => {
                file.close();
                resolve();
            });
        }).on('error', (err) => {
            fs.unlink(dest, () => reject(err));
        }).on('timeout', () => {
            req.destroy();
            reject(new Error('Request Timeout'));
        });
    });
}

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

async function downloadAll() {
    console.log('Starting sequential downloads...');
    for (const item of imagesToDownload) {
        const dest = path.join(outDir, item.name);
        
        // Check if file exists and has reasonable size to skip downloading
        if (fs.existsSync(dest) && fs.statSync(dest).size > 1000) {
            console.log(`Skipping ${item.name}, already exists.`);
            continue;
        }

        const encodedPrompt = encodeURIComponent(item.prompt);
        const url = `https://image.pollinations.ai/prompt/${encodedPrompt}?width=600&height=400&nologo=true&seed=42`;
        
        console.log(`Downloading ${item.name} from Pollinations AI...`);
        let success = false;
        while (!success) {
            try {
                await downloadFile(url, dest);
                console.log(`Success: ${item.name}`);
                success = true;
            } catch (e) {
                console.error(`Failed ${item.name}: ${e.message}. Retrying in 2 seconds...`);
                await sleep(2000);
            }
        }
        await sleep(1500); // Wait 1.5 seconds between successful downloads to avoid rate limits
    }
    console.log('All downloads completed!');
}

downloadAll();
