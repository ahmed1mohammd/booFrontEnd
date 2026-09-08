import fs from 'fs';
import path from 'path';
import https from 'https';
import http from 'http';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const publicDir = path.join(__dirname, '../public');
const carsDir = path.join(publicDir, 'images/cars');
const partsDir = path.join(publicDir, 'images/products');

fs.mkdirSync(carsDir, { recursive: true });
fs.mkdirSync(partsDir, { recursive: true });

const downloads = [
  // Cars
  {
    name: 'mercedes-c200.jpg',
    dir: carsDir,
    url: 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&w=1200&q=80'
  },
  {
    name: 'bmw-420i.jpg',
    dir: carsDir,
    url: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&w=1200&q=80'
  },
  {
    name: 'porsche-macan-gts.jpg',
    dir: carsDir,
    url: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1200&q=80'
  },
  {
    name: 'audi-a6-sline.jpg',
    dir: carsDir,
    url: 'https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?auto=format&fit=crop&w=1200&q=80'
  },
  {
    name: 'vw-tiguan-rline.jpg',
    dir: carsDir,
    url: 'https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?auto=format&fit=crop&w=1200&q=80'
  },
  {
    name: 'range-rover-velar.jpg',
    dir: carsDir,
    url: 'https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&w=1200&q=80'
  },
  // Spare Parts
  {
    name: 'brembo-ceramic-pads.jpg',
    dir: partsDir,
    url: 'https://images.unsplash.com/photo-1600705722908-bab1e61c0b4d?auto=format&fit=crop&w=800&q=80'
  },
  {
    name: 'brembo-rotors.jpg',
    dir: partsDir,
    url: 'https://images.unsplash.com/photo-1486006920555-c77dce18193b?auto=format&fit=crop&w=800&q=80'
  },
  {
    name: 'garrett-turbocharger.jpg',
    dir: partsDir,
    url: 'https://images.unsplash.com/photo-1517524008697-84bbe3c3fd98?auto=format&fit=crop&w=800&q=80'
  },
  {
    name: 'bilstein-suspension.jpg',
    dir: partsDir,
    url: 'https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?auto=format&fit=crop&w=800&q=80'
  },
  {
    name: 'bosch-alternator.jpg',
    dir: partsDir,
    url: 'https://images.unsplash.com/photo-1580273916550-e323be2ae537?auto=format&fit=crop&w=800&q=80'
  },
  {
    name: 'ngk-spark-plugs.jpg',
    dir: partsDir,
    url: 'https://images.unsplash.com/photo-1558441719-ef048944c4e5?auto=format&fit=crop&w=800&q=80'
  },
  {
    name: 'mann-filter-air.jpg',
    dir: partsDir,
    url: 'https://images.unsplash.com/photo-1617814076367-b759c7d7e738?auto=format&fit=crop&w=800&q=80'
  },
  {
    name: 'motul-engine-oil.jpg',
    dir: partsDir,
    url: 'https://images.unsplash.com/photo-1635784063754-0f498c48a7eb?auto=format&fit=crop&w=800&q=80'
  },
  {
    name: 'bmw-m-carbon-mirror.jpg',
    dir: partsDir,
    url: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=800&q=80'
  }
];

function downloadFile(item) {
  return new Promise((resolve, reject) => {
    const filePath = path.join(item.dir, item.name);
    const file = fs.createWriteStream(filePath);

    const client = item.url.startsWith('https') ? https : http;
    client.get(item.url, { headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' } }, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        // Handle redirect
        const redirectClient = res.headers.location.startsWith('https') ? https : http;
        redirectClient.get(res.headers.location, { headers: { 'User-Agent': 'Mozilla/5.0' } }, (redirectRes) => {
          redirectRes.pipe(file);
          file.on('finish', () => {
            file.close();
            console.log('Downloaded:', item.name);
            resolve();
          });
        }).on('error', reject);
      } else {
        res.pipe(file);
        file.on('finish', () => {
          file.close();
          console.log('Downloaded:', item.name);
          resolve();
        });
      }
    }).on('error', reject);
  });
}

async function runAll() {
  console.log('Starting image downloads...');
  for (const item of downloads) {
    try {
      await downloadFile(item);
    } catch (e) {
      console.error('Error downloading', item.name, e.message);
    }
  }
  console.log('All downloads completed successfully!');
}

runAll();
