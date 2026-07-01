const https = require('https');

const ids = [
    // cleaning
    "1581578731548-c64695cc6952", "1527515637462-cff94eecc1ac", "1558227097-440263f91572", "1628177142898-93e46e46248d", "1600880292203-757bb62b4baf", "1504917595217-d4dc5ebe6122",
    // maintenance
    "1581092160562-40aa08e78837", "1621905252507-b35492cc74b4", "1621905251189-08b45d6a269e", "1584622650111-993a426fbf0a", "1507122119958-fb45731ed099", "1599305090598-fe179d501227",
    // landscaping
    "1558904541-efa843a96f09", "1584738766473-61c083514bf4", "1583091151604-d7d8e6302e1c", "1563204907-2a445b597cd9", "1524334228333-0f6db392f8a1", "1416879573089-1ea2df6cc587",
    // support
    "1497366216548-37526070297c", "1580922881267-31c3c97e74dc", "1504384308090-c894fdcc538d", "1506476104332-f1559902bebc", "1596700868128-4ce67a740dc8", "1532996122724-e3c354a0b15b"
];

async function checkIds() {
    const valid = [];
    const invalid = [];
    
    for (const id of ids) {
        const url = `https://images.unsplash.com/photo-${id}?w=600&h=400&fit=crop`;
        await new Promise(resolve => {
            https.get(url, {
                headers: {
                    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) Chrome/91.0.4472.124'
                }
            }, (res) => {
                if (res.statusCode >= 200 && res.statusCode < 400) {
                    valid.push(id);
                    console.log('Valid:', id);
                } else {
                    invalid.push(id);
                    console.log('Invalid:', id, res.statusCode);
                }
                resolve();
            }).on('error', (e) => {
                console.log('Error:', id, e.message);
                invalid.push(id);
                resolve();
            });
        });
    }
    console.log(`Valid count: ${valid.length}`);
}

checkIds();
