// Technician: Read surveys within same company
permit (
    principal in SurveyApp::"Technician",
    action == SurveyApp::Action::"ReadSurvey",
    resource
) when {
    resource is SurveyApp::Survey &&
    resource.primaryCompany == principal.primaryCompany
};

// Manager: Full survey access
permit (
    principal in SurveyApp::"Manager",
    action in [SurveyApp::Action::"ReadSurvey", SurveyApp::Action::"WriteSurvey"],
    resource
) when {
    resource is SurveyApp::Survey
};

// Manager: Exception approval
permit (
    principal in SurveyApp::"Manager",
    action == SurveyApp::Action::"ApproveException",
    resource
) when {
    resource is SurveyApp::Exception
};

// Guest: Read specific assets
permit (
    principal in SurveyApp::"Guest",
    action == SurveyApp::Action::"ReadAsset",
    resource
) when {
    resource is SurveyApp::Asset &&
    resource.assetType in ["temperature", "humidity"]
};