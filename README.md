
# Firebase Studio - آغامیرزا

This is a NextJS starter game "آغامیرزا" (Agha Mirza) in Firebase Studio.

To get started, take a look at `src/app/page.tsx`.

## Running Locally

1.  Install dependencies:
    ```bash
    npm install
    ```
2.  Run the development server:
    ```bash
    npm run dev
    ```
    Open [http://localhost:9002](http://localhost:9002) (or the specified port) in your browser.

## Deployment to GitHub Pages

This project is configured for static export and can be deployed to GitHub Pages for free.

### Prerequisites

1.  Push your code to a GitHub repository.
2.  The `.github/workflows/deploy.yml` file (included in this project) will automatically build and deploy your site when you push to the `main` branch (or your default branch as specified in the workflow file).

### Setup in GitHub Repository

1.  After the workflow runs successfully for the first time (check the "Actions" tab in your GitHub repository), go to your repository's **Settings**.
2.  In the left sidebar, click on **Pages**.
3.  Under "Build and deployment", for the "Source", select **GitHub Actions**.
4.  GitHub Pages will provide you with the URL where your site is published. It will typically be in the format: `https://<your-username>.github.io/<your-repository-name>/`.

### How it Works

*   The `next.config.ts` file is configured with `output: 'export'` to generate a static site.
*   It also dynamically sets `basePath` and `assetPrefix` based on your repository name. This is crucial for assets (like CSS, JavaScript, images, sounds) to load correctly when the site is served from a subpath (e.g., `/<repository-name>/`).
*   The GitHub Actions workflow in `.github/workflows/deploy.yml` handles:
    *   Checking out your code.
    *   Setting up Node.js.
    *   Installing dependencies.
    *   Building the Next.js application (which creates static files in an `out` directory).
    *   Deploying the contents of the `out` directory to GitHub Pages.

Your game should now be deployable to GitHub Pages!
