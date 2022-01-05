import React from 'react';

import * as Atoms from '@components/atoms';

export function Article() {
  return (
    <Atoms.Box />
    // <Box bg="secondary" mr="4" borderRadius="8">
    //   <Skeleton show={!hasLoadedImage}>
    //     <Image
    //       testID="article-image"
    //       source={{
    //         uri: article.imageUrl,
    //       }}
    //       alt={`Published image of the article: ${article.title}`}
    //       h={200}
    //       w={250}
    //       borderRadius="8"
    //       onLoadEnd={() => setHasLoadedImage(true)}
    //     />
    //   </Skeleton>

    //   <Box
    //     bg="secondary"
    //     position="absolute"
    //     bottom={0}
    //     h={100}
    //     alignItems="flex-start"
    //     justifyContent="space-between"
    //     w="100%"
    //     p="4"
    //     borderBottomRadius="8"
    //   >
    //     <Row w="100%" justifyContent="space-between">
    //       <Box borderBottomWidth={1} borderBottomColor="accent">
    //         <Text
    //           color="white"
    //           fontSize="9"
    //           fontWeight={500}
    //           textTransform="uppercase"
    //         >
    //           {article.newsSite}
    //         </Text>
    //       </Box>

    //       <Box bg="background" px={2} py={0.5} borderRadius={2}>
    //         <Text
    //           color="white"
    //           fontSize="9"
    //           fontWeight={500}
    //           textTransform="uppercase"
    //         >
    //           {formatRelativeDate(article.publishedAt)}
    //         </Text>
    //       </Box>
    //     </Row>

    //     <Text
    //       flex={1}
    //       color="white"
    //       fontSize="sm"
    //       fontWeight={700}
    //       isTruncated
    //       numberOfLines={2}
    //       mt={2}
    //     >
    //       {article.title}
    //     </Text>
    //   </Box>
    // </Box>
  );
}
