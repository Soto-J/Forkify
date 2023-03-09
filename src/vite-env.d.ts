/// <reference types="vite/client" />

declare module "fracty";

interface ImportMetaEnv {
  readonly VITE_FORKIFY_API_URL: string;
  readonly VITE_FORKIFY_API_KEY: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
