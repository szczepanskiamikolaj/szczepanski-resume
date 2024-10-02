import { GatsbyNode } from 'gatsby';
import { createRemoteFileNode } from 'gatsby-source-filesystem';
import { ImageWithTags, resumeData, transformResumeDataToImageTags } from './src/components/resumeData';

export const sourceNodes: GatsbyNode['sourceNodes'] = async ({
  actions,
  createNodeId,
  createContentDigest,
  getCache,
}) => {
  const { createNode } = actions;

  const imageTags: ImageWithTags[] = transformResumeDataToImageTags(resumeData);

  for (const [url, tags] of imageTags) {
    try {
      const fileNode = await createRemoteFileNode({
        url,
        parentNodeId: createNodeId(`root`), 
        createNode,
        createNodeId,
        getCache,
      });

      if (fileNode) {
        createNode({
          ...fileNode,
          id: createNodeId(`image-${tags.join('-')}`),
          internal: {
            type: 'ImageNode',
            contentDigest: createContentDigest(fileNode),
          },
          tags,
        });
      }
    } catch (error) {
      console.error(`Failed to create file node for URL: ${url}`, error);
    }
  }
};
