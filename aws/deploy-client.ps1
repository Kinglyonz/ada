param(
    [Parameter(Mandatory=$true)]
    [string]$ClientName,

    [Parameter(Mandatory=$true)]
    [string]$GitHubConnectionArn,

    [Parameter(Mandatory=$true)]
    [string]$GitHubRepositoryUrl,

    [string]$Branch = "main"
)

$StackName = "$ClientName-ada-stack"

Write-Host "🚀 Deploying Client Environment for: $ClientName" -ForegroundColor Cyan
Write-Host "Stack Name: $StackName"

# Deploy using AWS CLI
aws cloudformation deploy `
  --template-file template.yaml `
  --stack-name $StackName `
  --parameter-overrides `
    ClientName=$ClientName `
    GitHubConnectionArn=$GitHubConnectionArn `
    GitHubRepositoryUrl=$GitHubRepositoryUrl `
    GitHubBranch=$Branch `
  --capabilities CAPABILITY_NAMED_IAM

if ($LASTEXITCODE -eq 0) {
    Write-Host "✅ Deployment Successful!" -ForegroundColor Green
    
    # Get Outputs
    $ServiceUrl = aws cloudformation describe-stacks --stack-name $StackName --query "Stacks[0].Outputs[?OutputKey=='ServiceUrl'].OutputValue" --output text
    
    Write-Host "`n🌐 App URL: https://$ServiceUrl" -ForegroundColor Yellow
} else {
    Write-Host "❌ Deployment Failed. Check console for details." -ForegroundColor Red
}
