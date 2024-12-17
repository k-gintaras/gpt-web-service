// apiKeyValidator.js
const admin = require('firebase-admin');
const serviceAccount = require('../config/firebase.json');
// const firebaseConfig = require('../config/firebase.json'); // Adjust path as needed


// Initialize Firebase Admin SDK with service account credentials
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const firestore = admin.firestore(); // Initialize Firestore instance

const apiKeyValidator = async (userId: any) => {
  try {
    const apiKeyDoc = await firestore.collection('apiKeys').doc(userId).get(); // Retrieve document from "apiKeys" collection

    return apiKeyDoc.exists; // Return true if document exists (API key is valid)
  } catch (error) {
    console.error('Error validating API key:', error);
    return false; // Return false in case of error or if API key is not found
  }
};

export { apiKeyValidator };
