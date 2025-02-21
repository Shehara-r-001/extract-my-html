import { resolve } from "path";
import { readFile } from "fs/promises";
import { JSDOM } from "jsdom";

import { DocumentMetaData, ExtractOptions } from "../types/Document";

type ReadHtmlFileParams = {
  filePath: string;
};

type ParseHtmlFileParams = {
  htmlContent: string;
};

type GetMetaContentParams = {
  document: Document;
  name: keyof DocumentMetaData;
};

type DocumentParam = {
  document: Document;
};

type GetTextContentParams = DocumentParam & {
  selector: string;
};

type ExtractPhraseParams = DocumentParam & {
  length?: number;
};

type ExtractMetaDataParams = DocumentParam & {
  options: ExtractOptions;
};

/**
 * use to read the content from a file related to the given path
 * @param {ReadHtmlFileParams} params - params object
 * @param {string} params.filePath - relative path for the file
 * @returns
 */
const readHtmlFile = async ({ filePath }: ReadHtmlFileParams) => {
  try {
    const projectRoot = resolve(__dirname, "../");
    const absolutePath = resolve(projectRoot, filePath);
    return await readFile(absolutePath, "utf-8");
  } catch (error) {
    if (error instanceof Error) {
      console.error(error);
      throw new Error(`failed to read the file:: ${error.message}`);
    }

    throw new Error("failed to read the file");
  }
};

/**
 * use generate the DOM from given html content
 * @param {ParseHtmlFileParams} params - params object
 * @param {string} params.htmlContent - html content string to parse
 * @returns
 */
const parseHtmlFile = ({ htmlContent }: ParseHtmlFileParams) => {
  try {
    const vDom = new JSDOM(htmlContent);
    return vDom.window.document;
  } catch (error) {
    if (error instanceof Error) {
      console.error(error);
      throw new Error(`failed to parse html:: ${error.message}`);
    }

    throw new Error("failed to parse html");
  }
};

/**
 * gets content from (given) meta tags
 * @param {GetMetaContentParams} params - params object
 * @param {Document} params.document - document contains the tags
 * @param {GetMetaContentParams} params.name - name of the meta tag
 * @returns
 */
const getMetaContent = ({ document, name }: GetMetaContentParams) => {
  return (
    document.querySelector(`meta[name="${name}"]`)?.getAttribute("content") ??
    ""
  );
};

/**
 * gets all the links from the document
 * @param {DocumentParam} params - param object
 * @param {Document} params.document - the document
 * @returns
 */
const getLinks = ({ document }: { document: Document }) => {
  const list = document.querySelectorAll(`a[href]`);

  return Array.from(list).map((link) => link.getAttribute("href"));
};

/**
 * gets all the images from the document
 * @param {DocumentParam} params - param object
 * @param {Document} params.document - the document
 * @returns
 */
const getImages = ({ document }: { document: Document }) => {
  const list = document.querySelectorAll(`img[src]`);

  return Array.from(list).map((img) => img.getAttribute("src"));
};

/**
 * gets text content from given element
 * @param {GetTextContentParams} params - params object
 * @param {Document} params.document - document contains the tags
 * @param {string} params.selector - element
 * @returns
 */
const getTextContent = ({ document, selector }: GetTextContentParams) => {
  return document.querySelector(selector)?.textContent?.trim() ?? "";
};

/**
 * use to generate the prase from the body
 * @param {ExtractPhraseParams} params - params object
 * @param {Document} params.document - document contains the tags
 * @param {number} param.lenght - optianal length of characters for returned string
 * @returns
 */
const generateExtractedPhrase = ({ document, length }: ExtractPhraseParams) => {
  const text = document.body.textContent ?? "";
  const cleanText = text.replace(/\s+/g, " ").trim(); // replaces whitespaces and new lines with a space

  if (length)
    return cleanText.length > length
      ? `${cleanText.slice(0, length).trim()}...`
      : cleanText;

  return cleanText;
};

const extractMetaData = ({ document, options }: ExtractMetaDataParams) => {
  const { includeLinks, includeImages } = options;
  return {
    title: getTextContent({ document, selector: "title" }),
    date: getMetaContent({ document, name: "date" }),
    author: getMetaContent({ document, name: "author" }),
    phrase: generateExtractedPhrase({ document, length: options.phraseLength }),
    links: includeLinks ? getLinks({ document }) : [],
    images: includeImages ? getImages({ document }) : [],
  };
};

const logMetaData = ({ metadata }: { metadata: DocumentMetaData }) => {
  console.log("Article Metadata:");
  console.log("---------------");
  console.log(`Title: ${metadata.title}`);
  console.log(`Date: ${metadata.date}`);
  console.log(`Author: ${metadata.author}`);
  console.log(`Extract: ${metadata.phrase}`);

  const { links, images } = metadata;

  if (links && links?.length > 0) {
    console.log("\nFound links,");
    metadata.links?.forEach((link) => console.log(link));
  }

  if (images && images?.length > 0) {
    console.log("\nFound images,");
    metadata.images?.forEach((img) => console.log(img));
  }
};

export {
  readHtmlFile,
  parseHtmlFile,
  getMetaContent,
  getTextContent,
  generateExtractedPhrase,
  extractMetaData,
  logMetaData,
};
