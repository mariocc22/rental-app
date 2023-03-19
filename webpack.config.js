const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const path = require("path");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const WebpackPwaManifest = require('webpack-pwa-manifest');
const { GenerateSW } = require('workbox-webpack-plugin');
const { WebpackManifestPlugin } = require('webpack-manifest-plugin');

// versioning to cache bust pwa
const version = new Date().getTime();

const extendPlugins = [];
 
if( process.env.NODE_ENV === 'production') {
  extendPlugins.push( new GenerateSW({
    skipWaiting: true,
    maximumFileSizeToCacheInBytes: 15 * 1024 * 1024, // Increase limit to 15MB
    clientsClaim: true
  }));

  extendPlugins.push(
    new WebpackPwaManifest({
      filename: 'manifest.json',
      inject: true,
      fingerprints: true,
      name: 'Stage',
      short_name: 'Stage',
      theme_color: '#ffffff',
      background_color: '#ffffff',
      display: 'standalone',
      scope: '/',
      start_url: '/',
      icons: [
        {
          "src": "assets/icons/icon-72x72.png",
          "sizes": "72x72",
          "type": "image/png",
          "purpose": "maskable any"
        },
        {
          "src": "assets/icons/icon-96x96.png",
          "sizes": "96x96",
          "type": "image/png",
          "purpose": "maskable any"
        },
        {
          "src": "assets/icons/icon-128x128.png",
          "sizes": "128x128",
          "type": "image/png",
          "purpose": "maskable any"
        },
        {
          "src": "assets/icons/icon-144x144.png",
          "sizes": "144x144",
          "type": "image/png",
          "purpose": "maskable any"
        },
        {
          "src": "assets/icons/icon-152x152.png",
          "sizes": "152x152",
          "type": "image/png",
          "purpose": "maskable any"
        },
        {
          "src": "assets/icons/icon-192x192.png",
          "sizes": "192x192",
          "type": "image/png",
          "purpose": "maskable any"
        },
        {
          "src": "assets/icons/icon-384x384.png",
          "sizes": "384x384",
          "type": "image/png",
          "purpose": "maskable any"
        },
        {
          "src": "assets/icons/icon-512x512.png",
          "sizes": "512x512",
          "type": "image/png",
          "purpose": "maskable any"
        }
      ],
    })
  );

  extendPlugins.push(
    new WebpackManifestPlugin({
    fileName: 'asset-manifest.json',
    publicPath: '/',
    generate: (seed, files) => {
      const manifestFiles = files.reduce((manifest, file) => {
        manifest[file.name] = file.path;
        return manifest;
      }, seed);

      // Set cache busting strategies for the generated files
      manifestFiles['sw.js'] += `?v=${version}`;
      manifestFiles['index.html'] += `?v=${version}`;
      manifestFiles['manifest.json'] += `?v=${version}`;
      
      return manifestFiles;
    },
  }))
}

module.exports = {
  entry: {
    index: "./scripts/index.js",
    aboutUs: "./scripts/about-us.js",
    explore: "./scripts/explore.js",
    property: "./scripts/property.js",
    listmyspace: "./scripts/list-my-space.js",
    loginModal: "./query/auth.js",
    phoneVer: "./query/phone-verification.js",
    showcase: "./scripts/showcase.js",
    exploreSpaces: "./scripts/explore-spaces.js",
    profile: "./scripts/profile.js",
    components: "./scripts/ui-kit.js",
    bookingConfirmation: './scripts/booking-confirmation.js',
    bookingConfirmationSuccess: './scripts/booking-confirmation-success.js',
    myBookings: './scripts/my-bookings.js'
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].bundle.js",
    publicPath: "/",
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader, // instead of style-loader
          "css-loader",
        ],
      },
    ],
  },
  plugins: [
    ...extendPlugins,
    new CopyWebpackPlugin({
      patterns: [{ from: "assets", to: "assets" }],
    }),
    // ADD CSS FILES AS SUCH
    new MiniCssExtractPlugin(),

    // Add All HTML PAGES AS SUCH
    new HtmlWebpackPlugin({
      template: "./pages/index.html",
      filename: "index.html",
      chunks: ["index"],
    }),
    new HtmlWebpackPlugin({
      template: "./pages/about-us.html",
      filename: "about-us.html",
      chunks: ["aboutUs"],
    }),
    new HtmlWebpackPlugin({
      template: "./pages/all-places.html",
      filename: "all-places.html",
      chunks: [],
    }),
    new HtmlWebpackPlugin({
      template: "./pages/explore.html",
      filename: "explore.html",
      chunks: ["explore"],
    }),
    new HtmlWebpackPlugin({
      template: "./pages/explore-spaces.html",
      filename: "explore-spaces.html",
      chunks: ["exploreSpaces"],
    }),
    new HtmlWebpackPlugin({
      template: "./pages/property.html",
      filename: "property.html",
      chunks: ["property"],
    }),
    new HtmlWebpackPlugin({
      template: "./pages/booking-confirmation.html",
      filename: "booking-confirmation.html",
      chunks: ["bookingConfirmation"],
    }),
    new HtmlWebpackPlugin({
      template: "./pages/booking-confirmation-success.html",
      filename: "booking-confirmation-success.html",
      chunks: ["bookingConfirmationSuccess"],
    }),
    new HtmlWebpackPlugin({
      template: "./pages/my-bookings.html",
      filename: "my-bookings.html",
      chunks: ["myBookings"],
    }),
    new HtmlWebpackPlugin({
      template: "./pages/list-my-space.html",
      filename: "list-my-space.html",
      chunks: ["listmyspace"],
    }),
    new HtmlWebpackPlugin({
      template: "./pages/login-modal.html",
      filename: "login-modal.html",
      chunks: ["loginModal"],
    }),
    new HtmlWebpackPlugin({
      template: "./pages/phone-auth.html",
      filename: "phone-auth.html",
      chunks: ["phoneVer"],
    }),
    new HtmlWebpackPlugin({
      template: "./pages/showcase.html",
      filename: "showcase.html",
      chunks: ["showcase"],
    }),
    new HtmlWebpackPlugin({
      template: "./pages/profile.html",
      filename: "profile.html",
      chunks: ["profile"],
    }),
    new HtmlWebpackPlugin({
      template: "./pages/components-ui-kit.html",
      filename: "components-ui-kit.html",
      chunks: ["components"],
    })
  ],
  devtool: "source-map",
};
