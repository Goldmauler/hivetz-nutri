/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** Address of the 3D plant tour (Hivetz_Factory). Defaults to its dev server. */
  readonly VITE_PLANT_URL?: string;
}
