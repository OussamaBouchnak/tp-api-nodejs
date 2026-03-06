// Script de test pour vérifier MongoDB
const mongoose = require('mongoose');
require('dotenv').config();

async function testMongoDB() {
    try {
        console.log('🔄 Connexion à MongoDB...');
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('✅ MongoDB connecté avec succès!');
        
        // Lister les collections
        const collections = await mongoose.connection.db.listCollections().toArray();
        console.log('\n📚 Collections dans la base de données:');
        collections.forEach(col => console.log(`  - ${col.name}`));
        
        // Si la collection "etudiants" existe, compter les documents
        if (collections.some(col => col.name === 'etudiants')) {
            const count = await mongoose.connection.db.collection('etudiants').countDocuments();
            console.log(`\n👥 Nombre d'étudiants: ${count}`);
            
            if (count > 0) {
                const students = await mongoose.connection.db.collection('etudiants').find().limit(3).toArray();
                console.log('\n📋 Premiers étudiants:');
                students.forEach(student => {
                    console.log(`  - ${student.nom} ${student.prenom} (${student.filiere})`);
                });
            }
        }
        
        console.log('\n✅ MongoDB fonctionne parfaitement!');
        process.exit(0);
    } catch (error) {
        console.error('❌ Erreur:', error.message);
        process.exit(1);
    }
}

testMongoDB();
