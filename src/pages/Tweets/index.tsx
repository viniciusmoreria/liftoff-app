import React from 'react';

import { Linking } from 'react-native';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import WebView from 'react-native-webview';

import * as Atoms from '@components/atoms';
import * as Molecules from '@components/molecules';

const allowedUrls = [
  'about:blank',
  'https://platform.twitter.com/jot.html',
  'https://syndication.twitter.com/i/jot',
];

export default function Tweets() {
  const insets = useSafeAreaInsets();
  const webViewRef = React.useRef<WebView>(null);

  const [isLoading, setIsLoading] = React.useState(true);

  const html = `
  <!DOCTYPE html>\
   <html>\
   <head>\
   <meta charset="utf-8">\
   <meta name="viewport" content="width=device-width, initial-scale=1.0">\
   <meta name="twitter:widgets:theme" content="light">\
   </head>\
   <body>\
   <a class="twitter-timeline" data-theme="dark" href="https://twitter.com/SpaceX?ref_src=twsrc%5Etfw" data-chrome="transparent noheader nofooter noborders"></a>\
   </body>\
   <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>\
   <style>
   body {
   background-color: #16171B;
   padding: 12px 0 72px 0;
   }
   </style>\
   </html>`;

  return (
    <Atoms.Box
      sx={{
        flex: 1,
        bg: 'background',
        pt: insets.top,
      }}
    >
      <Atoms.Text
        variant="text-xl"
        sx={{
          color: 'white',
          fontWeight: 'bold',
          mt: '42px',
          mb: '12px',
          px: '24px',
        }}
      >
        SpaceX Tweets
      </Atoms.Text>

      <WebView
        ref={webViewRef}
        source={{ html }}
        showsVerticalScrollIndicator={false}
        onLoadEnd={() => {
          setTimeout(() => {
            setIsLoading(false);
          }, 1500);
        }}
        onShouldStartLoadWithRequest={(event) => {
          if (allowedUrls.includes(event.url)) {
            return true;
          }
          Linking.openURL(event.url);
          return false;
        }}
      />

      {isLoading && (
        <Animated.View
          entering={FadeIn}
          exiting={FadeOut}
          style={{
            flex: 1,
            position: 'absolute',
            height: '100%',
            width: '100%',
          }}
        >
          <Molecules.Loading />
        </Animated.View>
      )}
    </Atoms.Box>
  );
}
