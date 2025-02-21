# HTML Metadata Extractor

This project extracts metadata from an HTML file using TypeScript. It parses the HTML file, extracts relevant information, and logs the extracted metadata. The script supports options like including links and images, as well as customizing the phrase length for extracted content.

## Requirements

- Node.js (v20 or higher recommended)
- npm (Node Package Manager)
- TypeScript

## Installation

1. Clone this repository or download the project files.
2. Navigate to the project folder in your terminal.
3. Install the required dependencies:

```bash
npm install
```

## Documentation

## File Structure

- **src/**: Contains TypeScript files for extraction logic.
  - `index.ts`: Main script that executes the extraction.
  - `types/Document.ts`: Types and interfaces for document extraction.
  - `util/extractors.util.ts`: Utility functions for extracting metadata and parsing HTML.
- **sample.html**: The file that contains the html to be extracted

## Running the Script

The `index.ts` script can be executed using the following command:

```bash
npm start
```

This will run the extraction process on the file specified in the script (`../sample.html` in this case). You can modify the file path or options in the `run` function inside `index.ts` to suit your needs.

## Options

When running the script, you can customize the extraction options by adjusting the `options` object in `extractFromFile`:

- `phraseLength`: Maximum length of the extracted phrases (default: 200).
- `includeLinks`: Whether or not to extract links in the metadata (default: false).
- `includeImages`: Whether or not to extract images in the metadata (default: false).

Example:

```typescript
{
  phraseLength: 200,
  includeLinks: true,
  includeImages: true,
}
```

(Some content of the README.md has been generated using AI)
