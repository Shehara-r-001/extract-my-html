import { ExtractOptions } from "./types/Document";
import {
  extractMetaData,
  logMetaData,
  parseHtmlFile,
  readHtmlFile,
} from "./util/extractors.util";

const DEFAULT_OPTIONS = {
  includeLinks: false,
  includeImages: false,
  phraseLength: 200,
};

type ExtractFromFileParams = {
  filePath: string;
  options: ExtractOptions;
};

const extractFromFile = async ({
  filePath,
  options = DEFAULT_OPTIONS,
}: ExtractFromFileParams) => {
  try {
    const htmlContent = await readHtmlFile({ filePath });
    const document = parseHtmlFile({ htmlContent });

    const metadata = extractMetaData({
      document,
      options: {
        ...options,
      },
    });

    logMetaData({ metadata });
  } catch (error) {
    console.error(error);
    if (error instanceof Error) throw new Error(error.message);
    throw new Error("failed to extract from file");
  }
};

const run = async () => {
  await extractFromFile({
    filePath: "../sample.html",
    options: {
      phraseLength: 200,
      includeLinks: true,
      includeImages: true,
    },
  });
};

run().catch((e) => console.error(e));
