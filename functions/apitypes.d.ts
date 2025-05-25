interface Env {
    DB: D1Database;
    IMAGES: R2Bucket;
    KV: KVNamespace;
    AUTH: string;
    ALLOWED_ORIGIN: string;
}
