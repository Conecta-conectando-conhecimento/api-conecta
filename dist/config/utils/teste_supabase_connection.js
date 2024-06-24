"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supabase_cliente_1 = __importDefault(require("./supabase_cliente"));
async function testSupabaseConnection() {
    try {
        const { data, error } = await supabase_cliente_1.default.storage.listBuckets();
        if (error) {
            throw new Error(`Failed to list buckets: ${error.message}`);
        }
        console.log('Supabase connection successful!');
        console.log('Buckets:', data);
        return true; // Supabase definido com sucesso
    }
    catch (error) {
        console.error('Error testing Supabase connection:', error);
        return false; // Falha ao definir Supabase
    }
}
testSupabaseConnection();
