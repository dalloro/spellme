// MIT License
// Copyright (c) 2025 Livio Dalloro
// See LICENSE file for details.

const admin = require('firebase-admin');

/**
 * Cleanup script to delete expired rooms.
 * Requires FIREBASE_SERVICE_ACCOUNT environment variable (JSON).
 */

if (!process.env.FIREBASE_SERVICE_ACCOUNT) {
    console.error("Missing FIREBASE_SERVICE_ACCOUNT environment variable.");
    process.exit(1);
}

const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT);

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

async function cleanup() {
    console.log("Starting room cleanup...");
    const now = admin.firestore.Timestamp.now();
    const sevenDaysAgo = admin.firestore.Timestamp.fromMillis(Date.now() - 168 * 60 * 60 * 1000);

    const toDelete = new Set();

    // 1. Cleanup by expiresAt (New rooms)
    const expiredSnapshot = await db.collection('rooms')
        .where('expiresAt', '<', now)
        .get();
    expiredSnapshot.forEach(doc => toDelete.add(doc.ref));
    console.log(`Found ${expiredSnapshot.size} rooms expired by 'expiresAt'.`);

    // 2. Cleanup by createdAt (Legacy rooms or forgot to refresh)
    // We check rooms created > 7 days ago. If they don't have a future 'expiresAt', we delete them.
    const legacySnapshot = await db.collection('rooms')
        .where('createdAt', '<', sevenDaysAgo)
        .get();

    legacySnapshot.forEach(doc => {
        const data = doc.data();
        // If it has NO expiresAt, it's a legacy room -> Delete.
        // If it HAS expiresAt but it's in the past -> Already handled or delete.
        if (!data.expiresAt || data.expiresAt.toMillis() < Date.now()) {
            toDelete.add(doc.ref);
        }
    });
    console.log(`Checked ${legacySnapshot.size} old rooms. Total unique deletions: ${toDelete.size}`);

    if (toDelete.size === 0) {
        console.log("No rooms to delete.");
        return;
    }

    const batch = db.batch();
    let count = 0;
    for (const ref of toDelete) {
        batch.delete(ref);
        count++;
        if (count >= 500) break; // Firestore batch limit
    }

    await batch.commit();
    console.log(`Batch deletion of ${count} rooms committed successfully.`);
}

cleanup()
    .then(() => process.exit(0))
    .catch(err => {
        console.error("Cleanup failed:", err);
        process.exit(1);
    });
