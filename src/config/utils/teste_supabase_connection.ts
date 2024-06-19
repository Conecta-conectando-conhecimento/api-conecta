import supabase from './supabase_cliente';

async function testSupabaseConnection() {
    try {
        const { data, error } = await supabase.storage.listBuckets();

        if (error) {
            throw new Error(`Failed to list buckets: ${error.message}`);
        }

        console.log('Supabase connection successful!');
        console.log('Buckets:', data);

        return true; // Supabase definido com sucesso
    } catch (error) {
        console.error('Error testing Supabase connection:', error);
        return false; // Falha ao definir Supabase
    }
}

testSupabaseConnection();
