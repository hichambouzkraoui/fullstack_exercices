
### Overview
- I used RBAC with groups as using Role management using policy templates is not (at least for me the description was confusing or there is no enough details) applicable as there is no shared actions and we can only parametrize principals and resources

- for details please refer to
    https://docs.cedarpolicy.com/bestpractices/bp-implementing-roles-templates.html
    https://docs.cedarpolicy.com/bestpractices/bp-implementing-roles-groups.html


### Entity Types
- **Technician**: Has a `primaryCompany` attribute for company-scoped access
- **Manager**: Full administrative access (no specific attributes)
- **Guest**: Limited read-only access (no specific attributes)
- **Survey**: object Contains `primaryCompany` 
- **Exception**: objects for approval
- **Asset**: Has `assetType` for granular resource filtering

### Actions
- `ReadSurvey`: View survey data
- `WriteSurvey`: Create/modify surveys
- `ApproveException`: Administrative approval workflow
- `ReadAsset`: Access asset information



