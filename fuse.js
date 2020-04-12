const { 
	FuseBox, 
	CSSPlugin,
	CSSResourcePlugin,
	// QuantumPlugin,
	WebIndexPlugin,
	PostCSSPlugin,
} = require("fuse-box");

const fuse = FuseBox.init({
	  homeDir: "src",
	  target: "browser@esnext",
	  output: "dist/$name.js",
	  plugins: [
		  WebIndexPlugin(),
	    PostCSSPlugin([require("postcss-import")]),
	    CSSResourcePlugin({
	               dist: "dist/css-resources"
		  }),
		  CSSPlugin(),
      this.isProduction && QuantumPlugin({
                uglify: true,
                treeshake: true,
                bakeApiIntoBundle: "app",
      }),
	  ],
});

fuse.dev(); // launch http server
fuse
    .bundle("app")
    .completed(proc => proc.start)
  .instructions(" > index.ts")
  .hmr()
  .watch();
fuse.run();
