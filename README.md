
# واژه بهشت (Vāژه Behesht - Word Paradise)

This is a Next.js Persian word game inspired by "Agha Mirza", built in Firebase Studio. The game challenges players to form words from a circle of letters to fill a crossword grid.

## Features

-   **Letter Circle**: Connect Persian letters to form words.
-   **Crossword Grid**: Fill words into a crossword-style grid.
-   **Levels**: Progress through 11 unique levels with increasing difficulty.
-   **Scoring**: Earn points for finding target words and bonus words.
-   **Hint System**: Get help by revealing a letter in the grid.
-   **Dark Theme**: Enjoy a visually comfortable dark mode interface.
-   **Responsive Design**: Playable on various screen sizes.
-   **Sound Effects**: Audio feedback for game actions.
-   **"B Titr" Font**: Styled with the "B Titr" Persian font (requires local installation or web font hosting).

## Running Locally

1.  **Install dependencies**:
    ```bash
    npm install
    ```
2.  **Run the development server**:
    ```bash
    npm run dev
    ```
    Open [http://localhost:9002](http://localhost:9002) (or the specified port) in your browser.

## Deployment to GitHub Pages

This project is configured for static export and can be deployed to GitHub Pages.

### Prerequisites

1.  Push your code to a GitHub repository.
2.  The `.github/workflows/deploy.yml` file (included) will automatically build and deploy your site when you push to the `master` branch (or your default branch as specified in the workflow).

### Setup in GitHub Repository

1.  After the workflow runs successfully for the first time (check the "Actions" tab), go to your repository's **Settings**.
2.  In the left sidebar, click on **Pages**.
3.  Under "Build and deployment", for the **Source**, select **GitHub Actions**.
4.  GitHub Pages will provide the URL where your site is published (e.g., `https://<your-username>.github.io/<your-repository-name>/`).

### How it Works

*   `next.config.ts` is configured with `output: 'export'`.
*   `assetPrefix` in `next.config.ts` ensures assets load correctly from the repository's subpath on GitHub Pages. `basePath` is intentionally omitted as GitHub Pages handles the subpath.
*   The GitHub Actions workflow in `.github/workflows/deploy.yml` builds the Next.js app (outputting to the `out` directory) and deploys it.

Enjoy playing واژه بهشت!
