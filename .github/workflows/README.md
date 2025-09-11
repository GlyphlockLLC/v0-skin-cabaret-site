# GitHub Workflows

This directory contains GitHub Actions workflows for automated deployment and CI/CD.

## deploy-with-jules.yml

Automated deployment workflow using Google Jules to deploy to Vercel.com whenever changes are pushed or merged to the main branch.

### Features
- ✅ Triggers on push or merge to main branch
- ✅ Uses Google Jules for intelligent deployment automation
- ✅ Handles repository cloning, dependency installation, and building
- ✅ Deploys to Vercel using Vercel CLI/API
- ✅ Includes comprehensive error handling and verification
- ✅ Provides deployment status and URL feedback
- ✅ Uploads deployment artifacts for debugging

### Required GitHub Secrets

The workflow requires the following secrets to be configured in your repository settings:

| Secret Name | Required | Description |
|-------------|----------|-------------|
| `VERCEL_TOKEN` | ✅ **Yes** | Vercel authentication token for deployment |
| `VERCEL_ORG_ID` | ⚠️ Recommended | Vercel organization ID for team deployments |
| `VERCEL_PROJECT_ID` | ⚠️ Recommended | Vercel project ID for specific project targeting |
| `NPM_TOKEN` | ⚠️ Optional | NPM token for private package access |

### Setup Instructions

1. **Generate Vercel Token:**
   - Go to [Vercel Dashboard](https://vercel.com/dashboard)
   - Navigate to Settings → Tokens
   - Create a new token with appropriate permissions
   - Copy the token value

2. **Add GitHub Secrets:**
   - Go to your GitHub repository
   - Navigate to Settings → Secrets and variables → Actions
   - Add the `VERCEL_TOKEN` secret with your Vercel token
   - Optionally add `VERCEL_ORG_ID` and `VERCEL_PROJECT_ID` for team setups

3. **Configure Vercel Project (Optional):**
   - Run `vercel link` in your local repository to get org/project IDs
   - Add these IDs as GitHub secrets for more precise deployments

### Workflow Behavior

- **Push to main:** Immediately triggers deployment
- **PR merge to main:** Triggers deployment after successful merge
- **PR comments:** Adds deployment status and URL to PR comments
- **Artifacts:** Saves deployment reports and logs for 30 days
- **Verification:** Runs health checks on deployed application

### Troubleshooting

If the workflow fails:

1. **Check Jules Installation:** Ensure `@google-research/jules` is available
2. **Verify Secrets:** Confirm all required secrets are properly configured
3. **Review Logs:** Check the workflow logs for specific error messages
4. **Build Issues:** Ensure the application builds successfully locally
5. **Network Issues:** Some steps may fail due to network connectivity

### Maintenance

This workflow is designed for maintainability with:
- Clear step names with emojis for easy identification
- Comprehensive comments explaining each step
- Modular structure for easy updates
- Error handling and cleanup procedures
- Artifact collection for debugging

## webpack.yml

Legacy workflow for webpack builds. Consider migrating to the Jules deployment workflow for better automation and Vercel integration.