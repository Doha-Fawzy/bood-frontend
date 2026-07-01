const https = require('https');
const fs = require('fs');
const path = require('path');

const urls = [
    "https://images.unsplash.com/photo-1551882547-ff40c0d1396a?auto=format&fit=crop&w=600&q=80",
    "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=600&q=80",
    "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=600&q=80",
    "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=600&q=80",
    "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=600&q=80",
    "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=600&q=80",

    "https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=600&q=80",
    "https://images.unsplash.com/photo-1527515637462-cff94eecc1ac?auto=format&fit=crop&w=600&q=80",
    "https://images.unsplash.com/photo-1558227097-440263f91572?auto=format&fit=crop&w=600&q=80",
    "https://images.unsplash.com/photo-1628177142898-93e46e46248d?auto=format&fit=crop&w=600&q=80",
    "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&w=600&q=80",
    "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&w=600&q=80",

    "https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&w=600&q=80",
    "https://images.unsplash.com/photo-1621905252507-b35492cc74b4?auto=format&fit=crop&w=600&q=80",
    "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=600&q=80",
    "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=600&q=80",
    "https://images.unsplash.com/photo-1507122119958-fb45731ed099?auto=format&fit=crop&w=600&q=80",
    "https://images.unsplash.com/photo-1599305090598-fe179d501227?auto=format&fit=crop&w=600&q=80",

    "https://images.unsplash.com/photo-1558904541-efa843a96f09?auto=format&fit=crop&w=600&q=80",
    "https://images.unsplash.com/photo-1584738766473-61c083514bf4?auto=format&fit=crop&w=600&q=80",
    "https://images.unsplash.com/photo-1583091151604-d7d8e6302e1c?auto=format&fit=crop&w=600&q=80",
    "https://images.unsplash.com/photo-1563204907-2a445b597cd9?auto=format&fit=crop&w=600&q=80",
    "https://images.unsplash.com/photo-1524334228333-0f6db392f8a1?auto=format&fit=crop&w=600&q=80",
    "https://images.unsplash.com/photo-1416879573089-1ea2df6cc587?auto=format&fit=crop&w=600&q=80",

    "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=600&q=80",
    "https://images.unsplash.com/photo-1580922881267-31c3c97e74dc?auto=format&fit=crop&w=600&q=80",
    "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=600&q=80",
    "https://images.unsplash.com/photo-1506476104332-f1559902bebc?auto=format&fit=crop&w=600&q=80",
    "https://images.unsplash.com/photo-1596700868128-4ce67a740dc8?auto=format&fit=crop&w=600&q=80",
    "https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?auto=format&fit=crop&w=600&q=80"
];

const names = [
    "hospitality-1.jpg", "hospitality-2.jpg", "hospitality-3.jpg", "hospitality-4.jpg", "hospitality-5.jpg", "hospitality-6.jpg",
    "cleaning-1.jpg", "cleaning-2.jpg", "cleaning-3.jpg", "cleaning-4.jpg", "cleaning-5.jpg", "cleaning-6.jpg",
    "maintenance-1.jpg", "maintenance-2.jpg", "maintenance-3.jpg", "maintenance-4.jpg", "maintenance-5.jpg", "maintenance-6.jpg",
    "landscaping-1.jpg", "landscaping-2.jpg", "landscaping-3.jpg", "landscaping-4.jpg", "landscaping-5.jpg", "landscaping-6.jpg",
    "support-1.jpg", "support-2.jpg", "support-3.jpg", "support-4.jpg", "support-5.jpg", "support-6.jpg"
];

const outDir = path.join(__dirname, 'src', 'assets', 'bood-design', 'images', 'services');

if (!fs.existsSync(outDir)) {
    fs.mkdirSync(outDir, { recursive: true });
}

function downloadFile(url, dest) {
    return new Promise((resolve, reject) => {
        https.get(url, (res) => {
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
        });
    });
}

async function downloadAll() {
    for (let i = 0; i < urls.length; i++) {
        const dest = path.join(outDir, names[i]);
        console.log(`Downloading ${names[i]}...`);
        try {
            await downloadFile(urls[i], dest);
        } catch (e) {
            console.error(`Failed ${names[i]}, trying fallback: ${e.message}`);
            // Fallback to picsum if unsplash URL is dead
            await downloadFile(`https://picsum.photos/seed/${names[i]}/600/400`, dest);
        }
    }
    console.log('All downloads completed!');
}

downloadAll();
