import knex from 'knex';
import { knexConfig } from './knex.config';

async function testConnection() {
  const db = knex(knexConfig);
  
  try {
    console.log('🔄 Testing database connection...');
    console.log(`📍 Host: ${knexConfig.connection['host']}`);
    console.log(`📍 Port: ${knexConfig.connection['port']}`);
    console.log(`📍 Database: ${knexConfig.connection['database']}`);
    console.log(`📍 User: ${knexConfig.connection['user']}`);
    
    await db.raw('SELECT 1');
    console.log('✅ Database connection successful!');
    
    // Test if tables exist
    const tables = await db.raw(`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public' 
      AND table_name IN ('motoristas', 'romaneios', 'entregas')
      ORDER BY table_name
    `);
    
    if (tables.rows.length === 3) {
      console.log('✅ All required tables exist:');
      tables.rows.forEach((row: any) => {
        console.log(`   - ${row.table_name}`);
      });
    } else {
      console.log('⚠️  Some tables are missing. Found:');
      tables.rows.forEach((row: any) => {
        console.log(`   - ${row.table_name}`);
      });
      console.log('\n📝 Please run the schema.sql script to create the tables.');
    }
    
  } catch (error) {
    console.error('❌ Database connection failed:', error.message);
    process.exit(1);
  } finally {
    await db.destroy();
  }
}

testConnection();
