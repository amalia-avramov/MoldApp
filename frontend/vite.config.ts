import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import viteTsconfigPaths from "vite-tsconfig-paths";
import { VitePWA, VitePWAOptions } from "vite-plugin-pwa";

const manifestForPlugin: Partial<VitePWAOptions> = {
	registerType: "autoUpdate",
	includeAssets: ["favicon.ico", "apple-touch-icon.png", "masked-icon.svg"],
	manifest: {
		name: "Moldsafe Application",
		short_name: "Moldsafe",
		description: "An app that show information about temperature, humidity and mold index.",
		icons: [
			{
        src: 'logoSmall.png',
        sizes: '192x192',
        type: 'image/png'
      },
      {
        src: 'logoBig.png',
        sizes: '512x512',
        type: 'image/png'
      },
      {
        src: 'logoBig.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'any'
      },
      {
        src: 'logoBig.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'maskable'
      }
		],
		theme_color: "#171717",
		background_color: "#e8ebf2",
		display: "standalone",
		scope: "/",
		start_url: "/",
		orientation: "portrait",
	},
  injectRegister:"auto",
  workbox:{
    cleanupOutdatedCaches: false,
  },
  devOptions: {
    enabled: true,
    type: 'module',
  },
};

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), viteTsconfigPaths(),VitePWA(manifestForPlugin)],
  build: {
    outDir: "build",
  },
  server: {
    open: true,
  },
});
